import React from 'react';
import { ListItem, ListItemIcon, ListItemText } from '@mui/material';
import LogoutIcon from '@mui/icons-material/Logout';
import { logoutUser } from '../auth/authSlice';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';

const Logout = () => {
    const navigate = useNavigate();
    
    const dispatch = useDispatch()
    const handleLogout = () => {
        dispatch(logoutUser())
        localStorage.removeItem('userInfo'); // Clear token
        navigate('/');
        
    }
  return (
  <ListItem button onClick = {handleLogout} sx ={{cursor:'pointer'}}>
    <ListItemIcon>
      <LogoutIcon />
    </ListItemIcon>
    <ListItemText primary="Logout" />
  </ListItem>
  );
};

export default Logout;