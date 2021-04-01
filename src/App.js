import React, { useState } from 'react';
import { Button, Container, makeStyles, TextField } from '@material-ui/core';
import { DragDropContext } from 'react-beautiful-dnd';
import Navbar from './components/Navbar';
import TaskColumns from './components/TaskColumns';

import './styles/default.css';
import { connect } from 'react-redux';
import { addCard, addList, drag } from './actions';

const useStyles = makeStyles((theme) => ({
  mainContainer: {
    marginTop: '20px',
    position: 'relative',
    padding: '0 5px',
    maxWidth: '100%',
  },
  subContainer: {
    overflowX: 'auto',
    whiteSpace: 'nowrap',
    minHeight: '84vh',
    '&::-webkit-scrollbar': {
      height: '8px',
      width: '12px',
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
  listFormContainer: {
    width: '272px',
    display: 'inline-block',
    verticalAlign: 'top',
    backgroundColor: '#ebecf0',
    padding: '5px',
    '& .listForm': {
      marginBottom: '5px',
      '& input': {
        padding: '8px 12px',
        backgroundColor: 'white',
      },
    },
  },
}));

let colIndex = 0;

function App({ appData, addList, drag }) {
  const [isEdit, setIsEdit] = useState(false);

  const [columnTitle, setColumnTitle] = useState('');

  const classes = useStyles();

  const onDragEnd = (result) => {
    const { draggableId, source, destination } = result;

    if (!destination) {
      return;
    }

    if (
      source.droppableId === destination.droppableId &&
      source.index === destination.index
    ) {
      return;
    }

    drag(draggableId, source, destination);
    console.log('result', result);
  };

  const handleAddColumnList = () => {
    if (columnTitle.trim() === '') {
      setColumnTitle('');
      return;
    }

    addList(columnTitle.trim(), ++colIndex);

    setColumnTitle('');
  };

  const handleColumnTitleChange = (e) => {
    setColumnTitle(e.target.value);
  };

  const handleIsEdit = (id) => {
    setIsEdit(id);
  };

  console.log(appData);

  return (
    <>
      <Navbar />

      <Container className={classes.mainContainer} maxWidth="lg">
        <div className={classes.subContainer}>
          <DragDropContext onDragEnd={onDragEnd}>
            {appData.colOrder
              ? appData.colOrder.map((colId) => (
                  <TaskColumns
                    key={colId}
                    isEdit={isEdit}
                    handleIsEdit={handleIsEdit}
                    column={appData.columns[colId]}
                  />
                ))
              : null}
          </DragDropContext>
          <div className={classes.listFormContainer}>
            <TextField
              variant="outlined"
              fullWidth
              type="text"
              value={columnTitle}
              onChange={handleColumnTitleChange}
              placeholder="Enter list title..."
              className="listForm"
            />
            <div>
              <Button
                size="small"
                variant="contained"
                color="secondary"
                type="button"
                onClick={handleAddColumnList}
              >
                Add list
              </Button>
            </div>
          </div>
        </div>
      </Container>
    </>
  );
}

const mapStateToProps = (state) => ({
  appData: state,
});

const mapDispatchToProps = (dispatch) => ({
  addCard: (card) => dispatch(addCard(card)),
  addList: (title, colId) => dispatch(addList(title, colId)),
  drag: (draggableId, source, destination) =>
    dispatch(drag(draggableId, source, destination)),
});

export default connect(mapStateToProps, mapDispatchToProps)(App);
