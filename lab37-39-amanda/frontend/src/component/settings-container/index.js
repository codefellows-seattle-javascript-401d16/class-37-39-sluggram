import React from 'react'
import {connect} from 'react-redux'
import ProfileForm from '../profile-form'
import {userProfileCreateRequest, userProfileUpdateRequest} from '../../action/profile-actions.js'

class SettingsContainer extends React.Component {
  constructor(props){
    super(props)
    this.handleProfileCreate = this.handleProfileCreate.bind(this)
    this.handleProfileUpdate = this.handleProfileUpdate.bind(this)
  }

  handleProfileCreate(userProfile){
    console.log('profile', userProfile)
    return this.props.userProfileCreate(userProfile)
      .then(res => {
        console.log('res', res)
      })
      .catch(console.error)
  }

  handleProfileUpdate(profile){
    return this.props.userProfileUpdate(profile)
      .catch(console.error)
  }

  render(){
    let handleComplete = this.props.userProfile
      ? this.handleProfileCreate
      : this.handleProfileUpdate

    return (
      <div className='settings-container'>
        <h2> settings </h2>

        <ProfileForm
          profile={this.props.userProfile}
          buttonText='create user profile'
          onComplete={handleComplete} />
      </div>
    )
  }
}

let mapStateToProps = (state) => ({
  userProfile: state.userProfile,
})

let mapDispatchToProps = (dispatch) => ({
  userProfileCreate: (userProfile) => dispatch(userProfileCreateRequest(userProfile)),
  userProfileUpdate: (userProfile) => dispatch(userProfileCreateRequest(userProfile)),
})

export default connect(mapStateToProps, mapDispatchToProps)(SettingsContainer)
