import React from 'react';

class Photo extends React.Component{
  constructor(props){
    super(props);
    this.state = {
      _id: '',
      owner: '',
      profile: '',
      comments: '',
      url: '',
      description: '',
    };
  }

  render() {
    let {photo} = this.props;
    return(
      <div className='photo'>
        <img src={this.props.photo.url} />
        <p>{photo.owner}</p>
        <p>{photo.description}</p>
      </div>
    );
  }
}

export default Photo;
