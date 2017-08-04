import React from 'react';
import * as util from '../../lib/util.js';

class PhotoUpdateForm extends React.Component {
  constructor(props){
    super(props);

    this.state = props.photo
      ? {...props.photo, preview: ''}
      : {description: '', photoURI: null, preview: ''};

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentWillReceiveProps(props){
    if(props.photo)
      this.setState(props.photo);
  }

  handleChange(e){
    let {type, name} = e.target;

    if(name === 'description'){
      this.setState({description: e.target.value});
    }

    if(name === 'photoURI'){
      let {files} = e.target;
      let photoURI = files[0];
      this.setState({photoURI});
      util.photoToDataURL(photoURI)
        .then(preview => this.setState({preview}))
        .catch(console.error);
    }
  }

  handleSubmit(e){
    e.preventDefault();
    console.log('YAAAAAS');
    this.props.onComplete(this.state);
  }

  render(){
    return(
      <form
        className='photo-update-form'
        onSubmit={this.handleSubmit} >

        <img src={this.state.preview} />

        <input
          type='file'
          name='photoURI'
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

export default PhotoUpdateForm;
