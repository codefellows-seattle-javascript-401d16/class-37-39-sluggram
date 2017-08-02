import React from 'react';
import {Redirect} from 'react-router-dom';
import {renderIf} from '../../lib/util.js';

class LandingPage extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div>
        {renderIf(!this.props.auth,
          <Redirect to='/auth/signin' />
        )}
        <h1>Nice, you signed up and in</h1>
      </div>
    );
  }
}

export default LandingPage;
