import React from 'react';

import UserForm from './user-form';

class UserFormContainer extends React.Component {
  render() {
    const labels = { addNote: 'Create Note', addFolder: 'Create Folder' };

    return (
      <UserForm
        {...this.props}
        labels={labels}
      />
    )
  }
};

export default UserFormContainer;
