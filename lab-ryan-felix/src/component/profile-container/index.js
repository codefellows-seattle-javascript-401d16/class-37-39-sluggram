import React from 'react';
import { connect } from 'react-redux';
import ProfileForm from '../profile-form';
import { requestCreateProfile } from '../../action/profile.js';
import { log } from '../../lib/loggers.js';

class ProfileContainer extends React.Component {
  constructor(props) {
    super(props);
    this.handleCreateProfile = this.handleCreateProfile.bind(this);
    this.handleUpdateProfile = this.handleUpdateProfile.bind(this);
  }

  handleCreateProfile(profile) {
    return this.props.createProfile(profile)
      .then(it => (console.log('wattup'), it))
      .then(log)
      .catch(console.error);
  }

  handleUpdateProfile() {
    log('handleUpdateProfile');
  }

  render() {
    const handleSubmit = this.props.profile
      ? this.handleUpdateProfile
      : this.handleCreateProfile;

    return (
      <div className='profile-container'>
        <h2>Settings</h2>
        <ProfileForm
          buttonText='Create Profile'
          onSubmit={this.handleCreateProfile}
        />
      </div>
    );
  }
}

const mapStateToProps = state => ({
  profile: state.profile,
});

const mapDispatchToProps = dispatch => ({
  createProfile: profile => dispatch(requestCreateProfile(profile)),
});

export default connect(mapStateToProps, mapDispatchToProps)(ProfileContainer);
