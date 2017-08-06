import React from 'react';
import {connect} from 'react-redux';
import PhotoForm from '../photo/photo-form';
import * as photoAction from '../../action/photo-action.js';

class Dashboard extends React.Component{
  constructor(props){
    super(props);

    this.handlePhotoCreate = this.handlePhotoCreate.bind(this);
  }

  handlePhotoCreate(photo){
    return this.props.photoCreate(photo)
      .catch(console.error);
  }

  render(){
    console.log('dash props: ', this.props);
    return(
      <div className='dashboard'>
        <h3>Your Dashboard</h3>
        <p>Avatar: </p><img src={this.props.profile.avatar} height='100' width='100'/>
        <p>Bio: </p><h4 className='bio'>{this.props.profile.bio}</h4>
        <h4>Post a new photo</h4>
        <PhotoForm
          buttonText='Post Photo'
          onComplete={this.handleComplete}
        />
        <br></br>
        <h4> Everyones photos! </h4>
        {this.props.photos}
      </div>
    );
  }
}

let mapStateToProps = (state) => ({
  profile: state.profile,
  photos: state.photos,
});

let mapDispatchToProps = (dispatch) => ({
  photoCreate: (photo) => dispatch(photoAction.photoCreateRequest(photo)),
});


export default connect(mapStateToProps, mapDispatchToProps)(Dashboard);
