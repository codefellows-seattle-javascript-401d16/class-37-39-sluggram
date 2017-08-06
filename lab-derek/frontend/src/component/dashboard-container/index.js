import React from 'react';
import superagent from 'superagent';
import {connect} from 'react-redux';
import PhotoForm from '../photo-form';
import PhotoItem from '../photo-item';
import * as util from '../../lib/util.js';
import * as photoActions from '../../action/photo-actions.js';

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
