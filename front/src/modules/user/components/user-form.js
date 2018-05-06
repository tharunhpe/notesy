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

class UserForm extends React.Component {
  render() {
    console.log(this.props.allnote);
    const {user, labels, saveUser, createNoteBool} = this.props;
    const linksIcon = this.props.allnote.map((page, index) =>(
      <ListItem
        leftAvatar={<Avatar icon={<ActionAssignment />} backgroundColor={blue500} />}
        rightIcon={<ActionInfo />}
        primaryText={page.name}
        secondaryText="Jan 20, 2014"
        onClick={() => {appHistory.push(`/user/${page.id}`)}}
      />
    ));
    return (
      <div>
        {!createNoteBool ? <div><div className="button-holder">
          <RaisedButton
            secondary={true}
            label={labels.addFolder}
            onClick={() => this.props.addNote()}
            style={{
              margin: '0 10px',
            }}
            primary={true}
          />
          <RaisedButton
            secondary={true}
            label={labels.addNote}
            onClick={() => this.props.addNote()}
            style={{
              margin: '0 10px',
            }}
            primary={true}
          />
        </div>
          <div>
            <List>
              <Subheader inset={true}>Files</Subheader>
              {linksIcon}
            </List>
          </div></div> :
        <div>
          <TextField
             hintText="Enter File Name"
             onChange={(event, newValue) => this.props.updateTextField(event, newValue)}
          />
          <RaisedButton
            secondary={true}
            label="Create"
            onClick={() => this.props.createNote()}
            style={{
              margin: '0 10px',
            }}
            primary={true}
          />
        </div>
          }
        
      </div>
    )
  }
};
function mapStateToProps(state) {
  return {
    allnote: state.allnote
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(EditNoteActions, dispatch)
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(UserForm);
