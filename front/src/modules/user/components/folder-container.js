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

import Folder from './folder';

class FolderContainer extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      createNoteBool: false,
      notesArray: [],
    }
  }

  componentWillMount() {
    const obj = this.props.allfolder.find(o => o.name === this.props.params.name);
    this.setState({ 
      notesArray: obj.notes,
    })
  }

  updateTextField(event, newValue) {
    this.setState({ fileName: newValue });
  }

  addNote() {
    this.setState({ createNoteBool: true });
  }

  createNote() {
      console.log(this.state.fileName, this.props.params.name);
    if(this.state.fileName != ""){
      this.props.actions.addNoteToFolder(this.state.fileName, this.props.params.name);
    }
  }


  render() {
    const { user } = this.props;

    return (
      <MuiThemeProvider>
        <Folder
          {...this.props}
          user={user}
          notesArray={this.state.notesArray}
          createNote={this.createNote.bind(this)}
          updateTextField={this.updateTextField.bind(this)}
          addNote={this.addNote.bind(this)}
          createNoteBool={this.state.createNoteBool}
        />
      </MuiThemeProvider>
    )
  }
};

FolderContainer.propTypes = {
  actions: React.PropTypes.object.isRequired,
};

function mapStateToProps(state) {
  return {
    allnote: state.allnote,
    allfolder: state.allfolder
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(UserActions, dispatch),
    actions2: bindActionCreators(EditNoteActions, dispatch)
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(FolderContainer);
