import { Divider, makeStyles, Typography } from '@material-ui/core';
import React from 'react';
import { connect } from 'react-redux';
import { getFormattedComments } from '../misc/helper';
import TaskCommentForm from './TaskCommentForm';
import TaskComments from './TaskComments';

const useStyles = makeStyles((theme) => ({
  title: {
    marginTop: '10px',
    wordBreak: 'break-all',
    lineHeight: '20px',
    textAlign: 'justify',
  },
  commentContainer: {
    marginTop: '10px',
  },
}));

function TaskDetails({ appData, task }) {
  const classes = useStyles();

  return (
    <>
      <Typography variant="h4">{appData.columns[task.colId].title}</Typography>

      <Divider />
      <Typography variant="h6" gutterBottom className={classes.title}>
        {task.title}
      </Typography>

      <Typography variant="subtitle1" gutterBottom>
        {task.description}
      </Typography>

      <Divider />

      <div className={classes.commentContainer}>
        <Typography variant="h6">Comments</Typography>

        <TaskCommentForm
          taskId={`task${task.id}`}
          placeholder="Type your comment here"
        />

        <TaskComments
          comments={getFormattedComments(
            appData.tasks[`task${task.id}`].comments
          )}
          taskId={`task${task.id}`}
          key={`#${task.id}`}
        />
      </div>
    </>
  );
}

const mapStateToProps = (state) => ({
  appData: state,
});

export default connect(mapStateToProps)(TaskDetails);
