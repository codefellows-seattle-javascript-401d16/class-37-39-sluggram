import React from 'react';
import * as util from '../../lib/util.js';

class PhotoForm extends React.Component {
  constructor(props){
    super(props);

    this.state = props.photo
      ? props.photo
      : {description: '', photo: null, preview: ''};

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(e){
    let {name} = e.target;

    if(name === 'description'){
      this.setState({description: e.target.value});
    }

    if(name === 'photo'){
      let {files} = e.target;
      let photo = files[0];
      this.setState({photo});
      util.photoToDataURL(photo)
        .then(preview => this.setState({preview}))
        .catch(console.error);
    }
  }

  handleSubmit(e){
    e.preventDefault();
    return this.props.onComplete(this.state)
      .then(() => {
        if(!this.props.profile){
          this.setState({description: '', preview: '', photo: null});
        }
      });
  }

  render(){
    return(
      <form
        className='photo-form'
        onSubmit={this.handleSubmit} >

        <img src={this.state.preview || this.state.url || ''} />

        <input
          type='file'
          name='photo'
          onChange={this.handleChange}
        />

        <textarea
          type='text'
          name='description'
          value={this.state.description}
          onChange={this.handleChange}>
        </textarea>

        <button type='submit'> {this.props.buttonName} </button>
      </form>
    );
  }
}

export default PhotoForm;
