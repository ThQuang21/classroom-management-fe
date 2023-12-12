import * as React from 'react';
import Box from '@mui/material/Box';
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import Paper from '@mui/material/Paper';
import {DragDropContext, Draggable, Droppable} from "react-beautiful-dnd";
import {useEffect, useState} from "react";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import GradeComposition from "./GradeComposition";
import LoadingButton from "@mui/lab/LoadingButton";
import ClassService from "../../services/class.service";
import Snackbar from "@mui/material/Snackbar";
import Alert from "@mui/material/Alert";

export default function GradeStructure() {
  const classCode = window.location.pathname.split('/').pop(); // Extract classCode from the URL
  const [loading, setLoading] = React.useState(false);

  const [gradeComposition, setGradeComposition] = useState([]);
  const [alertProps, setAlertProps] = useState({
    open: false,
    message: '',
    severity: 'success', // Default to success
  });
  const handleAlertClose = () => {
    setAlertProps((prev) => ({ ...prev, open: false }));
  };

  const showAlert = (message, severity = 'success') => {
    setAlertProps({
      open: true,
      message,
      severity,
    });

    // Hide the Alert after 4 seconds (4000 milliseconds)
    setTimeout(() => {
      handleAlertClose();
    }, 6000);
  };

  const onDragEnd = (result) => {
    if (!result.destination) return;

    const items = Array.from(gradeComposition);
    const [reorderedItem] = items.splice(result.source.index, 1);
    items.splice(result.destination.index, 0, reorderedItem);

    setGradeComposition(items);
    console.log(items)
  };

  const handleDataChange = (newDataName, newDataScale, gradeId) => {
    const updatedGrades = gradeComposition.map((grade) =>
      grade.id === gradeId ? { ...grade, name: newDataName, gradeScale: parseFloat(newDataScale) } : grade
    );

    let totalScale = 0;
    for (const grade of updatedGrades) {
      if (!isNaN(grade.gradeScale)) {
        totalScale += parseFloat(grade.gradeScale);
      }
    }
    console.log('updatedGrades', updatedGrades);
    console.log('totalScale', totalScale);


    if (totalScale > 100) {
      showAlert('Total grade scale exceeds 100%', 'error');
    } else {
      setGradeComposition(updatedGrades);
    }
    // You can perform additional actions here based on the updated data.
    console.log('Data changed for gradeId', gradeId, ':', newDataName, newDataScale);
  };

  const handleAddData = (newDataName, newDataScale, gradeId) => {
    // Find the maximum gradeId in the existing grades
    const maxGradeId = Math.max(...gradeComposition.map((grade) => grade.id), 0);

    // Create a new object with the next gradeId
    const newGrade = {
      id: maxGradeId + 1,
      gradeName: newDataName,
      gradeScale: newDataScale,
    };

    setGradeComposition((prevGrades) => [...prevGrades, newGrade]);
  };

  const handleDeleteDataByGradeId = (gradeId) => {
    // Filter out the grade with the specified gradeId
    const updatedGrades = gradeComposition.filter((grade) => grade.id !== gradeId);

    // Set the updated grades to the state
    setGradeComposition(updatedGrades);

    // You can perform additional actions here based on the deleted data.
    console.log('Data deleted for gradeId', gradeId);
    console.log('Data after deletion', updatedGrades);
  };

  useEffect(() => {
    const fetchData = async () => {
      if (classCode) {
        await ClassService.getGradeCompositionByClassCode({ classCode: classCode})
          .then((data) => {
            setLoading(false);

            const newGrades = data.data.data.gradeCompositions.map((grade, index) => ({
              name: grade.name,
              gradeScale: grade.gradeScale,
              position: grade.position,
              id: grade.position
            }));
            setGradeComposition(newGrades)

            console.log("newGrades", newGrades)

          }, (error) => {
            console.log(error)
            showAlert(error.response.data.error.message || 'An unexpected error occurred. Please try again later.', 'error');
          })
        ;
      }
    };

    fetchData();
    // eslint-disable-next-line
  }, []);

  const handleSubmit = async () => {
    console.log("gradeCompositionsss", gradeComposition);

    let totalScale = 0;
    for (const grade of gradeComposition) {
      if (!isNaN(grade.gradeScale))
        totalScale += parseFloat(grade.gradeScale);
    }

    if (totalScale < 100) {
      showAlert('Total grade scale must sum up to 100%', 'error');
    } else {
      setLoading(true);
      console.log("gradeComposition", gradeComposition);

      const newGrades = gradeComposition.map((grade, index) => ({
        name: grade.name,
        gradeScale: grade.gradeScale,
        position: index + 1,
      }));

      console.log("newGrades", newGrades);

      await ClassService.updateGradeCompositionByClassCode({gradeCompositions : newGrades, classCode})
        .then((data) => {
          console.log(data.data.data)
          showAlert('Save grade structure successful', 'success');

        }, (error) => {
          console.log(error)
        }).finally(setLoading(false))
    }
  }

  return (
    <Box sx={{ width: '100%' }}>
      <Grid style={{width: '100%'}}>
        <Grid style={{borderTop: '10px solid teal', borderRadius: 10}}>
          <Paper elevation={2} style={{width:'100%'}}>
            <Box style={{display: 'flex',flexDirection:'column', alignItems:'flex-start', marginLeft: '15px', paddingTop: '20px', paddingBottom: '20px'}}>
              <Typography variant="h4" style={{fontFamily:'sans-serif Roboto', marginBottom:"15px"}}>
                Grade Structure
              </Typography>
            </Box>
          </Paper>
        </Grid>

        <Grid style={{paddingTop: '15px'}}>
          <DragDropContext onDragEnd={onDragEnd}>
            <Droppable droppableId="tasks">
              {(provided) => (
                <div ref={provided.innerRef} {...provided.droppableProps}>
                  {gradeComposition.map((grade, index) => (
                    <Draggable
                      key={grade.id}
                      draggableId={grade.id.toString()}
                      index={index}
                    >
                      {(provided) => (
                        <div
                          {...provided.draggableProps}
                          {...provided.dragHandleProps}
                          ref={provided.innerRef}
                        >
                          <Paper elevation={2} style={{width:'100%' , marginTop: '10px', borderLeft: '10px solid' +
                              ' teal'}}>
                            <Box style={{display: 'flex',flexDirection:'column', alignItems:'flex-start', marginLeft: '20px', marginRight: '20px', paddingTop: '20px', paddingBottom: '10px'}}>
                              <GradeComposition dataName={grade.name} dataScale={grade.gradeScale}
                                                dataId={grade.id}
                                                onDataChange={handleDataChange}
                                                onDeleteData={handleDeleteDataByGradeId}
                              />
                            </Box>
                          </Paper>
                        </div>
                      )}
                    </Draggable>
                  ))}
                  {provided.placeholder}
                </div>
              )}
            </Droppable>
          </DragDropContext>
        </Grid>

        <Stack spacing={2} direction="row"
               style={{paddingTop: '15px'}}
               justifyContent="center"
               alignItems="center"
        >
          <Button variant="outlined" style={{ borderColor: 'teal', color: 'teal' }}
                  onClick={() => handleAddData('', '')}
          >
            ADD
          </Button>
          <LoadingButton
            type="submit" variant="contained" style={{ backgroundColor: 'teal', color: 'white' }}
            loading={loading}
            onClick={handleSubmit}
          >
            <span>SAVE</span>
          </LoadingButton>
        </Stack>

      </Grid>


      <Snackbar
        open={alertProps.open}
        autoHideDuration={4000}
        onClose={handleAlertClose}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
      >
        <Alert onClose={handleAlertClose} severity={alertProps.severity} sx={{ width: '100%' }}>
          {alertProps.message}
        </Alert>
      </Snackbar>
    </Box>
  );
}