import React from 'react';
import {connect} from 'react-redux';
import PhotoForm from '../photo-form';
import {photoCreateRequest} from '../../action/photo-actions.js';

class DashboardContainer extends React.Component {
  constructor(props){
    super(props);

    this.handlePhotoCreate = this.handlePhotoCreate.bind(this);
    this.handlePhotoUpdate = this.handlePhotoUpdate.bind(this);
  }

  handlePhotoCreate(photo){
    // console.log('photo', photo);
    return this.props.photoCreate(photo)
      .then(res => {
        // console.log('res', res);
        this.props.history.push('/gallery');
      })
      .catch(console.error);
  }

  handlePhotoUpdate(photo){
    // console.log('photo', photo);
    return this.props.photoUpdate(photo)
      .then(res => {
        // console.log('res', res);
        this.props.history.push('/gallery');
      })
      .catch(console.error);
  }

  render() {
    let handleComplete = this.props.photo
      ? this.handlePhotoCreate
      : this.handlePhotoUpdate;

    return(
      <div className='dashboard-container'>
        <h2> Gallery </h2>

        <PhotoForm
          buttonName='add photo'
          onComplete={this.handlePhotoCreate}
        />
      </div>
    );
  }
}

let mapStateToProps = (state) => ({
  photo: state.photo,
});

let mapDispatchToProps = (dispatch) => ({
  photoCreate: (photo) => dispatch(photoCreateRequest(photo)),
});

export default connect(mapStateToProps, mapDispatchToProps)(DashboardContainer);
