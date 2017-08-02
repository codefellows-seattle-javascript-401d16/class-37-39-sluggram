import React from 'react';
import {connect} from 'react-redux';
import {log, logError} from '../../lib/util.js';

class LandingPage extends React.Component {
  constructor(props) {
    super(props);
  }

  componentWillMount() {
    log('landing', this.props.auth);
    if(!this.props.auth)
      this.props.history.push('/auth/signin');
  }

  render() {
    return (
      <div>
        <h1>Nice, you signed up and in</h1>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  auth: state.auth,
  profile: state.profile,
});

const mapDispatchToProps = (dispatch, getState) => ({});

export default connect(mapStateToProps, mapDispatchToProps)(LandingPage);
