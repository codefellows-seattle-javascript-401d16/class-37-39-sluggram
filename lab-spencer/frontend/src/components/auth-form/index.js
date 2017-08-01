import React from 'react';
import {log, logError, renderIf} from '../../lib/util.js';

class AuthForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      password: '',
      email: '',
    };
  }

  render() {
    return (
      <form className='auth-form'>
          {renderIf(this.props.type === 'signin',
            <h2>Sign In</h2>
          )}
          {renderIf(this.props.type === 'signup',
            <h2>Sign Up</h2>
          )}
      </form>
    );
  }
}

export default AuthForm;
