import React from 'react';
import {connect} from 'react-redux';
import PhotoForm from '../photo/photo-form';

class Dashboard extends React.Component{
  constructor(props){
    super(props);
  }

  render(){
    console.log('dash props: ', this.props);
    return(
      <div className='dashboard'>
        <h3>Your Dashboard</h3>
        <p>Avatar: </p><img src={this.props.profile.avatar} height='100' width='100'/>
        <p>Bio: </p><h4 className='bio'>{this.props.profile.bio}</h4>
        <PhotoForm />
        {this.props.photos}
      </div>
    );
  }
}

let mapStateToProps = (state) => ({
  profile: state.profile,
  photos: state.photos,
});

let mapDispatchToProps = (dispatch) => ({});


export default connect(mapStateToProps, mapDispatchToProps)(Dashboard);
