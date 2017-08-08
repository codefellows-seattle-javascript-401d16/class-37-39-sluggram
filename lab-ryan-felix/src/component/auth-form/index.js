import React from 'react';
import { renderIf, classToggler } from '../../lib/util.js';

const fields = ['username', 'password', 'email'];

export default class AuthForm extends React.Component {
  constructor(props) {
    super(props);
    // comma operator abuse alert
    this.state = {
      ...fields.reduce((obj, field) => (obj[field] = '', obj), {}),
      ...fields.reduce((obj, field) => (obj[`${field}Error`] = false, obj), {}),
      error: null,
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.checkFields = this.checkFields.bind(this);
  }

  checkFields() {

    const errors = {};
    fields.forEach(field => errors.field = false);
    fields.forEach(field => {
      if(!this.state[field]) {
        errors[`${field}Error`] = true;
      } else {
        errors[`${field}Error`] = false;
      }
    });
    const status = !fields.reduce((status, field) => status || this.state[`${field}Error`], false);
    this.setState({...errors});
    return status;
  }

  handleChange(evt) {
    evt.preventDefault();
    const { name, value } = evt.target;
    this.setState(state => ({
      ...state,
      [name]: value,
    }));
  }

  handleSubmit(evt) {
    evt.preventDefault();
    if(this.checkFields()) {
      return this.props.onSubmit(this.state)
        .catch(error => {
          console.error(error);
          this.setState({
            error,
          });
        });
    }
  }

  render() {
    return (
      <form
        onSubmit={this.handleSubmit}
        className='auth-form'
      >
        { renderIf(this.props.auth === 'signup',
          <input
            type='text'
            name='email'
            placeholder='example@example.com'
            className={ classToggler({
              invalid: this.state.emailError,
            })}
            value={this.state.email}
            onChange={this.handleChange}
          />)
        }

        <input
          type='text'
          name='username'
          placeholder='username'
          className={ classToggler({
            invalid: this.state.usernameError,
          })}
          value={this.state.username}
          onChange={this.handleChange}
        />
        <input
          type='password'
          name='password'
          placeholder='password'
          className={ classToggler({
            invalid: this.state.passwordError,
          })}
          value={this.state.password}
          onChange={this.handleChange}
        />
        <button
          type='submit'
        >
          {this.props.auth}
        </button>
      </form>
    );
  }
}
