import React from 'react';
import ProfileForm from '../profile-form';
import {connect} from 'react-redux';
import {profileCreateRequest} from '../../action/profile-actions.js';

class SettingsContainer extends React.Component {
  constructor(props){
    super(props);
    this.handleProfileCreate = this.handleProfileCreate.bind(this);
  }

  handleProfileCreate(profile){
    return this.props.profileCreate(profile)
      .then(res => {
        console.log('res', res.body);
        // this.props.history.push('/dashboard')
      })
      .catch(console.error);
  }

  handleProfileUpdate() {

  }

  render() {
    let handleComplete = this.props.profile
      ? this.handleProfileCreate
      : this.handleProfileUpdate;
    return (
      <div className='settings-container'>
        <h2> Settings </h2>

        <ProfileForm
          buttonText='Create Profile'
          onComplete={this.handleProfileCreate}
        />
      </div>
    );
  }
}

let mapStateToProps = (state) => ({
  profile: state.profile,
});
let mapDispatchToProps = (dispatch) => ({
  profileCreate: (profile) => dispatch(profileCreateRequest(profile)),
});

export default connect(mapStateToProps, mapDispatchToProps)(SettingsContainer);
