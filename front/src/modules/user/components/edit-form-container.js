import React from 'react';

import EditNote from './edit-note';

class EditFormContainer extends React.Component {
  render() {

    return (
      <EditNote
        {...this.props}
      />
    )
  }
};

export default EditFormContainer;
