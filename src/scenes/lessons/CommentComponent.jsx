import React, { useState } from "react";
import { Typography, TextField, Button, Grid } from "@mui/material";

const CommentComponent = () => {
   const [username, setUsername] = useState("");
   const [comment, setComment] = useState("");
   const [comments, setComments] = useState([
      {
         username: "John",
         comment: "Wow such a great lesson!",
      },
      {
         username: "Ali",
         comment: "Wow!",
      },
      {
         username: "Veli",
         comment: "Not good instructor must be fired!",
      },
   ]);

   const handleUsernameChange = (event) => {
      setUsername(event.target.value);
   };

   const handleCommentChange = (event) => {
      setComment(event.target.value);
   };

   const handleCommentSubmit = (event) => {
      event.preventDefault();
      const newComment = { username, comment };
      setComments([...comments, newComment]);
      setUsername("");
      setComment("");
   };

   return (
      <div>
         <Typography variant="h6">Comment Form</Typography>
         <form onSubmit={handleCommentSubmit}>
            <Grid container spacing={2} alignItems="center">
               <Grid item xs={12} sm={6} lg={3}>
                  <TextField autoFocus label="Username" variant="outlined" fullWidth value={username} onChange={handleUsernameChange} />
               </Grid>
               <Grid item xs={12} sm={6} lg={3}>
                  <TextField label="Comment" variant="outlined" fullWidth value={comment} onChange={handleCommentChange} />
               </Grid>
               <Grid item xs={12}>
                  <Button type="submit" variant="contained" color="primary">
                     Submit
                  </Button>
               </Grid>
            </Grid>
         </form>
         <div>
            {comments.map((comment, index) => (
               <div style={{ marginTop: "12px" }} key={index}>
                  <Typography variant="subtitle1" gutterBottom>
                     {comment.username} said:
                  </Typography>
                  <Typography variant="body1">{comment.comment}</Typography>
               </div>
            ))}
         </div>
      </div>
   );
};

export default CommentComponent;
