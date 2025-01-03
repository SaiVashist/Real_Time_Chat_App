import React, { useState } from 'react';
import { Button, Dialog, DialogTitle, DialogContent, DialogActions, TextField } from '@mui/material';
import { ListItem, ListItemIcon, ListItemText } from '@mui/material';
import AddPhotoAlternateIcon from '@mui/icons-material/AddPhotoAlternate';
import axios from 'axios';
import { useSelector } from 'react-redux';

const NewPost = () => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [content, setContent] = useState('');
  const [image, setImage] = useState(null);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setImage(file);
  };
  const userId = useSelector(state => state.auth.user.id );
  const handleSubmit = async () => {
    const formData = new FormData();
    formData.append('userId', userId); // Replace with actual user ID
    formData.append('content', content);
    formData.append('media', image);

    try {
      const response = await axios.post('http://localhost:5000/api/posts/newPost', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });
      console.log(response.data);
    } catch (error) {
      console.error('Error uploading post:', error);
    }
  };



  return (
    <div>
      {/* Button to open the dialog */}
         <ListItem button  sx ={{cursor:'pointer'}} onClick={() => setIsDialogOpen(true)}>
     <ListItemIcon>
       <AddPhotoAlternateIcon />
     </ListItemIcon>
     <ListItemText primary="New Post" />
   </ListItem>

      {/* Dialog for creating a new post */}
      <Dialog open={isDialogOpen} onClose={() => setIsDialogOpen(false)}>
        <DialogTitle>New Post</DialogTitle>
        <DialogContent>
          {/* TextField for the post content */}
          <TextField
            fullWidth
            multiline
            rows={3}
            placeholder="What's on your mind?"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            sx={{ mt: 2 }}
          />

          {/* Button to upload an image */}
          <Button component="label" sx={{ mt: 2 }}>
            Upload Image
            <input type="file" hidden onChange={handleFileChange} />
          </Button>
        </DialogContent>

        {/* Actions: Cancel and Post */}
        <DialogActions>
          <Button onClick={() => setIsDialogOpen(false)}>Cancel</Button>
          <Button onClick={handleSubmit} variant="contained">
            Post
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default NewPost;
