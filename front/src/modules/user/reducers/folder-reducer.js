import Immutable from 'immutable'
import _ from 'lodash';

let init = [];

function allFolderReducer(state = init, action) {
  switch (action.type) {
    case 'FOLDER_GET_ALL':
      return action.allfolder
      break;
    default: return state;
    break;
  }
}

export default allFolderReducer;
