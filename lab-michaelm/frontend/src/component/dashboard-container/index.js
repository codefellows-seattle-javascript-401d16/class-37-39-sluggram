import React from 'react';
import {connect} from 'react-redux';
import * as util from '../../lib/util.js';

class DashboardContainer extends React.Component {
  constructor(props){
    super(props);
  }

  render(){
    return(
      <div className='dashboard-container'>
        <h2> You are logged in! </h2>
      </div>
    );
  }
}

let mapStateToProps = (state) => ({
  photos: state.photos,
  state: state,
});


let mapDispatchToProps = (dispatch) => ({
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(DashboardContainer);
