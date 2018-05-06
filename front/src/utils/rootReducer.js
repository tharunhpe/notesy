import { combineReducers } from 'redux';
import loginReducer from '../modules/login/reducers/login-reducer';
import userReducer from '../modules/user/reducers/user-reducer';
import noteReducer from '../modules/user/reducers/note-reducer';
import allNoteReducer from '../modules/user/reducers/user-notes-reducer';
import allFolderReducer from '../modules/user/reducers/folder-reducer';
import notificationReducer from '../modules/notification/reducers/notification-reducer'

const rootReducer = combineReducers({
  login: loginReducer,
  user: userReducer,
  notification: notificationReducer,
  note: noteReducer,
  allnote: allNoteReducer,
  allfolder: allFolderReducer
});

export default rootReducer;
