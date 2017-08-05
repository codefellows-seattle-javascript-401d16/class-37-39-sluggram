import React from 'react';
import {connect} from 'react-redux';

class Dashboard extends React.Component{
  constructor(props){
    super(props);
  }

  componentDidMount(store){
    console.log('DID mnt state: ', this.state);
    console.log('DID mnt props: ', this.props);
  }

  componentWillMount(store){
    console.log('WILL mnt state: ', this.state);
    console.log('WILL mnt props: ', this.props);
  }

  render(){
    console.log('dash props: ', this.props);
    return(
      <div className='dashboard'>
        hello Dash
        <img src={this.props.profile.avatar} />
        <h4 className='bio'>{this.props.profile.bio}</h4>
      </div>
    );
  }
}

let mapStateToProps = (state) => ({
  profile: state.profile,
});

let mapDispatchToProps = (dispatch) => ({});


export default connect(mapStateToProps, mapDispatchToProps)(Dashboard);
