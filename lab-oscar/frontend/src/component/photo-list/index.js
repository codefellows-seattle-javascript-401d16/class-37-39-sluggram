import React from 'react';
import {photoFetchRequest} from '../../action/photo-actions.js';

class PhotoList extends React.Component {
  constructor(props){
    console.log('props', props);
    super(props);
  }

  render(){
    let {photo} = this.props;
    return (
      <div>
          {photo.description}
          <img src={photo.url} />
        <button onClick={this.props.photoDelete()}>Delete</button>
      </div>
    );
  }
}


export default PhotoList;
