import React from 'react';

class AuthForm extends React.Component{
  constructor(props){
    super(props);
    this.state = {
      username: '',
      email: '',
      password: '',
      usernameError: null,
      emailError: null,
      passwordError: null,
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  // componentWillReceiveProps(props){
  //   if(props.auth) this.setState(props.auth);
  // }

  handleChange(e){
    //pull the name and value objects off the event
    let {name, value} = e.target;
    this.setState({
      [name]: value,
      //handle errors
      usernameError: name == 'username' && !value ? 'username cannot be empty' : null,
      emailError: name == 'email' && !value ? 'email cannot be empty' : null,
      passwordError: name == 'password' && !value ? 'password cannot be empty' : null,
    });
  }

  handleSubmit(e){
    console.log('props submit: ', this.props);
    e.preventDefault();
    console.log('break1');
    this.props.onComplete(this.state)
      .then(() => {
        this.setState({username: '', email: '', password: ''});
        console.log('break2');
      })
      .catch(error => {
        console.error(error);
        this.setState({error});
      });
  }

  render(){
    return(
      <form className='auth-form' onSubmit={this.handleSubmit}>
        <input
          type='text'
          name='email'
          placeholder='Email'
          value={this.state.email}
          onChange={this.handleChange}
        />
        <input
          type='text'
          name='username'
          placeholder='User Name'
          value={this.state.username}
          onChange={this.handleChange}
        />
        <input
          type='password'
          name='password'
          placeholder='Password'
          value={this.state.password}
          onChange={this.handleChange}
        />
        <button type='submit'>{this.props.auth}</button>
      </form>
    );
  }
}

export default AuthForm;
