import React from 'react';
import {photoFetchRequest} from '../../action/photo-actions.js';

class PhotoList extends React.Component {

  componentWillMount(){
    this.props.onLoad();
  }

  render(){
    return (
      <div>
        <h4>PhotosList</h4>
      </div>
    );
  }
}


export default PhotoList;
