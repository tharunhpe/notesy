import Immutable from 'immutable'
import _ from 'lodash';

let init = {
  note: {},
  surname: '',
  email: ''
}

function userReducer(state = init, action) {
  switch (action.type) {
    case 'USER_GET':
      return action.user
      break;
    case 'USER_DATA_UPDATED':
      return actionUserDataUpdated(state, action); break;
      break;
    default: return state;
    break;
  }
}

function actionUserDataUpdated(state, action) {
  var key = Object.keys(action.user);
  state[key] = action.user[key];

  return _.extend({}, state);
}

export default userReducer;
