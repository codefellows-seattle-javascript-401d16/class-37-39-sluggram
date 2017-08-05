import React from 'react';
import ProfileForm from '../profile';
import {connect} from 'react-redux';
import * as profileActions from '../../action/profile-action.js';

class Settings extends React.Component{
  constructor(props){
    super(props);

    this.handleProfileCreate = this.handleProfileCreate.bind(this);
  }

  handleProfileCreate(profile){
    //return profile create from the props which invokes profilecreate request
    return this.props.profileCreate(profile)
      .catch(console.error);
  }

  render(){
    console.log('settings props: ', this.props);
    return(
      <div className='settings'>
        <h3>Hello from settings</h3>
        Current Avatar =
        <img src={this.props.profile.avatar} height='100' width='100' />
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
  profileCreate: (profile) => dispatch(profileActions.profileCreateRequest(profile)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Settings);
