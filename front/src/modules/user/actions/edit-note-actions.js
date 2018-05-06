
import request from 'superagent';
import _ from 'lodash';
import * as Config from '../../../utils/config';
import * as NotificationActions from '../../notification/actions/notification-actions'
import appHistory from '../../../utils/app-history'

export function getAllNotes(noteId) {
  return (dispatch) => {
      request
        .get(Config.API_DOMAIN + 'api/getallnotes/' + localStorage.getItem('userId'))
        .set('x-access-token', localStorage.getItem('token'))
        .end((error, response) => {
          dispatch(noteGetAll(response.body));
        });
  }
}

export function getNote(noteId) {
  return (dispatch) => {
      request
        .get(Config.API_DOMAIN + 'api/getNote/'+ noteId + '/' + localStorage.getItem('userId'))
        .set('x-access-token', localStorage.getItem('token'))
        .end((error, response) => {
          dispatch(noteGet(response.body));
        });
  }
}

export function shareNoteId(shareId, noteId) {
  return (dispatch) => {
    request
      .post(Config.API_DOMAIN + 'api/sharenote/'+ noteId + '/' + localStorage.getItem('userId'))
      .set('x-access-token', localStorage.getItem('token'))
      .send({
        shareId: shareId,
      })
      .end((error, response) => {
        return NotificationActions.show('Note shared successfully')(dispatch);
      });
}
}

export function updateNote(note) {
  return (dispatch) => {
      request
        .post(Config.API_DOMAIN + 'api/updatenote/' + note.id + '/' + localStorage.getItem('userId'))
        .set('x-access-token', localStorage.getItem('token'))
        .send({
          name: note.name,
          heading: note.heading,
          content: note.content,
          lastModifiedTime: note.lastModifiedTime,
          lastModifiedUser: note.lastModifiedUser
        })
        .end((error, response) => {
          dispatch(noteDataUpdated(response.body));
          return NotificationActions.show('Note updated successfully')(dispatch);
          appHistory.push(`/user`);
        });
  }
}

export function noteDataUpdated(note) {
  return (dispatch) => {
    dispatch({
      type: 'NOTE_DATA_UPDATED',
      note: note
    });
  }
}

export function noteGet(note) {
  return {type: 'NOTE_GET', note: note};
}
  
export function noteGetAll(allnote) {
  return {type: 'NOTE_GET_ALL', allnote: allnote};
}
