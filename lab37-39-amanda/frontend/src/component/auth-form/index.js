import React from 'react'
import superagent from 'superagent'
import {isEmail, isAlphanumeric, isAscii} from 'validator'
import debounce from 'lodash/fp/debounce'

import Tooltip from '../tooltip'
import * as util from '../../lib/util.js'

class AuthForm extends React.Component {
  constructor(props){
    super(props)
    this.state = {
      email:'',
      password: '',
      username: '',
      emailError: null,
      usernameError: null,
      usernameAvailable: true,
      passwordError: null,
      focused: null,
      error: null,
      submitted: null,
    }

    this.validateInput = this.validateInput.bind(this)
    this.handleChange= this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
    this.handleBlur = this.handleBlur.bind(this)
    this.handleFocus = this.handleFocus.bind(this)
    this.usernameCheckAvailable = this.usernameCheckAvailable.bind(this)
  }

  validateInput(e){
    let {name, value} = e.target

    let errors = {
      emailError : this.state.emailError,
      passwordError: this.state.passwordError,
      usernameError: this.usernameError,
    }

    let setError = (name, error) => {
      let errorName = `${name}Error`
      errors[errorName] = error
    }

    let deleteError = (name) => {
      let errorName = `${name}Error`
      errors[errorName] = null
    }
    if(name === 'email')
      if(!value)
        setError(name, `${name} can not be empty`)
      else if(!isEmail(value))
        setError(name, `${value} is not a valid email`)
      else
        deleteError(name)

    if(name === 'username'){
      if(!value)
        setError(name, `${name} can not be empty`)
      else if(!isAlphanumeric(value))
        setError(name, `username may only containg letters and numbers`)
      else if(value.length < 6)
        setError(name, `username must be 6 characters`)
      else deleteError(name)
    }

    if(name === 'password'){
      if(!value)
        setError(name, `${name} can not be empty`)
      else if(!isAscii(value))
        setError(name, `password may only contain nomral characters`)
      else if(value.length < 6)
        setError(name, `username must be 6 characters`)
      else deleteError(name)
    }

    this.setState({
      ...errors,
      error: !!(errors.emailError || errors.usernameError || errors.passwordError),
    })
  }

  handleFocus(e){
    this.setState({ focused: e.target.name})
  }

  handleBlur(e){
    let {name} = e.target
    this.setState(state => ({
      focused: state.focused == name ? null : state.focused,
    }))
  }

  handleChange(e){
    let {name, value} = e.target
    this.vadidateInput({...e})

    this.setState({
      [name]: value,
      usernameError: name == 'username' && !value ? 'username cannot be empty' : null,
      emailError: name === 'email' && !value ? 'email cannot be empty' : null,
      passwordError: name === 'password' && !value ? 'password cannot be empty': null,
    })
  }

  handleSubmit(e){
    e.preventDefault()
    this.props.onComplete(this.state)
      .then(() => {
        this.setState({username: '', email: '', password: ''})
      })
      .catch(error => {
        console.error(error)
        this.setState({error})
      })
  }

  render(){
    return(
      <form
        className='auth-form'
        onSubmit={this.handleSubmit}
      >

        {util.renderIf(this.props.auth ==='signup',
          <input
            type='text'
            name='email'
            placeholder='email'
            value={this.state.email}
            onChange={this.handleChange}
          />
        )}

        {util.renderIf(this.props.usernameError,
          <span className='tool-tip'>
            {this.state.usernameError}
          </span>
        )}

        <input
          type='text'
          name='username'
          placeholder='username'
          value={this.state.username}
          onChange={this.handleChange}
        />

        {util.renderIf(this.props.passwordError,
          <span className='tool-tip'>
            {this.state.passwordError}
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

    )
  }
}

export default AuthForm
