import React from 'react';
import {connect} from 'react-redux';
import PhotoForm from '../photo-upload-form';
import {photoCreateRequest, photoFetchRequest,
  photoDeleteRequest,photoUpdateRequest} from '../../action/photo-actions.js';
import PhotoList from '../photo-list';
import {Redirect} from 'react-router-dom';
import './_dashboard.scss';
import MainNavigation from '../main-navigation';
import DashWidget from '../dashwidget';

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

  handlePhotoDelete(photo) {
    return this.props.photoDeleteRequest(photo);
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
      <div className='dashboard'>
        <MainNavigation />
        {this.props.auth ?
          <div className='dashboard-content'>
            <p className='dashboard-title'>Dashboard</p>
            <DashWidget />

            <PhotoForm
              buttonText='Upload Photo'
              onComplete={this.handlePhotoCreate}
            />

            <ul>

              {this.props.photo ?
                this.props.photo.map(photo =>
                  <div key={photo._id}>
                    <li>
                      {photo.description}
                      <img src={photo.url} />
                      <button onClick={()=>{this.handlePhotoDelete(photo);}}>Delete</button>
                    </li>

                    <PhotoForm
                      photo={photo}
                      buttonText='Update Desc'
                      onComplete={(data)=>{
                        data._id = photo._id;
                        this.props.photoUpdateRequest(data);}}
                    />
                  </div>
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
  photoUpdateRequest: (photo) => dispatch(photoUpdateRequest(photo)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard);
