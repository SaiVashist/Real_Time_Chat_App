import React from 'react';
import { Box, Typography } from '@mui/material';

const PostFeed = () => {
  const posts = [
    { text: 'Hello World!', image: null },
    { text: 'React with MUI is awesome!', image: null },
  ];

  return (
    <Box>
      <Typography variant="h5" sx={{ mb: 3 }}>Posts</Typography>
      {posts.map((post, index) => (
        <Box key={index} sx={{ mb: 2, p: 2, backgroundColor: '#FFFFFF', borderRadius: 1, boxShadow: 1 }}>
          {post.image && <img src={post.image} alt="Post" style={{ width: '100%', borderRadius: 8, marginBottom: 8 }} />}
          <Typography>{post.text}</Typography>
        </Box>
      ))}
    </Box>
  );
};

export default PostFeed;
