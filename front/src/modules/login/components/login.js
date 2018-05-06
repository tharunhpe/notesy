import React from 'react';

import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import appHistory from '../../../utils/app-history'

class Login extends React.Component {
  render() {
    const { onChangeUsername, onChangePassword, onLogin } = this.props;
    const { username, password } = this.props;
    const style = {
      margin: 12
    };
    
    return (
      <MuiThemeProvider>
        <div className="limiter">
          <div><h2>Welcome to Notesy</h2></div>
          <TextField
            name={'username'}
            value={username}
            onChange={onChangeUsername}
            floatingLabelText="Username"
          />
          <TextField
            name={'password'}
            value={password}
            onChange={onChangePassword}
            floatingLabelText="Password"
            type="password"
          />
          <div className="button-holder">
            <RaisedButton
              label="Sign In"
              primary={true}
              fullWidth={true}
              onClick={onLogin}
            />
          </div>
          <div className="button-holder">
            <RaisedButton
              label="Sign Up"
              secondary={true}
              fullWidth={true}
              style={style}
              onClick={() => appHistory.push('/register')} />
          </div>
        </div>
      </MuiThemeProvider>
    )
  }
};

export default Login;
