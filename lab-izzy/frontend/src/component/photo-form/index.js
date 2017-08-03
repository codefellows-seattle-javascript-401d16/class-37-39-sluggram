import React from 'react';
import * as util from '../../lib/util.js';

class PhotoForm extends React.Component {
  constructor(props){
    super(props);

    this.state = props.photo
      ? {...props.photo, preview: ''}
      : {caption: '', avatar: null, preview: ''};

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentWillReceiveProps(props){
    if(props.photo)
      this.setState(props.photo);
  }

  handleChange(e){
    let {type, name} = e.target;

    if(name === 'caption'){
      this.setState({caption: e.target.value});
    }

    if(name === 'avatar'){
      let {files} = e.target;
      let avatar = files[0];
      this.setState({avatar});
      util.photoToDataURL(avatar)
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
        className='photo-form'
        onSubmit={this.handleSubmit} >

        <img src={this.state.preview} />

        <input
          type='file'
          name='avatar'
          onChange={this.handleChange}
        />

        <textarea
          type='text'
          name='caption'
          value={this.state.caption}
          onChange={this.handleChange}>
        </textarea>

        <button type='submit'> {this.props.buttonName}</button>
      </form>
    );
  }
}

export default PhotoForm;
