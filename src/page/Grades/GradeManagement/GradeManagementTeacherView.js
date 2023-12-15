import * as React from 'react';
import Paper from '@mui/material/Paper';
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import {
  Grid,
  VirtualTable,
  TableHeaderRow,
  TableFixedColumns,
} from '@devexpress/dx-react-grid-material-ui';

import {useEffect, useState} from "react";
import HandleImportExportStudent from "./ImportFile/HandleImportExportStudent";
import Snackbar from "@mui/material/Snackbar";
import Alert from "@mui/material/Alert";
import GradeService from "../../../services/grade.service";
import Container from "@mui/material/Container";
import {LinearProgress} from "@mui/material";
import ClassService from "../../../services/class.service";

export default function GradeManagementTeacherView() {
  const classCode = window.location.pathname.split('/').pop(); // Extract classCode from the URL
  const [rowData, setRowData] = React.useState([]);
  const [loading, setLoading] = React.useState(true);

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

  const [columns, setColumns] = useState([]);
  const [tableColumnExtensions, setTableColumnExtensions] = useState([]);

  useEffect(() => {
    const fetchData = async () => {

      if (classCode) {
        await GradeService.getGradesByClassCode({ classCode: classCode})
          .then((data) => {
            console.log(data.data.data);
            setRowData(data.data.data)

          }, (error) => {
            console.log(error)
            showAlert(error.response.data.error.message || 'An unexpected error occurred. Please try again later.', 'error');
          })
        ;

        await ClassService.getGradeCompositionByClassCode({ classCode: classCode})
          .then((data) => {
            setLoading(false);

            const newGrades = data.data.data.gradeCompositions.map((grade, index) => ({
              name: grade.name
            }));

            var column = [
              { name: 'fullName', title: 'Fulll Name' },
              { name: 'studentId', title: 'Student ID' },
            ];
            var tableColumnExtension = [
              { columnName: 'fullName', width: 180 }, //fullName
              { columnName: 'studentId', width: 100 }, //studentId

              // { columnName: 'amount', align: 'right', width: 140 }, //total
            ];
            newGrades.forEach((gradeComposition) => {
              column.push({
                name: gradeComposition.name,
                title: gradeComposition.name
              })
              tableColumnExtension.push({
                columnName: gradeComposition.name,
                align: 'center'
              })
            })
            setColumns(column)
            setTableColumnExtensions(tableColumnExtension)

            setLoading(false);
          }, (error) => {
            showAlert(error.response.data.error.message || 'An unexpected error occurred. Please try again later.', 'error');
          })
        ;
      }
    };

    const msgDialog = localStorage.getItem('msgDialog');
    const msgDialogSuccess = localStorage.getItem('msgDialogSuccess');

    if (msgDialog) {
      showAlert(msgDialog, 'error');
      localStorage.removeItem('msgDialog')
    }
    if (msgDialogSuccess) {
      showAlert(msgDialogSuccess, 'success');
      localStorage.removeItem('msgDialogSuccess')
    }
    fetchData();
    // eslint-disable-next-line
  }, []);

  const [leftColumns] = useState(['fullName', 'studentId']);
  // const [rightColumns] = useState(['amount']);

  const handleReloadTable = async () => {
    setLoading(true);
    await GradeService.getGradesByClassCode({ classCode: classCode})
      .then((data) => {
        console.log(data.data.data);
        setRowData(data.data.data)
        setLoading(false)
      }, (error) => {
        console.log(error)
        showAlert(error.response.data.error.message || 'An unexpected error occurred. Please try again later.', 'error');
      })
    ;
  };

  if (loading) {
    return (
      <>
        <Container sx={{ py: 8 }} maxWidth="md">
          <LinearProgress  />
        </Container>
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
      </>

    )
  }

  return (
    <>
      <Paper elevation={2} style={{width:'100%', borderTop: '10px solid teal', borderRadius: 10}}>
        <Box style={{display: 'flex',flexDirection:'column', alignItems:'flex-start', marginLeft: '15px', paddingTop: '20px', paddingBottom: '20px'}}>
          <Typography variant="h4" style={{fontFamily:'sans-serif Roboto', marginBottom:"15px"}}>
            Grade Management
          </Typography>
          <HandleImportExportStudent onReloadTable={handleReloadTable}/>
        </Box>
      </Paper>

      <Paper sx={{ width: '100%', overflow: 'hidden', marginTop: '15px'}}>
        <Grid
          rows={rowData}
          columns={columns}
        >
          <VirtualTable
            columnExtensions={tableColumnExtensions}
          />
          <TableHeaderRow />
          <TableFixedColumns
            leftColumns={leftColumns}
            // rightColumns={rightColumns}
          />
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
      </Paper>

    </>
  );
}
