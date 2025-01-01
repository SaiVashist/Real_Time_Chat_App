import React from 'react';
import { ListItem, ListItemIcon, ListItemText } from '@mui/material';
import AddPhotoAlternateIcon from '@mui/icons-material/AddPhotoAlternate';

const NewPost = ({ onClick }) => (
  <ListItem button onClick={onClick} sx ={{cursor:'pointer'}}>
    <ListItemIcon>
      <AddPhotoAlternateIcon />
    </ListItemIcon>
    <ListItemText primary="New Post" />
  </ListItem>
);

export default NewPost;
