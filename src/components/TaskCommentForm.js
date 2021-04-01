import { Button, TextField } from '@material-ui/core';
import React, { useState } from 'react';
import { connect } from 'react-redux';
import { addComment } from '../actions';

function TaskCommentForm({
  addComment,
  cards,
  taskId,
  cancel = false,
  handleCommentReplyCancel,
  parent = 0,
  placeholder,
}) {
  const [commentText, setCommentText] = useState('');

  const handleInputChange = (e) => {
    setCommentText(e.target.value);
  };

  const handleClick = () => {
    if (commentText.trim() === '') {
      return;
    }

    const item = cards[taskId];

    item.comments = [
      ...item.comments,
      {
        id: item.comments.length + 1,
        parent,
        text: commentText.trim(),
      },
    ];

    addComment(item);
    setCommentText('');

    if (handleCommentReplyCancel) {
      handleCommentReplyCancel();
    }
  };

  return (
    <div>
      <TextField
        label={placeholder}
        type="text"
        value={commentText}
        name="comment"
        onChange={handleInputChange}
        fullWidth
        autoComplete="off"
      />
      <div style={{ marginTop: '5px' }}>
        <Button
          variant="outlined"
          size="small"
          type="button"
          onClick={handleClick}
          style={{ marginRight: '5px' }}
        >
          {cancel ? 'Add Reply' : 'Add Comment'}
        </Button>

        {cancel && (
          <Button
            variant="contained"
            color="secondary"
            size="small"
            type="button"
            onClick={handleCommentReplyCancel}
          >
            Cancel
          </Button>
        )}
      </div>
    </div>
  );
}

const mapStateToProps = (state) => ({
  cards: state.tasks,
});

const mapDispatchToProps = (dispatch) => ({
  addComment: (card) => dispatch(addComment(card)),
});

export default connect(mapStateToProps, mapDispatchToProps)(TaskCommentForm);
