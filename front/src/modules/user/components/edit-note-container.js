import React from 'react';

import FlatButton from 'material-ui/FlatButton';
import Drawer from 'material-ui/Drawer';
import AppBar from 'material-ui/AppBar';
import RaisedButton from 'material-ui/RaisedButton';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as EditNoteActions from '../actions/edit-note-actions';
import appHistory from '../../../utils/app-history';


import {List, ListItem} from 'material-ui/List';
import ActionGrade from 'material-ui/svg-icons/action/grade';
import ContentInbox from 'material-ui/svg-icons/content/inbox';
import ContentDrafts from 'material-ui/svg-icons/content/drafts';
import ContentSend from 'material-ui/svg-icons/content/send';
import Subheader from 'material-ui/Subheader';

import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

import EditFormContainer from './edit-form-container';

class EditNoteContainer extends React.Component {

  constructor(props) {
    super(props);
    this.handleClose = this.handleClose.bind(this);
    this.handleOpen = this.handleOpen.bind(this);
    this.shareNote = this.shareNote.bind(this);
    this.state = {
      createNoteBool: false,
      content: "",
      title: "",
      open: false,
      shareId: "",
    }
  }

  componentWillMount() {
    this.setState({ 
      createNoteBool: false,
      fileName: "",
    })
  }

  componentDidMount() {
    this.props.actions.getNote(this.props.params.id);
  }

  componentWillReceiveProps(nextProps) {
    this.setState({ 
      content: nextProps.note.content,
      title: nextProps.note.heading,
    })
  }

  saveNote() {
    var copyNote = Object.assign({}, this.props.note);
    copyNote.heading = this.state.title;
    copyNote.content = this.state.content;
    copyNote.lastModifiedTime = Date.now();
    copyNote.lastModifiedUser = this.props.params.id;
    copyNote.id = this.props.params.id;
    this.props.actions.updateNote(copyNote);
    this.props.actions.getNote(this.props.params.id);
  }

  shareNote() {
    console.log(this.state.shareId);
    this.props.actions.shareNoteId(this.state.shareId, this.props.params.id);
    this.setState({
      open: false,
    });
  }

  handleOpen() {
    this.setState({
      open: true,
    });
  }

  handleClose() {
    this.setState({
      open: false,
    });
  }

  updateContent(event, newValue) {
    this.setState({ content: newValue });
  }
  
  updateShareId(event, newValue) {
    this.setState({ shareId: newValue });
  }

  updateTitle(event, newValue) {
    this.setState({ title: newValue });
  }

  render() {
    const { note } = this.props;
    console.log(note, this.state.content, this.state.title);

    return (
      <MuiThemeProvider>
        <EditFormContainer
          note={note}
          saveNote={this.saveNote.bind(this)}
          updateContent={this.updateContent.bind(this)}
          updateTitle={this.updateTitle.bind(this)}
          content={this.state.content}
          title={this.state.title}
          handleClose={this.handleClose}
          handleOpen={this.handleOpen}
          open={this.state.open}
          updateShareId={this.updateShareId.bind(this)}
          shareId={this.state.shareId}
          shareNote={this.shareNote}
        />
      </MuiThemeProvider>
    )
  }
};

EditNoteContainer.propTypes = {
  actions: React.PropTypes.object.isRequired,
};

function mapStateToProps(state) {
  return {
    note: state.note
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(EditNoteActions, dispatch)
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(EditNoteContainer);
