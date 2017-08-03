import React from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import TextField from 'material-ui/TextField';
import Dialog from 'material-ui/Dialog';
import RaisedButton from 'material-ui/RaisedButton';
import * as util from '../../lib/util.js';

class AuthForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      usernameError: null,
      passwordError: null,
      emailError: null,
      email: '',
      password: '',
      error: null,
      open: false,
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(e) {
    const { name, value } = e.target;

    this.setState({
      [name]: value,
      usernameError: name === 'username' && !value ? 'username can not be empty' : null,
      emailError: name === 'email' && !value ? 'email can not be empty' : null,
      passwordError: name === 'password' && !value ? 'password can not be empty' : null,
    });
  }


  dialogToggle(e){
    if(!this.state.open)
      this.setState({ open: true })
  }

  handleSubmit(e) {
    e.preventDefault();
    this.props.onComplete(this.state)
      .then(() => {
        this.setState({ username: '', email: '', password: '' });
      })
      .catch((error) => {
        console.error(error);
        this.setState({ error });
      });
  }

  render() {
    return (
      <MuiThemeProvider>
      <Dialog
          modal={false}
          open={this.dialogToggle}
          onRequestClose={this.handleClose}
      >
      <form
        onSubmit={this.handleSubmit}
        className="auth-form"
      >

        {util.renderIf(this.props.auth === 'signup',
          <MuiThemeProvider>
            <TextField
              type="text"
              name="email"
              placeholder="email"
              value={this.state.email}
              onChange={this.handleChange}
              style={{display: 'block', margin: '0 auto'}}
            />
          </MuiThemeProvider>)}

        {util.renderIf(this.state.usernameError,
          <span className="tooltip">
            {this.state.usernameError}
          </span>,
        )}
        <MuiThemeProvider>
          <TextField
            type="text"
            name="username"
            placeholder="username"
            value={this.state.username}
            onChange={this.handleChange}
            style={{display: 'block', margin: '0 auto'}}
          />
        </MuiThemeProvider>

        {util.renderIf(this.state.passwordError,
          <span className="tooltip">
            {this.state.passwordError}
          </span>,
        )}
        <MuiThemeProvider>
          <TextField
            type="password"
            name="password"
            placeholder="password"
            value={this.state.password}
            onChange={this.handleChange}
            style={{display: 'block', margin: '0 auto'}}
          />
        </MuiThemeProvider>

        <MuiThemeProvider>
          <RaisedButton
            type="submit"
            label={this.props.auth}
            style={{display: 'block', margin: '0 auto'}}
          />
        </MuiThemeProvider>

      </form>
      </Dialog>
      </MuiThemeProvider>
    );
  }
}

export default AuthForm;
