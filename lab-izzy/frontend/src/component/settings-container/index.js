import React from 'react';
import {connect} from 'react-redux';
import ProfileForm from '../profile-form';
import * as util from '../../lib/util.js';
import ProfileUpdateForm from '../profile-update-form';
import {
  profileCreateRequest,
  profileUpdateRequest,
} from '../../action/profile-actions.js';

class SettingsContainer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      profile: props.profile ? props.profile : undefined,
    };

    this.handleProfileCreate = this.handleProfileCreate.bind(this);
    this.handleProfileUpdate = this.handleProfileUpdate.bind(this);
  }

  handleProfileCreate(profile){
    return this.props.profileCreate(profile)
      .then(res => {
        // console.log('res', res);
        this.props.history.push('/dashboard');
      })
      .catch(console.error);
  }

  handleProfileUpdate(profile){
    return this.props.profileUpdate(profile)
      .then(res => {
        // console.log('res', res);
        this.props.history.push('/dashboard');
      })
      .catch(console.error);
  }

  render() {
    let handleComplete = this.props.profile
      ? this.handleProfileCreate
      : this.handleProfileUpdate;

    return(
      <form
        className='settings-container'
        onSubmit={this.handleSubmit}>

        <h2> Settings, Yo! </h2>
        
        {util.renderIf(!this.state.profile,
          <ProfileForm
            buttonName='create profile'
            onComplete={this.handleProfileCreate}
          />)}
        {util.renderIf(this.state.profile,
          <ProfileUpdateForm
            buttonName='update profile'
            onComplete={this.handleProfileUpdate}
          />)}
      </form>
    );
  }
}

let mapStateToProps = (state) => ({
  profile: state.profile,
});

let mapDispatchToProps = (dispatch) => ({
  profileCreate: (profile) => dispatch(profileCreateRequest(profile)),
  profileUpdate: (profile) => dispatch(profileUpdateRequest(profile)),
});

export default connect (mapStateToProps, mapDispatchToProps)(SettingsContainer);
