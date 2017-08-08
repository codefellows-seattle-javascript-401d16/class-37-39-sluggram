import React from 'react';
import photoToDataURL from '../../lib/photo-to-data-url.js';

export default class PhotoUploadForm extends React.Component {
  constructor(props) {
    super(props);
    const photo = props.photo || {};
    this.state = {
      description: photo.description || '',
      preview: photo.preview || '',
      photo: photo.photo || '',
      _id: photo._id || '',
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentWillMount() {
    if(this.props.photo && this.props.photo.photo) {
      photoToDataURL(this.props.photo)
        .then(preview => this.setState({ preview }));
    }
  }

  handleChange(evt) {
    const { name, value } = evt.target;
    if(name === 'photo') {
      const { files } = evt.target;
      const photo = files[0];
      photoToDataURL(photo)
        .then(preview => {
          this.setState({
            preview,
            photo,
          });
        });
    } else {
      this.setState({
        [name]: value,
      });
    }
  }

  handleSubmit(evt) {
    evt.preventDefault();
    this.props.onSubmit(this.state);
  }

  render() {
    return (
      <form
        className='photo-upload-form'
        onSubmit={this.handleSubmit}
      >
        <img src={this.state.preview} />
        <input
          type='file'
          name='photo'
          onChange={this.handleChange}
        />
        <textarea
          type='text'
          name='description'
          value={this.state.description}
          onChange={this.handleChange}
        />
        <button
          type='submit'
        >
          {this.props.buttonText}
        </button>
      </form>
    );
  }
}
