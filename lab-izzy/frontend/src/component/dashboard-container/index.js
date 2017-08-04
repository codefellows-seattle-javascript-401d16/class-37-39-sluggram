import React from 'react';
import {connect} from 'react-redux';
import Photo from '../photo';
import PhotoForm from '../photo-form';
import * as util from '../../lib/util.js';
import PhotoUpdateForm from '../photo-update-form';
import {
  photoCreateRequest,
  photoUpdateRequest,
  photoDeleteRequest,
} from '../../action/photo-actions.js';

class DashboardContainer extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      editing: false,
    };
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
    let {photo} = this.props;
    let handleComplete = this.props.photo
      ? this.handlePhotoCreate
      : this.handlePhotoUpdate;

    return(
      <div
        className='dashboard-container'
        onSubmit={this.handleSubmit}>

        <h2> Dashboard </h2>
        <li onDoubleClick={() => this.setState(state => ({editing: !state.editing}))}>
          {util.renderIf(!this.state.editing,
            <div>
              <PhotoForm
                photo={photo}
                buttonName='add photo'
                onComplete={this.handlePhotoCreate} />
              <button onClick={() => this.props.photoDelete(photo)}>
                delete
              </button>
              {/* <p> description: {photo.description} </p> */}
            </div>)}

          {util.renderIf(this.state.editing,
            <PhotoUpdateForm
              photo={photo}
              buttonName='update photo'
              onComplete={this.handlePhotoUpdate}
            />
          )}
        </li>
      </div>
    );
  }
}

let mapStateToProps = (state) => ({
  photos: state.photos,
});

let mapDispatchToProps = (dispatch) => ({
  photoCreate: (photo) => dispatch(photoCreateRequest(photo)),
  photoUpdate: (photo) => dispatch(photoUpdateRequest(photo)),
  photoDelete: (photo) => dispatch(photoDeleteRequest(photo)),
});

export default connect(mapStateToProps, mapDispatchToProps)(DashboardContainer);
