import React from 'react';
import {connect} from 'react-redux';
import PhotoForm from '../photo-form';
import * as util from '../../lib/util.js';
import PhotoUpdateForm from '../photo-update-form';
import {
  photoCreateRequest,
  photoUpdateRequest,
} from '../../action/photo-actions.js';

class DashboardContainer extends React.Component {
  constructor(props){
    super(props);

    this.handlePhotoCreate = this.handlePhotoCreate.bind(this);
    this.handlePhotoUpdate = this.handlePhotoUpdate.bind(this);
  }

  handlePhotoCreate(photo){
    console.log('photo', photo);
    return this.props.photoCreate(photo)
      .catch(console.error);
  }

  handlePhotoUpdate(photo){
    console.log('photo', photo);
    return this.props.photoUpdate(photo)
      .catch(console.error);
  }

  render() {
    let handleComplete = this.props.photo
      ? this.handlePhotoCreate
      : this.handlePhotoUpdate;

    return(
      <form
        className='dashboard-container'
        onSubmit={this.handleSubmit}>

        <h2> Dashboard </h2>

        {util.renderIf(!this.state.photo,
          <PhotoForm
            buttonName='add photo'
            onComplete={this.handlePhotoCreate}
          />)}

        {util.renderIf(this.state.photo,
          <PhotoUpdateForm
            buttonName='update photo'
            onComplete={this.handlePhotoUpdate}
          />)}

      </form>
    );
  }
}

let mapStateToProps = (state) => ({
  photos: state.photos,
});

let mapDispatchToProps = (dispatch) => ({
  photoCreate: (photo) => dispatch(photoCreateRequest(photo)),
  photoUpdate: (photo) => dispatch(photoUpdateRequest(photo)),
});

export default connect(mapStateToProps, mapDispatchToProps)(DashboardContainer);
