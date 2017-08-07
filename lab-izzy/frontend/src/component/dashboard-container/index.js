import React from 'react';
import Photo from '../photo';
import {connect} from 'react-redux';
import PhotoForm from '../photo-form';
import * as util from '../../lib/util.js';
import * as photoActions from '../../action/photo-actions.js';

class DashboardContainer extends React.Component {
  constructor(props){
    super(props);
  }

  componentDidiMount(){
    this.props.photoFetch()
      .catch(util.logError);
  }

  render() {
    return(
      <div className='dashboard-container'>

        <h2> Dashboard </h2>
        <PhotoForm
          buttonName='post'
          onComplete={(photo) => {
            return this.props.photoCreate(photo)
              .catch(console.error);
          }}
        />
        {this.props.photos.map(photo =>
          <Photo key={photo._id} photo={photo} />
        )}
      </div>
    );
  }
}

let mapStateToProps = (state) => ({
  profile: state.profile,
  photos: state.photos,
});

let mapDispatchToProps = (dispatch) => ({
  photoCreate: (photo) => dispatch(photoActions.photoCreateRequest(photo)),
  photoFetch: (photos) => dispatch(photoActions.photoFetchRequest()),
});

export default connect(mapStateToProps, mapDispatchToProps)(DashboardContainer);
