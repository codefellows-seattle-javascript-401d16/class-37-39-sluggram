import React from 'react';

class PhotoForm extends React.Component{
  constructor(props){
    super(props);
    this.state = {
      photoURL: null,
      description: '',
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(e){

  }

  handleSubmit(e){
    e.preventDefault();
  }

  render(){
    return(
      <div className='photo-form-div'>
        Hello from photoform
        <form className='photo-form'>
          <input
            type='file'
            name='photoURL'
            placeholder='Photo'
            onChange={this.handleChange}
          />
          <input
            type='text'
            name='description'
            placeholder='Description'
            onChange={this.hanldeChange}
          />
          <button type='submit'>{this.props.buttonText}</button>
        </form>
      </div>
    );
  }
}

export default PhotoForm;
