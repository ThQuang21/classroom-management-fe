import * as React from 'react';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Avatar from '@mui/material/Avatar';
import {useEffect} from "react";
import AuthService from "../../../services/auth.service";
import AccountCircleIcon from '@mui/icons-material/AccountCircle';

export default function ListComment({oneComment}) {
  const [name, setName] = React.useState('');
  console.log(oneComment)

  useEffect(() => {
    const fetchData = async () => {

      if (oneComment) {
        await AuthService.findUserByEmail({ email: oneComment.commenter})
          .then((data) => {
            console.log(data.data.data);
            setName(data.data.data.name)
          }, (error) => {
            console.log(error)
          })
        ;
      }
    };

    fetchData();
    // eslint-disable-next-line
  }, [name]);

  return (
    <List sx={{ width: '100%', bgcolor: 'background.paper'}}>
      <ListItem>
        <ListItemAvatar>
          <Avatar>
            <AccountCircleIcon />
          </Avatar>
        </ListItemAvatar>
        <ListItemText primary={<strong>{name}</strong>} secondary={oneComment.comment} />
      </ListItem>
    </List>
  );
}
