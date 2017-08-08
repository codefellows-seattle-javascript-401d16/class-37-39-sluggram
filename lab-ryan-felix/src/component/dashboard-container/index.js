import React from 'react';
import PhotoCard from '../photo-card';
import PhotoUploadForm from '../photo-upload-form';
import { connect } from 'react-redux';
import { requestPopulatePhotos, requestCreatePhoto } from '../../action/photo.js';


class DashboardContainer extends React.Component {

  componentWillMount() {
    this.props.populatePhotos();
  }

  render() {
    return (
      <div className='dashboard'>
        <h1>Dashboard</h1>
        <PhotoUploadForm
          onSubmit={photo => console.log(photo)}
          buttonText='Upload Photo'
        />
        { this.props.photos.map(photo => (
          <PhotoCard
            key={photo._id}
            photo={photo}
          />
        ))}
      </div>
    );
  }
}

const mapStateToProps = state => ({
  photos: state.photos,
});

const mapDispatchToProps = dispatch => ({
  populatePhotos: () => dispatch(requestPopulatePhotos()),
  createPhoto: photo => dispatch(requestCreatePhoto(photo)),
});

export default connect(mapStateToProps, mapDispatchToProps)(DashboardContainer);
