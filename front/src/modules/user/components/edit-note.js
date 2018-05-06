import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import FlatButton from 'material-ui/FlatButton';
import Drawer from 'material-ui/Drawer';
import AppBar from 'material-ui/AppBar';
import RaisedButton from 'material-ui/RaisedButton';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import {List, ListItem} from 'material-ui/List';
import ActionGrade from 'material-ui/svg-icons/action/grade';
import ActionNoteAdd from 'material-ui/svg-icons/action/note-add';
import ContentInbox from 'material-ui/svg-icons/content/inbox';
import ContentDrafts from 'material-ui/svg-icons/content/drafts';
import ContentSend from 'material-ui/svg-icons/content/send';
import appHistory from '../../../utils/app-history'
import ActionInfo from 'material-ui/svg-icons/action/info';
import Divider from 'material-ui/Divider';
import Subheader from 'material-ui/Subheader';
import Avatar from 'material-ui/Avatar';
import FileFolder from 'material-ui/svg-icons/file/folder';
import ActionAssignment from 'material-ui/svg-icons/action/assignment';
import {blue500, yellow600} from 'material-ui/styles/colors';
import EditorInsertChart from 'material-ui/svg-icons/editor/insert-chart';
import * as EditNoteActions from '../actions/edit-note-actions';
import TextField from 'material-ui/TextField';

import Paper from 'material-ui/Paper';
import Dialog from 'material-ui/Dialog';

class EditNote extends React.Component {
  render() {
    console.log('inside edit');
    console.log(this.props.open);
    const {note, saveNote, updateTitle, updateContent, title, content, handleClose, handleOpen, open, shareNote, updateShareId, shareId} = this.props;
    const actions = [
      <FlatButton
        label="Cancel"
        primary={true}
        onClick={() => { handleClose()}}
      />,
      <FlatButton
        label="Share"
        primary={true}
        keyboardFocused={true}
        onClick={() => { shareNote(shareId); }}
      />,
    ];

    return (
      <div>
        <div>
          <Dialog
            title="Share with your team"
            actions={actions}
            modal={false}
            open={open}
            onRequestClose={() => { handleClose()}}
          >
            <TextField
              hintText="Enter Id to be shared"
              onChange={(event, newValue) => this.props.updateShareId(event, newValue)}
              value={shareId}
            />
          </Dialog>
        </div>
        <Paper zDepth={3} style={{ padding: '20px' }}>
          <div>
            <div><h2>{note.name || "Default"}</h2></div>
            <TextField
              hintText="Enter Title"
              value={title}
              onChange={(event, newValue) => this.props.updateTitle(event, newValue)}
            />
            <Divider />
            <TextField
              floatingLabelText="Add your notes here"
              onChange={(event, newValue) => this.props.updateContent(event, newValue)}
              multiLine={true}
              rows={10}
              value={content}
              rowsMax={100}
            />
            <div>
              <RaisedButton
                  secondary={true}
                  label="Back"
                  onClick={() => {appHistory.push('/user')}}
                  style={{
                    margin: '0 10px',
                  }}
                  primary={true}
                />
              <RaisedButton
                  secondary={true}
                  label="Save"
                  onClick={() => this.props.saveNote()}
                  style={{
                    margin: '0 10px',
                  }}
                  primary={true}
                />
              <RaisedButton
                  secondary={true}
                  label="Share"
                  onClick={() => { handleOpen()}}
                  style={{
                    margin: '0 10px',
                  }}
                  primary={true}
                />
            </div>
          </div>
        </Paper>
      </div>
    )
  }
};

export default EditNote;
