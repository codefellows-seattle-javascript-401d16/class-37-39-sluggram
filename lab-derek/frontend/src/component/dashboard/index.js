import React from 'react';
import {connect} from 'react-redux';
import * as util from '../../lib/util.js';

class Dashboard extends React.Component {

  render() {
    return (
      <div className='dashboard'>
        <h2> dashboard </h2>
      </div>
    );
  }
}

let mapStateToProps = (state) => ({});

let mapDispatchToProps = (dispatch) => ({});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Dashboard);
