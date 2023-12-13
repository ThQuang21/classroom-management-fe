import * as React from 'react';
import Stack from '@mui/material/Stack';
import {IconButton, ListItem, ListItemAvatar, ListItemText} from "@mui/material";
import Avatar from "@mui/material/Avatar";
import PersonIcon from "@mui/icons-material/Person";
import SettingsIcon from "@mui/icons-material/Settings";
import Typography from "@mui/material/Typography";

export default function ListItemPeople(props) {
  const {name, email, note} = props;

  return (
    <Stack spacing={2} direction="row">
      <ListItem
        secondaryAction={
          <IconButton aria-label="comment">
            <SettingsIcon />
          </IconButton>
      }>
        <ListItemAvatar>
          <Avatar>
            <PersonIcon />
          </Avatar>
        </ListItemAvatar>
        <ListItemText
          primary={
            <Typography sx={{ fontWeight: 'bold' }}>
              {name} {note ? `- ${note}` : ''}
            </Typography>
          }
          secondary={email}
        />
      </ListItem>

    </Stack>
  );
}
