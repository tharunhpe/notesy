import React from 'react';

import FlatButton from 'material-ui/FlatButton';
import Drawer from 'material-ui/Drawer';
import AppBar from 'material-ui/AppBar';
import RaisedButton from 'material-ui/RaisedButton';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as UserActions from '../actions/user-actions';
import appHistory from '../../../utils/app-history';


import {List, ListItem} from 'material-ui/List';
import ActionGrade from 'material-ui/svg-icons/action/grade';
import ContentInbox from 'material-ui/svg-icons/content/inbox';
import ContentDrafts from 'material-ui/svg-icons/content/drafts';
import ContentSend from 'material-ui/svg-icons/content/send';
import Subheader from 'material-ui/Subheader';
import * as EditNoteActions from '../actions/edit-note-actions';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

import UserFormContainer from './user-form-container';

class UserContainer extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      createNoteBool: false,
      fileName: "",
    }
  }

  componentWillMount() {
    this.setState({ 
      createNoteBool: false,
      fileName: "",
    })
  }

  componentDidMount() {
    this.props.actions.getUser();
    this.props.actions2.getAllNotes(this.props.params.id);
  }

  updateUser() {
    this.props.actions.updateUser(this.props.user);
  }

  updateTextField(event, newValue) {
    this.setState({ fileName: newValue });
  }

  addNote() {
    this.setState({ createNoteBool: true });
  }

  createNote() {
    if(this.state.fileName != ""){
      this.props.actions.addNote(this.state.fileName);
    }
  }

  onChangeEmail(event) {
    this.props.actions.userDataUpdated({email: event.target.value});
  }

  onChangeSurname(event) {
    this.props.actions.userDataUpdated({surname: event.target.value});
  }

  render() {
    const { user } = this.props;

    return (
      <MuiThemeProvider>
        <UserFormContainer
          {...this.props}
          user={user}
          actionType={'edit'}
          updateUser={this.updateUser.bind(this)}
          createNote={this.createNote.bind(this)}
          updateTextField={this.updateTextField.bind(this)}
          addNote={this.addNote.bind(this)}
          onChangeEmail={this.onChangeEmail.bind(this)}
          onChangeSurname={this.onChangeSurname.bind(this)}
          createNoteBool={this.state.createNoteBool}
        />
      </MuiThemeProvider>
    )
  }
};

UserContainer.propTypes = {
  actions: React.PropTypes.object.isRequired,
};

function mapStateToProps(state) {
  return {
    user: state.user
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(UserActions, dispatch),
    actions2: bindActionCreators(EditNoteActions, dispatch)
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(UserContainer);
