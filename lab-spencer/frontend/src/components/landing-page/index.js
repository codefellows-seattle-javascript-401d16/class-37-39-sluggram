import React from 'react';
import {connect} from 'react-redux';
import {log, logError, destroyCookie} from '../../lib/util.js';
import SettingsContainer from '../settings-container';
import {signOutRequest} from '../../action/user-actions.js';

class LandingPage extends React.Component {
  constructor(props) {
    super(props);

    this.handleSignOut = this.handleSignOut.bind(this);
  }

  componentWillMount() {
    // if(!this.props.auth)
    //   this.props.history.push('/auth/signin');
  }

  handleSignOut(event) {
    event.preventDefault();
    this.props.signOut();
    destroyCookie('X-Sluggram-Token');
    this.props.history.push('/auth/signin');
  }

  render() {
    return (
      <div>
        <h1>Welcome</h1>
        <button
          name='sign-out'
          onClick={this.handleSignOut}
        >Sign Out</button>

        <SettingsContainer />
      </div>
    );
  }
}

const mapStateToProps = state => ({
  auth: state.auth,
  profile: state.profile,
});

const mapDispatchToProps = (dispatch, getState) => ({
  signOut: () => dispatch(signOutRequest()),
});

export default connect(mapStateToProps, mapDispatchToProps)(LandingPage);
