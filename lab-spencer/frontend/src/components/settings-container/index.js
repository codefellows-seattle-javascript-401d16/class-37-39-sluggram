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

  componentWillMount() {

  }

  handleProfileCreate(profile) {
    return this.props.profileCreate(profile)
      .catch(logError);
  }

  handleProfileUpdate(profile) {

  }

  render() {
    return (
      <div className='settings-container'>
        <h2>Profile Settings</h2>
        <ProfileForm
          onComplete={this.handleProfileCreate}
          buttonText={this.props.profile ? 'Update' : 'Submit'}
          profile={this.props.profile}
        />
      </div>
    );
  }
}

const mapStateToProps = state => ({
  auth: state.auth,
  profile: state.profile,
});

const mapDispatchToProps = (dispatch, getState) => ({
  profileCreate: profile => dispatch(profileCreateRequest(profile)),
  profileUpdate: profile => dispatch(profileUpdateRequest(profile)),
});

export default connect(mapStateToProps, mapDispatchToProps)(SettingsContainer);
