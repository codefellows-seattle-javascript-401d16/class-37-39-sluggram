import React from 'react';
import {connect} from 'react-redux';
import PhotoForm from '../photo-form';
import * as photoAction from '../../../action/photo-action.js';
import * as util from '../../../lib/util.js';

class PhotoItem extends React.Component{
  constructor(props){
    super(props);
    this.state = {editing: false};

    this.handlePhotoUpdate = this.handlePhotoUpdate.bind(this);
    this.handlePhotoDelete = this.handlePhotoDelete.bind(this);
  }

  handlePhotoUpdate(photo){
    return this.props.photoUpdate(photo)
      .then(() => this.setState({editing: false}))
      .catch(console.error);
  }

  handlePhotoDelete(photo){
    console.log('HPD photo: ', photo);
    return this.props.photoDelete(photo)
      .catch(console.error);

  }

  render(){
    return(
      <div className='photo-item' >
        <img src={this.props.photo.url} height='100' width='100' />
        <h6>{this.props.photo.description}</h6>
        {util.renderEither(this.state.editing,

          <PhotoForm
            buttonText='Edit Photo'
            photo={this.props.photo}
            onComplete={this.handlePhotoUpdate}
          />,

          <div className='photo-item-edit-false'>
            <i className="fa fa-pencil-square-o" aria-hidden="true"
              onClick={() => this.setState({editing: true})}>
              Edit Photo
            </i>

            <i className="fa fa-trash" aria-hidden="true"
              onClick={(photo) => this.handlePhotoDelete(this.props.photo)}>
               Delete Photo
            </i>
          </div>
        )}
      </div>
    );
  }
}

let mapStateToProps = (state) => ({});

let mapDispatchToProps = (dispatch) => ({
  photoUpdate: (photo) => dispatch(photoAction.photoUpdateRequest(photo)),
  photoDelete: (photo) => dispatch(photoAction.photoDeleteRequest(photo)),
});

export default connect(mapStateToProps, mapDispatchToProps)(PhotoItem);
