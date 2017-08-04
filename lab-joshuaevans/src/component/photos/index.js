import React from 'react';
import { photoFetchRequest } from '../../action/photo-actions.js';

class PhotoList extends React.Component {
  render() {
    const { photo } = this.props;
    return (
      <div>
        {photo.description}
        <img src={photo.url} alt="path of uploaded" />
        <button onClick={this.props.photoDelete()}>Delete</button>
      </div>
    );
  }
}


export default PhotoList;
