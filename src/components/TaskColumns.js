import React, { useState } from 'react';
import {
  Button,
  Drawer,
  makeStyles,
  TextField,
  Typography,
} from '@material-ui/core';
import { Droppable } from 'react-beautiful-dnd';
import { useDrawer } from '../misc/helper';
import TaskForm from './TaskForm';
import { delList, editList } from '../actions';
import { connect } from 'react-redux';
import TaskList from './TaskList';

const useStyles = makeStyles((theme) => ({
  root: {
    marginBottom: '10px',
    display: 'inline-block',
    width: '272px',
    verticalAlign: 'top',
  },
  box: {
    borderRadius: '4px',
    backgroundColor: '#ebecf0',
    height: '100%',
    margin: `0 5px`,
    padding: '7px',
    maxHeight: '82vh',
    overflowY: 'auto',
    overflowX: 'hidden',
    '&::-webkit-scrollbar': {
      height: '8px',
      width: '8px',
    },
    '&::-webkit-scrollbar-button': {
      display: 'block',
      height: '4px',
      width: '4px',
    },
    '&::-webkit-scrollbar-track-piece': {
      background: 'rgba(0,0,0,.15)',
    },
    '&::-webkit-scrollbar-thumb': {
      backgroundColor: 'darkgrey',
      outline: 'none',
      borderRadius: '5px',
    },
  },
  taskContainer: {
    minHeight: '10px',
  },
  drawerWidth: {
    width: '300px',
    padding: '10px',
  },
  buttonContainer: {
    display: 'flex',
    justifyContent: 'space-between',
    '& button': {
      boxShadow: 'none',
    },
  },
  colText: {
    whiteSpace: 'normal',
    wordBreak: 'break-all',
  },
  editListContainer: {
    backgroundColor: 'rgba(0, 0, 0, 0.09)',
    padding: '6px',
    borderRadius: '5px',
    '& button': {
      backgroundColor: 'white',
    },
    '& .listEditForm': {
      marginBottom: '5px',
      backgroundColor: 'white',
      borderRadius: '5px',
      '& input': {
        padding: '8px 12px',
      },
    },
  },
}));

function TaskColumns({ column, isEdit, handleIsEdit, editList, delList }) {
  const { isOpen, handleDrawerOpen, handleDrawerClose } = useDrawer();
  const [colText, setColText] = useState('');
  const classes = useStyles();

  const handleColumnDelete = (colId) => {
    if (window.confirm('It will delete all the cards inside it')) {
      delList(colId);
    }
  };

  const handleColTextChange = (e) => {
    setColText(e.target.value);
  };

  const handleColTextCancel = () => {
    setColText('');
    handleIsEdit(-1);
  };

  const handleColTextSave = (colId) => {
    editList(colId, colText);
    handleIsEdit(-1);
  };

  const handleColEditClick = (title, id) => {
    setColText(title.trim());
    handleIsEdit(id);
  };

  const showTasks = (taskIdArr) => {
    return (
      <div>
        {taskIdArr.length !== 0
          ? taskIdArr.map((taskId, index) => {
              return <TaskList index={index} key={index} taskId={taskId} />;
            })
          : null}
      </div>
    );
  };

  return (
    <>
      <div id={column.id} className={classes.root}>
        <div className={classes.box}>
          {isEdit === column.id ? (
            <div className={classes.editListContainer}>
              <TextField
                fullWidth
                multiline
                rows={1}
                rowsMax={7}
                variant="outlined"
                placeholder="Update list title"
                type="text"
                value={colText}
                onChange={handleColTextChange}
                className="listEditForm"
              />
              <div className="">
                <Button
                  size="small"
                  variant="outlined"
                  type="button"
                  onClick={() => handleColTextSave(column.id)}
                  style={{ marginRight: '5px' }}
                >
                  save
                </Button>
                <Button
                  type="button"
                  size="small"
                  variant="outlined"
                  color="secondary"
                  onClick={handleColTextCancel}
                >
                  cancel
                </Button>
              </div>
            </div>
          ) : (
            <Typography
              className={classes.colText}
              gutterBottom={true}
              variant="h6"
            >
              {column.title}
            </Typography>
          )}
          <Droppable droppableId={`col${column.id}`}>
            {(provided) => (
              <div
                ref={provided.innerRef}
                {...provided.droppableProps}
                className={classes.taskContainer}
              >
                {showTasks(column.taskId)}
                {provided.placeholder}
              </div>
            )}
          </Droppable>

          <div className={classes.buttonContainer}>
            <Button
              className={classes.button}
              onClick={handleDrawerOpen}
              variant="contained"
              color="primary"
              size="small"
            >
              Add Task
            </Button>
            <Drawer anchor="left" open={isOpen} onClose={handleDrawerClose}>
              <div className={classes.drawerWidth}>
                <Typography gutterBottom variant="h4">
                  Task Form
                </Typography>
                <TaskForm
                  drawerClose={handleDrawerClose}
                  columnId={column.id}
                />
              </div>
            </Drawer>

            <Button
              variant="outlined"
              size="small"
              onClick={() => handleColEditClick(column.title, column.id)}
            >
              Edit
            </Button>
            <Button
              variant="contained"
              color="secondary"
              size="small"
              onClick={() => handleColumnDelete(`col${column.id}`)}
            >
              Delete
            </Button>
          </div>
        </div>
      </div>
    </>
  );
}

const mapDispatchToProps = (dispatch) => ({
  delList: (colId) => dispatch(delList(colId)),
  editList: (colId, colText) => dispatch(editList(colId, colText)),
});

export default connect(null, mapDispatchToProps)(TaskColumns);
