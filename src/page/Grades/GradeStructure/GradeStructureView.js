import * as React from 'react';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import GradeCompositionDetail from "./GradeCompositionDetail";

export default function GradeStructureView({dataName, dataScale, data}) {

  return (
    <Paper elevation={2} style={{width:'100%' , marginTop: '10px', borderLeft: '10px solid' +
        ' teal'}}
    >
      <Box style={{display: 'flex',flexDirection:'column', alignItems:'flex-start', marginLeft: '20px', marginRight: '20px', paddingTop: '20px', paddingBottom: '10px'}}

      >
        <List sx={{ width: '100%', bgcolor: 'background.paper' }}>
            <ListItem
              key={1}
              disableGutters
              secondaryAction={
                <Typography><strong>Grade scale:</strong> {dataScale}%</Typography>
              }
            >
              <ListItemText primary={
                <Typography variant="h6" gutterBottom><strong>Grade name:</strong> {dataName}</Typography>
              } />
            </ListItem>
          <GradeCompositionDetail grade={data}/>
        </List>
      </Box>
    </Paper>
  );
}
