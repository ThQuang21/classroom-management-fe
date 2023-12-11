import * as React from 'react';
import {Divider, List, ListItem} from "@mui/material";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import ListItemPeople from "../../components/List/ListItemPeople";
export default function PeopleList() {
  return (
    <>
      <Box sx={{ mt: 2 }}>
        <Typography variant="h4" gutterBottom color={"primary"}>
          <strong>Teacher</strong>
        </Typography>
        <Divider sx={{ borderStyle: 'dashed' }} />
      </Box>

      <List sx={{ width: '100%', bgcolor: 'background.paper' }}>
        <ListItem>
          <ListItemPeople />
        </ListItem>
        <ListItem>
          <ListItemPeople />
        </ListItem>
      </List>


      <Box sx={{ mt: 2 }}>
        <Typography variant="h4" gutterBottom color={"primary"}>
          <strong>Student</strong>
        </Typography>
        <Divider sx={{ borderStyle: 'dashed' }} />
      </Box>
    </>
  );
}
