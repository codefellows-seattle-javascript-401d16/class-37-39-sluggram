import React from 'react';
import {connect} from 'react-redux';
import PhotoForm from '../photo-upload-form';
import {photoCreateRequest, photoFetchRequest, photoDeleteRequest} from '../../action/photo-actions.js';
import PhotoList from '../photo-list';
import {Redirect} from 'react-router-dom';
import './_dashboard.scss';

class Dashboard extends React.Component {
  constructor(props){
    super(props);
    this.props.photoFetchRequest();
    this.state = {
      viewPhotos: true,
    };
    this.handlePhotoCreate = this.handlePhotoCreate.bind(this);
    this.handlePhotoFetch = this.handlePhotoFetch.bind(this);
    this.handlePhotoDelete = this.handlePhotoDelete.bind(this);
  }

  componentWillReceiveProps(props){

  }

  handlePhotoDelete(photo) {
    return this.props.photoDeleteRequest(photo)
    // console.log('testing');
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
        this.props.photoFetchRequest();
      })
      .catch(console.error);
  }

  render(){
    let handleComplete = this.props.photo === null
      ? this.handlePhotoCreate
      : this.handlePhotoUpdate;

    return (
      <div>
        {this.props.auth ?
          <div>
            <h3>Dashboard</h3>
            <PhotoForm
              buttonText='Upload Photo'
              onComplete={this.handlePhotoCreate}
            />

            <ul>
              {this.props.photo ?
                this.props.photo.map(photo =>
                  <li key={photo._id}>
                    {photo.description}
                    <img src={photo.url} />
                    <button onClick={()=>{this.handlePhotoDelete(photo);}}>Delete</button>
                  </li>
                )
                :
                null
              }
            </ul>
          </div>
          :

          <Redirect to='/' />
        }
      </div>
    );
  }
}

let mapStateToProps = (state) => ({
  photo: state.photo,
  auth: state.auth,
});

let mapDispatchToProps = (dispatch) => ({
  photoCreate: (photo) => dispatch(photoCreateRequest(photo)),
  photoFetchRequest: (photo) => dispatch(photoFetchRequest(photo)),
  photoDeleteRequest: (photo) => dispatch(photoDeleteRequest(photo)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard);
