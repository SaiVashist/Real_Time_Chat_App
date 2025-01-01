import React from 'react';
import { ListItem, ListItemIcon, ListItemText } from '@mui/material';
import GroupIcon from '@mui/icons-material/Group';

const OnlineFriends = () => (
  <ListItem button sx ={{cursor:'pointer'}}>
    <ListItemIcon>
      <GroupIcon />
    </ListItemIcon>
    <ListItemText primary="Online Friends" />
  </ListItem>
);

export default OnlineFriends;
