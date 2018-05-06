import Immutable from 'immutable'
import _ from 'lodash';

let init = {
  note: {},
  surname: '',
  email: ''
}

function noteReducer(state = init, action) {
  switch (action.type) {
    case 'NOTE_GET':
      return action.note
      break;
    case 'NOTE_DATA_UPDATED':
      return actionNoteDataUpdated(state, action); break;
      break;
    default: return state;
    break;
  }
}

function actionNoteDataUpdated(state, action) {
  var key = Object.keys(action.note);
  state[key] = action.note[key];

  return _.extend({}, state);
}

export default noteReducer;
