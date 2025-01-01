import React from 'react';
import { ListItem, ListItemIcon, ListItemText } from '@mui/material';
import SettingsIcon from '@mui/icons-material/Settings';

const Settings = () => (
  <ListItem button sx ={{cursor:'pointer'}}>
    <ListItemIcon>
      <SettingsIcon />
    </ListItemIcon>
    <ListItemText primary="Settings" />
  </ListItem>
);

export default Settings;
