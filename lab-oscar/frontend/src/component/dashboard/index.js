import React from 'react';
import {connect} from 'react-redux';
import PhotoForm from '../photo-upload-form';
import {photoCreateRequest, photoFetchRequest} from '../../action/photo-actions.js';
import PhotoList from '../photo-list';

class Dashboard extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      viewPhotos: true,
    };
    this.handlePhotoCreate = this.handlePhotoCreate.bind(this);
    this.handlePhotoFetch = this.handlePhotoFetch.bind(this);
  }

  handlePhotoFetch(photo) {
    return this.props.photoFetchRequest(photo)
      .then(res => {

      })
      .catch(console.error);
  }

  handlePhotoCreate(photo){
    return this.props.photoCreate(photo)
      .then(res => {
        this.handlePhotoFetch(res.body);
      })
      .catch(console.error);
  }

  render(){
    let handleComplete = this.props.photo === null
      ? this.handlePhotoCreate
      : this.handlePhotoUpdate;

    return (
      <div>
        <h3>Dashboard</h3>
        <PhotoForm
          buttonText='Upload Photo'
          onComplete={this.handlePhotoCreate}
        />
        <PhotoList
          onLoad={this.handlePhotoFetch}
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
  photoFetchRequest: (photo) => dispatch(photoFetchRequest(photo)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard);
