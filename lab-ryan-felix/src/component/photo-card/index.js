import React from 'react';
import photoToDataURL from '../../lib/photo-to-data-url.js';

class Photo extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      photoURL: '',
    };
  }

  componentDidMount() {
    photoToDataURL(this.props.photo)
      .then(preview => {
        this.setState({
          photoURL: preview,
        });
      });
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      photoURL: '',
    });
    photoToDataURL(nextProps.photo)
      .then(preview => {
        this.setState({
          photoURL: preview,
        });
      });
  }

  render() {
    return (
      <img src={this.state.photoURL} alt={this.props.alt} />
    );
  }


}

const PhotoCard = photo => (
  <div className='photo-card'>
    <Photo
      photo={photo}
      alt={photo.description}
    />
    <p>{photo.description}</p>
    <p><em>{photo._id}</em></p>
  </div>
);

export default PhotoCard;
