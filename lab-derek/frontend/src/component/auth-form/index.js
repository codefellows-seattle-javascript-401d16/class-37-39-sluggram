import React from 'react';
import * as util from '../../lib/util.js';

class AuthForm extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      username: '',
      usernameError: null,
      passwordError: null,
      emailError: null,
      email: '',
      password: '',
      error: null,
    }

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(e){
    let {name, value} = e.target;

    this.setState({
      [name]: value,
      usernameError: name == 'username' && !value ? 'username cannot be empty' : null,
      emailError: name == 'email' && !value ? 'email cannot be empty': null,
      passwordError: name == 'password' && !value ? 'password cannot be empty': null,
    });
  }

  handleSubmit(e){
    e.preventDefault();
    this.props.onComplete(this.state)
    .then(() => {
      this.setState({username: '', email: '', password: ''});
    })
    .catch(error => {
      console.error(error);
      this.setState({error});
    })
  }

  render(){
    return(
      <form
        className='auth-form'
        onSubmit={this.handleSubmit}>

        {util.renderIf(this.props.auth === 'signup',
          <input
            type='text'
            name='email'
            placeholder='email'
            value={this.state.email}
            onChange={this.handleChange}
          />
        )}

        {util.renderIf(this.state.usernameError,
          <span className='tooltip'>
            {this.state.usernameError}
          </span>
        )}

        <input
          type='password'
          name='password'
          placeholder='password'
          value={this.state.password}
          onChange={this.handleChange}
        />

        <button type='submit'>
          {this.props.auth}
        </button>
      </form>
    );
  }
}

export default AuthForm;
