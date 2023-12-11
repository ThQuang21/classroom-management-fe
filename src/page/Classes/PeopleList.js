import * as React from 'react';
import {Divider, LinearProgress, List} from "@mui/material";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import ListItemPeople from "../../components/List/ListItemPeople";
import {useEffect} from "react";
import ClassService from "../../services/class.service";
import Container from "@mui/material/Container";
export default function PeopleList(classCode) {
  const [classData, setClassData] = React.useState(null);
  const [loading, setLoading] = React.useState(true);


  useEffect(() => {
    const fetchData = async () => {
      const classCode = window.location.pathname.split('/').pop(); // Extract classCode from the URL

      if (classCode) {
        await ClassService.listPeopleByClassCode({ classCode: classCode })
          .then((data) => {
            console.log(data.data.data)
            setClassData(data.data.data)
            setLoading(false);
          }, (error) => {
          })

      }
    };

    fetchData();
    // eslint-disable-next-line
  }, [classCode]);

  if (loading) {
    return (
      <>
        <Container sx={{ py: 8 }} maxWidth="md">
          <LinearProgress  />
        </Container>
      </>

    )
  }

  return (
    <>
      <Box sx={{ mt: 2 }}>
        <Typography variant="h4" gutterBottom color={"primary"}>
          <strong>Teachers</strong>
        </Typography>
        <Divider sx={{ borderStyle: 'dashed' }} />
      </Box>

      <List sx={{ width: '100%', bgcolor: 'background.paper' }}>
        {classData.teachers.map((card) => (
          <ListItemPeople name={card.name} email={card.email}/>
          ))}
      </List>


      <Box sx={{ mt: 8 }}>
        <Typography variant="h4" gutterBottom color={"primary"}>
          <strong>Students</strong>
        </Typography>
        <Divider sx={{ borderStyle: 'dashed' }} />
      </Box>

      <List sx={{ width: '100%', bgcolor: 'background.paper' }}>
        {classData.students.length === 0 ? (
          <Typography variant="body1" >There is no student in this class.</Typography>
        ) : (
          classData.students.map((card) => (
            <ListItemPeople name={card.name} email={card.email} studentId={card.studentId} />
          ))
        )}
      </List>
    </>
  );
}
