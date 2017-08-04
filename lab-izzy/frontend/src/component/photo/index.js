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
    return(
      <div className='photo'>
        <img src={this.props.photo.url} />
      </div>
    );
  }
}

export default Photo;
