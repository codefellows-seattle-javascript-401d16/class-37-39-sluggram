import React from 'react';
import {log, logError, renderIf} from '../../lib/util.js';
import {Redirect} from 'react-router-dom';

class AuthForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      password: '',
      email: '',
      success: false,
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    let {name, value} = event.target;
    this.setState({ [name]: value });
  }

  handleSubmit(event) {
    event.preventDefault();
    this.props.onComplete(this.state);
    this.setState({ success: true });
  }

  render() {
    return (
      <form
        className='auth-form'
        onSubmit={this.handleSubmit}
      >
        <input
          type='text'
          name='username'
          value={this.state.username}
          onChange={this.handleChange}
          placeholder='Username'
          required
        />

        {renderIf(this.props.type === 'signup',
          <input
            type='email'
            name='email'
            value={this.state.email}
            onChange={this.handleChange}
            placeholder='Email'
            required
          />
        )}

        <input
          type='password'
          name='password'
          value={this.state.password}
          onChange={this.handleChange}
          placeholder='Password'
          required
        />

        <button
          type='submit'
          name='auth-button'
        >
          {this.props.type === 'signup' ? 'Sign Up' : 'Sign In'}
        </button>

        {renderIf(this.state.success && (this.props.type === 'signup' || this.props.type === 'signin'),
          <Redirect to='/' />
        )}
      </form>
    );
  }
}

export default AuthForm;
