import React, { useState } from 'react';
import { AppBar, Toolbar, IconButton, Drawer, List, Typography, Box, Dialog, DialogTitle, DialogContent, DialogActions, Button } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import ChatBubbleOutlineIcon from '@mui/icons-material/ChatBubbleOutline';
import ShareIcon from '@mui/icons-material/Share';
import { styled } from '@mui/system';
import imgd from '../../assets/beautiful-nature-mountain-scenery-with-flowers-picjumbo-com.jpg';
import OnlineFriends from './OnlineFriends';
import Chats from './Chats';
import Settings from './Settings';
import NewPost from './NewPost';
import Logout from './Logout';

const CustomTextField = styled('textarea')({
  width: '100%',
  padding: '10px',
  border: '1px solid #6A0572',
  borderRadius: '8px',
  outline: 'none',
  '&:focus': {
    borderColor: '#6A0572',
    boxShadow: '0 0 5px #6A0572',
  },
});

const Dashboard = () => {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [newPost, setNewPost] = useState('');
  const [image, setImage] = useState(null);
  const [posts, setPosts] = useState([
    { text: 'Hello World!', image: imgd },
    { text: 'React with MUI is awesome!', image: imgd },
  ]);

  const toggleDrawer = () => {
    setDrawerOpen(!drawerOpen);
  };

  const handlePost = () => {
    if (newPost || image) {
      setPosts([{ text: newPost, image }, ...posts]);
      setNewPost('');
      setImage(null);
      setIsDialogOpen(false);
    }
  };

  const handleImageChange = (e) => {
    setImage(URL.createObjectURL(e.target.files[0]));
  };

  return (
    <Box sx={{ display: 'flex', height: '100vh' }}>
      <AppBar position="fixed" sx={{ backgroundColor: '#6A0572' }}>
        <Toolbar>
          <IconButton edge="start" color="inherit" aria-label="menu" onClick={toggleDrawer}>
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" sx={{ flexGrow: 1 }}>
            Dashboard
          </Typography>
        </Toolbar>
      </AppBar>

      <Drawer button = "true" anchor="left" open={drawerOpen} onClose={toggleDrawer}>
        <List>
          <OnlineFriends />
          <NewPost onClick={() => setIsDialogOpen(true)} />
          <Chats />
          <Settings />
          <Logout/>
        </List>
      </Drawer>

      <Box component="main" sx={{ flexGrow: 1, p: 3, mt: 8, backgroundColor: '#F8EDEB' }}>
        <Typography variant="h5" sx={{ mb: 3 }}>Welcome to Dashboard</Typography>
        <Box>
          {posts.map((post, index) => (
            <Box key={index} sx={{ mb: 2, p: 2, backgroundColor: '#FFFFFF', borderRadius: 1, boxShadow: 1 }}>
              {post.image && <img src={post.image} alt="Post" style={{ width: '100%', borderRadius: 8, marginBottom: 8 }} />}
              <Typography>{post.text}</Typography>
              <Box sx={{ display: 'flex', justifyContent: 'space-around', mt: 1 }}>
                <IconButton><FavoriteBorderIcon /></IconButton>
                <IconButton><ChatBubbleOutlineIcon /></IconButton>
                <IconButton><ShareIcon /></IconButton>
              </Box>
            </Box>
          ))}
        </Box>
      </Box>

      <Dialog open={isDialogOpen} onClose={() => setIsDialogOpen(false)}>
        <DialogTitle>New Post</DialogTitle>
        <DialogContent>
          <CustomTextField
            rows={3}
            placeholder="What's on your mind?"
            value={newPost}
            onChange={(e) => setNewPost(e.target.value)}
          />
          <Button component="label" sx={{ mt: 2 }}>
            Upload Image
            <input type="file" hidden onChange={handleImageChange} />
          </Button>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setIsDialogOpen(false)}>Cancel</Button>
          <Button onClick={handlePost} variant="contained">Post</Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default Dashboard;
