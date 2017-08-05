import React from 'react'
import {connect} from 'react-redux'
import ProfileForm from '../profile-form'
import * as util from '../../lib/util.js'
import {profileCreateRequest, profileUpdateRequest} from '../../action/profile-actions.js'

class SettingsContainer extends React.Component {
  constructor(props){
    super(props)

    this.handleProfileCreate = this.handleProfileCreate.bind(this)
    this.handleProfileUpdate = this.handleProfileUpdate.bind(this)
  }

  handleProfileCreate(profile){
    console.log('settings handleProfileCreate profile', profile)
    return this.props.profileCreate(profile)
    .then(res => {
      console.log('res', res)
      this.props.history.push('/dashboard')
    })
    .catch(console.error)
  }

  handleProfileUpdate(profile){
    console.log('_SETTINGS-CONTAINER__ handleProfileUpdate this.props.profile', this.props.profile)
    return this.props.profileUpdate(profile)
    .then(res => {
      console.log('profileUpdate res', res)
    })
    .catch(console.error)
  }

  render(){
    console.log('__SETTINGS-CONTAINER-PRE-RENDER-RETURN__', this.props)

    let handleComplete = this.props.profile
    ? this.handleProfileCreate
    : this.handleProfileUpdate

    return(
      <div className='settings-container'>
        <h2> settings </h2>

        <img src={this.props.profile.avatar} />


        <ProfileForm
          buttonText='create profile'
          onComplete={this.handleProfileCreate}
          />

        <ProfileForm
          buttonText='update profile'
          onComplete={this.handleProfileUpdate}
          />
      </div>
    )
  }
}

let mapStateToProps = (state) => ({
  profile: state.profile,
})
let mapDispatchToProps = (dispatch) => ({
  profileCreate: (profile) => dispatch(profileCreateRequest(profile)),
  profileUpdate: (profile) => dispatch(profileUpdateRequest(profile)),
})

export default connect(mapStateToProps, mapDispatchToProps)(SettingsContainer)
