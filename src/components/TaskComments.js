import { Button, makeStyles, Paper, Typography } from '@material-ui/core';
import React, { useState } from 'react';
import TaskCommentForm from './TaskCommentForm';

const useStyles = makeStyles((theme) => ({
  root: {
    marginTop: '10px',
    display: 'flex',
    flexDirection: 'column-reverse',
  },
  commentWrapper: {
    marginBottom: '6px',
  },
  childCommentWrapper: {
    padding: '0 12px',
  },
  commentText: {
    wordBreak: 'break-all',
  },
  replyButton: {
    minWidth: 0,
    boxShadow: 'none',
    padding: 0,
    backgroundColor: 'inherit',
    '&:hover': {
      backgroundColor: 'inherit',
      boxShadow: 'none',
    },
  },
}));

function TaskComments({ comments, taskId }) {
  const [isReply, setIsReply] = useState(-1);

  const classes = useStyles();

  const handleCommentReply = (id) => {
    setIsReply(id);
  };

  const handleCommentReplyCancel = () => {
    setIsReply(-1);
  };

  return (
    <div className={classes.root}>
      {comments.map((comment) => {
        return (
          <Paper
            elevation={0}
            key={comment.id}
            className={classes.commentWrapper}
          >
            <Typography
              component="div"
              variant="subtitle1"
              className={classes.commentText}
            >
              {comment.text}
            </Typography>
            {isReply === comment.id ? (
              <TaskCommentForm
                handleCommentReplyCancel={handleCommentReplyCancel}
                cancel={true}
                taskId={taskId}
                parent={comment.id}
                placeholder="Type your reply here"
              />
            ) : (
              <Button
                variant="contained"
                size="small"
                type="button"
                className={classes.replyButton}
                onClick={() => handleCommentReply(comment.id)}
              >
                Reply
              </Button>
            )}
            <Paper
              elevation={0}
              key={comment.id}
              className={classes.childCommentWrapper}
              style={{ display: 'flex', flexDirection: 'column-reverse' }}
            >
              {comment.children.lenght !== 0
                ? comment.children.map((childComment) => (
                    <Typography
                      component="div"
                      variant="body2"
                      key={childComment.id}
                      className={classes.commentText}
                    >
                      {childComment.text}
                    </Typography>
                  ))
                : null}
            </Paper>
          </Paper>
        );
      })}
    </div>
  );
}

export default TaskComments;
