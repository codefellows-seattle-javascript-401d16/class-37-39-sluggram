import React from 'react';
import {connect} from 'react-redux';
import ProfileForm from '../profile-form';
import {
  profileCreateRequest,
  profileUpdateRequest,
} from '../../action/profile-actions.js';
import {renderIf, log, logError} from '../../lib/util.js';

class SettingsContainer extends React.Component {
  constructor(props) {
    super(props);
    this.handleProfileUpdate = this.handleProfileUpdate.bind(this);
    this.handleProfileCreate = this.handleProfileCreate.bind(this);
  }

  handleProfileCreate(profile) {
    return this.props.profileCreate(profile)
      .then(res => {
        log(res);
        return;
      })
      .catch(err => {
        logError(err);
        return;
      });
  }

  handleProfileUpdate(profile) {

  }

  render() {
    return (
      <div className='settings-container'>
        {renderIf(this.props.auth,
          <Redirect to='/auth/login' />
        )}
        <h2>Profile Settings</h2>
        <ProfileForm
          onComplete={this.props.handleProfileCreate}
        />
      </div>
    );
  }
}

let mapStateToProps = state => ({
  auth: state.auth,
  profile: state.profile,
});

let mapDispatchToProps = (dispatch, getState) => ({
  profileCreate: profile => dispatch(profileCreateRequest(profile)),
  profileUpdate: profile => dispatch(profileUpdateRequest(profile)),
});

export default connect(mapStateToProps, mapDispatchToProps)(SettingsContainer);
