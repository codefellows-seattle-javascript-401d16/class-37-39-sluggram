import React from 'react'
import {connect} from 'react-redux'
import ProfileForm from '../profile-form'
import {profileCreateRequest, profileUpdate, profileCreate} from '../../action/profile-actions.js'


class SettingsContainer extends React.Component {
  constructor(props){
    super(props)
    this.handleProfileCreate = this.handleProfileCreate.bind(this)
    this.handleProfileUpdate = this.handleProfileUpdate.bind(this)
  }

  handleProfileCreate(profile){
    console.log('profile', profile)
    return this.props.profileCreate(profile)
    .then(res => {
      console.log('res', res)
      // this.props.history.push('/dashboard')
    })
    .catch(console.error)
  }

  handleProfileUpdate(){
    return this.props.profileUpdate(profile)
  }


  render() {
    let handleComplete = this.props.profile
      ? this.handleProfileCreate
      : this.handleProfileUpdate
    return (
      <div className="settings-container">
        <h2>Profile Settings </h2>
        <ProfileForm
        buttonText='Create Profile'
        onComplete={this.handleProfileCreate}
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
})

export default connect(mapStateToProps, mapDispatchToProps)(SettingsContainer)
