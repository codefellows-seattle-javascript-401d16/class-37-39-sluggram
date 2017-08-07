import React from 'react';
import * as util from '../../lib/util.js';

class PhotoForm extends React.Component{
  constructor(props){
    super(props);
    this.state = props.photo
      ? {...props.photo, preview: ''}
      : {description: '', image: null, preview: ''};

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

    if(name === 'image'){
      let {files} = e.target;
      let image = files[0];
      this.setState({image});
      util.photoToDataURL(image)
        .then(preview => this.setState({preview}))
        .catch(console.error);
    }
  }

  handleSubmit(e){
    e.preventDefault();
    this.props.onComplete(this.state);
  }

  render(){
    return(
      <form
        className='photo-form'
        onSubmit={this.handleSubmit} >
        <img src={this.state.preview} />
        <input
          type='file'
          name='image'
          conChange={this.handleChange}
        />

        <textarea
          name='description'
          type='text'
          value={this.state.description}
          onChange={this.handleChange}
        />

        <button type='submit'>
          {this.props.buttonText}
        </button>
      </form>
    );
  }
}

export default PhotoForm;
