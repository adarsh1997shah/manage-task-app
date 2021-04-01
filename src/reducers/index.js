import {
  ADD_CARD,
  ADD_COMMENT,
  ADD_LIST,
  DEL_CARD,
  DEL_LIST,
  DRAG,
  EDIT_CARD,
  EDIT_LIST,
} from '../actions/actionTypes';

const initialState = {
  colOrder: [],
  columns: {},
  tasks: {},
};

const changeStatus = (
  from,
  to,
  sourceIndex,
  destinationIndex,
  sourceDropId,
  destDropId,
  taskId,
  prevState,
  task
) => {
  from.splice(sourceIndex, 1);
  to.splice(destinationIndex, 0, taskId);

  return {
    ...prevState,
    tasks: {
      ...prevState.tasks,
      [taskId]: { ...task, colId: destDropId },
    },
    columns: {
      ...prevState.columns,
      [sourceDropId]: {
        ...prevState.columns[sourceDropId],
        taskId: from,
      },
      [destDropId]: {
        ...prevState.columns[destDropId],
        taskId: to,
      },
    },
  };
};

const reducer = (prevState = initialState, action) => {
  let newState = {};

  switch (action.type) {
    case ADD_CARD: {
      const tasks = {
        ...prevState.tasks,
        [`task${action.task.id}`]: action.task,
      };

      const newColumn = {
        ...prevState.columns[action.task.colId],
        taskId: [
          ...prevState.columns[action.task.colId].taskId,
          `task${action.task.id}`,
        ],
      };

      const columns = {
        ...prevState.columns,
        [action.task.colId]: newColumn,
      };

      newState = {
        ...prevState,
        tasks,
        columns,
      };
      break;
    }
    case EDIT_CARD: {
      newState = {
        ...prevState,
        tasks: {
          ...prevState.tasks,
          [`task${action.task.id}`]: { ...action.task },
        },
      };
      break;
    }
    case DEL_CARD: {
      delete prevState.tasks[`task${action.task.id}`];
      const deleteTaskIndex = prevState.columns[
        action.task.colId
      ].taskId.findIndex((taskId) => taskId === `task${action.task.id}`);

      prevState.columns[action.task.colId].taskId.splice(deleteTaskIndex, 1);

      newState = { ...prevState };
      break;
    }
    case ADD_LIST: {
      const newColumn = {
        id: action.id,
        title: action.title,
        taskId: [],
      };

      const columns = {
        ...prevState.columns,
        [`col${action.id}`]: newColumn,
      };

      newState = {
        ...prevState,
        columns: columns,
        colOrder: [...prevState.colOrder, `col${action.id}`],
      };
      break;
    }
    case DEL_LIST: {
      delete prevState.columns[action.colId];

      const findColIndex = prevState.colOrder.findIndex(
        (colId) => colId === action.colId
      );
      prevState.colOrder.splice(findColIndex, 1);

      if (prevState.tasks) {
        Object.keys(prevState.tasks).forEach((taskId) => {
          if (prevState.tasks[taskId].colId === action.colId) {
            delete prevState.tasks[taskId];
          }
        });
      }
      newState = { ...prevState };
      break;
    }
    case EDIT_LIST: {
      prevState.columns[action.colId] = {
        ...prevState.columns[action.colId],
        title: action.colText,
      };

      newState = { ...prevState };
      break;
    }
    case ADD_COMMENT: {
      prevState.tasks[`task${action.task.id}`] = action.task;
      newState = { ...prevState };
      break;
    }
    case DRAG: {
      newState = changeStatus(
        prevState.columns[action.source.droppableId].taskId,
        prevState.columns[action.destination.droppableId].taskId,
        action.source.index,
        action.destination.index,
        action.source.droppableId,
        action.destination.droppableId,
        action.taskId,
        prevState,
        prevState.tasks[action.taskId]
      );
      break;
    }
    default:
      newState = { ...prevState };
  }

  return newState;
};

export default reducer;
