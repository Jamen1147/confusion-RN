import * as ActionTypes from './ActionTypes';

export const comments = (
  state = {
    errMess: null,
    comments: []
  },
  action
) => {
  switch (action.type) {
    case ActionTypes.ADD_COMMENTS:
      return {
        ...state,
        errMess: null,
        comments: action.payload
      };
    case ActionTypes.COMMENTS_FAILED:
      return {
        ...state,
        errMess: action.payload,
        comments: []
      };
    case ActionTypes.ADD_COMMENT:
      const { dishId, rating, author, comment } = action.payload;
      const commentToAdd = {
        id: state.comments.length,
        dishId,
        rating,
        author,
        comment,
        date: new Date().toUTCString()
      };
      return {
        ...state,
        errMess: null,
        comments: [...state.comments, commentToAdd]
      };
    default:
      return state;
  }
};
