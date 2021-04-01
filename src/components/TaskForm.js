import { Button, ButtonGroup, makeStyles, TextField } from '@material-ui/core';
import React, { useState } from 'react';
import { connect } from 'react-redux';
import { addCard, editCard } from '../actions';

const useStyles = makeStyles((theme) => ({
  buttonContainer: {
    '& > *': {
      margin: theme.spacing(1, 0),
    },
  },
  textBox: {
    marginBottom: '10px',
  },
}));

let itemIndex = 0;

const initialState = {
  title: '',
  description: '',
  comments: [],
};

function TaskForm({ addCard, editCard, drawerClose, columnId, task, isEdit }) {
  const [item, setItem] = useState(task ? task : initialState);

  const classes = useStyles();

  const handleInputChange = (e) => {
    const target = e.target;

    setItem((p) => ({ ...p, [target.name]: target.value }));
  };

  const handleClick = (e) => {
    e.preventDefault();

    if (item.title.trim() === '' || item.description.trim() === '') {
      alert('Need to fill all the fields');
      return;
    }

    const trimmedItem = {
      ...item,
      title: item.title.trim(),
      description: item.description.trim(),
    };

    if (isEdit) {
      editCard(trimmedItem);
    } else {
      const card = {
        ...trimmedItem,
        id: ++itemIndex,
        createdAt: Date.now(),
        colId: `col${columnId}`,
      };

      addCard(card);
    }

    drawerClose();
    setItem(initialState);
  };

  return (
    <div>
      <TextField
        value={item.title}
        className={classes.textBox}
        fullWidth
        multiline
        rows={1}
        rowsMax={7}
        label="Name"
        variant="outlined"
        name="title"
        onChange={handleInputChange}
      />
      <TextField
        value={item.description}
        fullWidth
        label="Description"
        multiline
        rows={1}
        rowsMax={7}
        variant="outlined"
        name="description"
        className={classes.textBox}
        onChange={handleInputChange}
      />
      <ButtonGroup fullWidth size="medium" className={classes.buttonContainer}>
        {isEdit ? (
          <Button
            type="click"
            color="primary"
            variant="contained"
            onClick={handleClick}
          >
            Update
          </Button>
        ) : (
          <Button
            type="click"
            color="primary"
            variant="contained"
            onClick={handleClick}
          >
            Add
          </Button>
        )}
      </ButtonGroup>
    </div>
  );
}

const mapDispatchToProps = (dispatch) => ({
  addCard: (card) => dispatch(addCard(card)),
  editCard: (card) => dispatch(editCard(card)),
});

export default connect(null, mapDispatchToProps)(TaskForm);
