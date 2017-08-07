import React from 'react';
import {connect} from 'react-redux';
import PhotoForm from '../photo-form';
import * as photoAction from '../../../action/photo-action.js';

class PhotoItem extends React.Component{
  constructor(props){
    super(props);
    this.state = {editing: false};

    this.handlePhotoUpdate = this.handlePhotoUpdate.bind(this);
    this.handlePhotoDelete = this.handlePhotoDelete.bind(this);
  }

  handlePhotoUpdate(photo){
    console.log('HPU photo: ', photo);
    return this.props.photoUpdate(photo)
      .then(() => this.setState({editing: false}))
      .catch(console.error);
  }

  handlePhotoDelete(photo){

  }

  render(){
    return(
      <div className='photo-item' >
        Hello from photo item
        <PhotoForm
          buttonText='Edit Photo'
          photo={this.props.photo}
          onComplete={this.handlePhotoUpdate}
        />
        <img src={this.props.photo.url} height='100' width='100' />
        <h6>{this.props.photo.description}</h6>
      </div>
    );
  }
}

let mapStateToProps = (state) => ({});

let mapDispatchToProps = (dispatch) => ({
  photoUpdate: (photo) => dispatch(photoAction.photoUpdateRequest(photo)),
});

export default connect(mapStateToProps, mapDispatchToProps)(PhotoItem);
