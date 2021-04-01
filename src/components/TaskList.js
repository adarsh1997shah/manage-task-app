import React from 'react';
import { getdate, useDrawer } from '../misc/helper';
import {
  Button,
  Drawer,
  makeStyles,
  Paper,
  Typography,
} from '@material-ui/core';
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';
import VisibilityIcon from '@material-ui/icons/Visibility';
import TaskForm from './TaskForm';
import TaskDetails from './TaskDetails';
import { Draggable } from 'react-beautiful-dnd';
import { connect } from 'react-redux';
import { delCard } from '../actions';

const useStyles = makeStyles((theme) => ({
  root: {
    padding: '6px',
    position: 'relative',
    marginBottom: '10px',
  },
  title: {
    marginTop: '10px',
    wordBreak: 'break-all',
    lineHeight: '20px',
    textAlign: 'justify',
    whiteSpace: 'normal',
  },
  date: {
    display: 'flex',
  },
  edit: {},
  status: {
    display: 'block',
    marginTop: '10px',
    marginBottom: '15px',
  },
  buttonGroup: {
    display: 'flex',
  },
  button: {
    marginRight: '5px',
    minWidth: 0,
    boxShadow: 'none',
    padding: 0,
    backgroundColor: 'inherit',
    '&:hover': {
      backgroundColor: 'inherit',
      boxShadow: 'none',
    },
  },
  drawerWidth: {
    width: '300px',
    padding: '10px',
  },
  detailDrawerWidth: {
    width: '500px',
    padding: '10px',
    overflowY: 'auto',
    [theme.breakpoints.down('sm')]: {
      width: '85vw',
    },
  },
}));

function TaskList({ tasks, taskId, index, delCard }) {
  const { isOpen, handleDrawerClose, handleDrawerOpen } = useDrawer();
  const {
    isOpen: isDetailsOpen,
    handleDrawerClose: handleDetailDrawerClose,
    handleDrawerOpen: handleDetailDrawerOpen,
  } = useDrawer();

  const classes = useStyles();
  const task = tasks[taskId];

  return (
    <Draggable
      draggableId={`task${task.id}`}
      index={index}
      key={`task${task.id}`}
    >
      {(provided) => (
        <Paper
          className={classes.root}
          elevation={1}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          innerRef={provided.innerRef}
        >
          <Typography variant="h6" gutterBottom className={classes.title}>
            {task.title}
          </Typography>

          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
            }}
          >
            <div className={classes.buttonGroup}>
              <div>
                <Button
                  variant="contained"
                  size="small"
                  type="button"
                  onClick={handleDetailDrawerOpen}
                  className={classes.button}
                  title="details"
                >
                  <VisibilityIcon />
                </Button>
                <Drawer
                  anchor="right"
                  open={isDetailsOpen}
                  onClose={handleDetailDrawerClose}
                >
                  <div className={classes.detailDrawerWidth}>
                    <TaskDetails task={task} />
                  </div>
                </Drawer>
              </div>

              <div>
                <Button
                  size="small"
                  variant="contained"
                  type="button"
                  onClick={handleDrawerOpen}
                  className={classes.button}
                  title="edit"
                >
                  <EditIcon color="primary" />
                </Button>
                <Drawer anchor="left" open={isOpen} onClose={handleDrawerClose}>
                  <div className={classes.drawerWidth}>
                    <Typography gutterBottom variant="h4">
                      Edit Task Form
                    </Typography>
                    <TaskForm
                      drawerClose={handleDrawerClose}
                      task={task}
                      isEdit
                    />
                  </div>
                </Drawer>
              </div>

              <Button
                size="small"
                variant="contained"
                type="button"
                onClick={() => delCard(task)}
                className={classes.button}
                title="delete"
              >
                <DeleteIcon color="secondary" />
              </Button>
            </div>

            <Typography
              variant="caption"
              component="div"
              className={classes.date}
            >
              {getdate(task.createdAt)}
            </Typography>
          </div>
        </Paper>
      )}
    </Draggable>
  );
}

const mapStateToProps = (state) => ({
  tasks: state.tasks,
});

const mapDispatchToProps = (dispatch) => ({
  delCard: (card) => dispatch(delCard(card)),
});

export default connect(mapStateToProps, mapDispatchToProps)(TaskList);
