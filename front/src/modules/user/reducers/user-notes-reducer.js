import Immutable from 'immutable'
import _ from 'lodash';

let init = [];

function allNoteReducer(state = init, action) {
  switch (action.type) {
    case 'NOTE_GET_ALL':
      return action.allnote
      break;
    default: return state;
    break;
  }
}

export default allNoteReducer;
