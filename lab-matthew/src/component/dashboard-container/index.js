import React from 'react'
import {connect} from 'react-redux'
import PhotoForm from '../photo-form'
import * as photoActions from '../../action/photo-actions.js'

class DashboardContainer extends React.Component {
  constructor(props){
    super(props)

    this.handlePhotoCreate = this.handlePhotoCreate.bind(this)
  }

  handlePhotoCreate(photo){
    console.log('photo', photo)
    return this.props.photoCreate(photo)
    .then(res => {
      console.log('res', res)
      // this.props.history.push('/dashboard')
    })
    .catch(console.error)
  }

  render(){

    return(
      <div className='dashboard-container'>
        <h2> You are logged in! </h2>
        <PhotoForm
          buttonText = 'post photo'
          onComplete={this.handlePhotoCreate}
          />
      </div>
    )
  }
}


let mapStateToProps = (state) => ({
  photo: state.photo,
})


let mapDispatchToProps = (dispatch) => ({
  photoCreate: (photo) => dispatch(photoActions.photoCreateRequest(photo)),
  // photosUpdate: (photos) => dispatch(photosActions.photosUpdateRequest(photos)),
  // photosDelete: (photos) => dispatch(photosActions.photosDeleteRequest(photos)),
  // photossFetch: () => dispatch(photosActions.photossFetchRequest()),
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(DashboardContainer)
