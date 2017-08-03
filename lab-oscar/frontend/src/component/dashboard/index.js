import React from 'react';
import {connect} from 'react-redux';
import PhotoForm from '../photo-upload-form';
import {photoCreateRequest} from '../../action/photo-actions.js';

class Dashboard extends React.Component {
  constructor(props){
    super(props);
    this.handlePhotoCreate = this.handlePhotoCreate.bind(this);
  }

  handlePhotoCreate(photo){
    return this.props.photoCreate(photo)
      .then(res => {
        this.props.history.push('/dashboard');
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

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard);
