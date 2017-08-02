import React from 'react';
import {connect} from 'react-redux';
import ProfileForm from '../profile-form';
import {profileCreateRequest} from '../../action/profile-actions.js';

class SettingsContainer extends React.Component {
  constructor(props) {
    super(props);

    this.handleProfileCreate = this.handleProfileCreate.bind(this);
  }

  handleProfileCreate(profile){
    return this.props.profileCreate(profile)
      .then(res => {
        console.log('res', res);
        // this.props.history.push('/dashboard');
      })
      .catch(console.error);
  }
  render() {
    let handleComplete = this.props.profileCreate
      ? this.handleProfileCreate
      : this.handleProfileUpdate;

    return(
      <div className='settings-container'>
        <h2> Settings, Yo! </h2>
        <ProfileForm
          buttonName= 'create profile'
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

export default connect (mapStateToProps, mapDispatchToProps)(SettingsContainer);
