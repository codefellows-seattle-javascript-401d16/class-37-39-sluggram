import React from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import PhotoForm from '../photo-form';
import { photoCreateRequest, photoFetchRequest, photoDeleteRequest } from '../../action/photo-actions.js';

class Dashboard extends React.Component {
  constructor(props) {
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
      .then((res) => {

      })
      .catch(console.error);
  }

  handlePhotoCreate(photo) {
    return this.props.photoCreate(photo)
      .then((res) => {
        this.props.photoFetchRequest();
      })
      .catch(console.error);
  }

  render() {
    const handleComplete = this.props.photo === null
      ? this.handlePhotoCreate
      : this.handlePhotoUpdate;

    return (
      <div className="dashboard">

        {this.props.auth ?
          <div>
            <PhotoForm
              onComplete={this.handlePhotoCreate}
            />
            <ul>
              {this.props.photo ?
                this.props.photo.map(photo =>
                  <li key={photo._id}>
                    {photo.description}
                    <img src={photo.url} alt="path to url" />
                    <button
                      onClick={() => { this.handlePhotoDelete(photo); }}
                    >
                    Delete
                    </button>
                  </li>,
                )
                :
                null
              }
            </ul>
          </div>
          :

          <Redirect to="/" />
        }
      </div>
    );
  }
}

const mapStateToProps = state => ({
  photo: state.photo,
  auth: state.auth,
});

const mapDispatchToProps = dispatch => ({
  photoCreate: photo => dispatch(photoCreateRequest(photo)),
  photoFetchRequest: photo => dispatch(photoFetchRequest(photo)),
  photoDeleteRequest: photo => dispatch(photoDeleteRequest(photo)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard);
