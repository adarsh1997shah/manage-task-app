import {
  ADD_CARD,
  ADD_LIST,
  DEL_CARD,
  DEL_LIST,
  DRAG,
  EDIT_CARD,
  EDIT_LIST,
} from './actionTypes';

// List action creators.
export const addList = (title, colId) => ({ type: ADD_LIST, title, id: colId });
export const delList = (colId) => ({ type: DEL_LIST, colId });
export const editList = (colId, colText) => ({
  type: EDIT_LIST,
  colId: `col${colId}`,
  colText,
});

// Card action creators.
export const addCard = (card) => ({
  type: ADD_CARD,
  task: card,
});

export const editCard = (card) => ({
  type: EDIT_CARD,
  task: card,
});

export const delCard = (card) => ({
  type: DEL_CARD,
  task: card,
});

// Card comments action creators.
export const addComment = (item) => ({ type: 'comment', task: item });

// Card drag action creators.
export const drag = (draggableId, source, destination) => ({
  type: DRAG,
  taskId: draggableId,
  source,
  destination,
});
