import * as React from 'react';
import Stack from '@mui/material/Stack';
import {ListItemAvatar, ListItemSecondaryAction, ListItemText} from "@mui/material";
import Avatar from "@mui/material/Avatar";
import PersonIcon from "@mui/icons-material/Person";
import SettingsIcon from "@mui/icons-material/Settings";
import Typography from "@mui/material/Typography";

export default function ListItemPeople() {
  return (
    <Stack spacing={2} direction="row">
      <ListItemAvatar>
        <Avatar>
          <PersonIcon />
        </Avatar>
      </ListItemAvatar>

      <ListItemText primary={<Typography sx={{fontWeight: 'bold'}}>Name</Typography>}
                    secondary="Email"
      />

      <ListItemSecondaryAction>
        <SettingsIcon />
      </ListItemSecondaryAction>
    </Stack>
  );
}
