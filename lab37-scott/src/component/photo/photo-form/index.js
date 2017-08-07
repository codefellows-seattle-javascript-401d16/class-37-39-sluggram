import React from 'react';
import * as util from '../../../lib/util.js';

class PhotoForm extends React.Component{
  constructor(props){
    super(props);
    this.state = props.photo ? props.photo :
      {
        photoURL: null,
        description: '',
        preview: '',
      };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }



  handleChange(e){
    let {name, files} = e.target;
    if(name === 'description') this.setState({description: e.target.value});
    if(name === 'photoURL'){
      let photoURL = files[0];
      this.setState({photoURL});
      util.photoToDataURL(photoURL)
        .then(preview => {
          this.setState({preview});
        })
        .catch(console.error);
    }
  }

  handleSubmit(e){
    e.preventDefault();
    this.props.onComplete(this.state);
  }

  render(){
    return(
      <div className='photo-form-div'>

        <p>Photo Preview: </p>
        <img src={this.state.preview} height='100' width='100' />
        <form className='photo-form' onSubmit={this.handleSubmit}>
          <input
            type='file'
            name='photoURL'
            onChange={this.handleChange}
          />
          <input
            type='text'
            name='description'
            placeholder='Description'
            value={this.state.description}
            onChange={this.handleChange}
          />
          <button type='submit'>{this.props.buttonText}</button>
        </form>
      </div>
    );
  }
}

export default PhotoForm;
