import React from 'react';
import superagent from 'superagent';
import {connect} from 'react-redux';
import PhotoForm from '../photo-form';
import PhotoItem from '../photo-item';
import * as util from '../../lib/util.js';
import {
  photoFetchRequest,
  photoCreateRequest,
  photoUpdateRequest,
  photoDeleteRequest} from '../../actions/photo-actions.js';

class DashboardContainer extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      photos: [],
    };

    this.handlePhotoCreate = this.handlePhotoCreate.bind(this);
    this.handlePhotoDelete = this.handlePhotoDelete.bind(this);
  }

  componentWillMount(){
    return this.props.photoFetch()
      .this(res => {
        this.setState({
          photos: res.body.data,
        });
      });
  }

  handlePhotoCreate(photo){
    return this.props.photoCreate(photo)
      .then(res => {
        this.props.history.push('/dashboard');
      })
      .catch(console.error);
  }

  handlePhotoDelete(photo){
    return this.props.photoDelete(photo)
      .then(res => {
        console.log('photoDelete res', res);
      });
  }

  render() {
    return (
      <div className='dashboard-container'>
        <h2> dashboard </h2>

        <img src={this.props.state.profile.avatar} />

        <PhotoForm
          buttonText='post photo'
          onComplete={this.handlePhotoCreate}
        />

        {util.renderIf(this.props.photos.length > 0,
          this.props.photos.map(item =>
            <PhotoItem
              key={item._id}
              image={item}
              photoDelete={this.handlePhotoDelete}
            />
          )
        )}

      </div>
    );
  }
}

let mapStateToProps = (state) => ({
  photos: state.photos,
  state: state,
});

let mapDispatchToProps = (dispatch) => ({
  photoFetch: () => dispatch(photoFetchRequest()),
  photoCreate: (photo) => dispatch(photoCreateRequest(photo)),
  photoUpdate: (photo) => dispatch(photoUpdateRequest(photo)),
  photoDelete: (photo) => dispatch(photoDeleteRequest(photo)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(DashboardContainer);
