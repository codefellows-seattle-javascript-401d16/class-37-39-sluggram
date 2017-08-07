import React from 'react';
import * as util from '../../lib/util.js';

class PhotoForm extends React.Component {
  constructor(props){
    super(props);

    this.state = props.photo
      ? {...props.photo, preview: ''}
      : {description: '', photoURL: null, preview: ''};

    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  componentWillReceiveProps(props) {
    if(props.photo)
      this.setState(props.photo);
  }

  handleChange(e) {
    let {type, name} = e.target;

    if (name === 'description') {
      this.setState({description: e.target.value});
    }

    if (name === 'photoURL') {
      let {files} = e.target;
      let photoURL = files[0];
      this.setState({photoURL});
      util.photoToDataURL(photoURL)
        .then(preview => this.setState({preview}))
        .catch(console.err);
    }
  }

  handleSubmit(e) {
    e.preventDefault();
    console.log('submitting photo');
    this.props.onComplete(this.setState);
  }

  render() {
    return(
      <form
        className='photo-form'
        onSubmit={this.handleSubmit} >

        <img src={this.state.preview} />

        <input
          type='file'
          name='photoURL'
          onChange={this.handleChange}
        />

        <textarea
          type='text'
          name='description'
          value={this.state.description}
          onChange={this.handleChange}>
        </textarea>

        <button type='submit'> {this.props.buttonName}</button>

      </form>
    );
  }
}

export default PhotoForm;
