import React from 'react'
import * as util from '../../lib/util.js'

class PhotoForm extends React.Component{
  constructor(props){
    super(props)
    this.state = props.photo // passed in only if updating
      ? {...props.photo, preview: ''} // initial state on update
      : { description: '', image: null, preview: ''} // initial state for creating photo

    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  componentDidUpdate(){
    // console.log('PHOTO FORM STATE', this.state)
  }

  componentWillReceiveProps(props){
    if(props.photo)
      this.setSate(props.photo)
  }

  handleChange(e){
    let {type, name} = e.target
    if(name === 'description'){
      this.setState({description: e.target.value})
    }

    if(name === 'image'){
      let {files} = e.target
      // error handling here
      let image = files[0]
      this.setState({image})
      util.photoToDataURL(image)
      .then(preview => this.setState({preview}))
      .catch(console.error)
    }
  }

  handleSubmit(e){
    e.preventDefault()
    this.props.onComplete(this.state)
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
          onChange={this.handleChange}
          />

        <textarea
          name='description'
          type='text'
          value={this.state.description}
          onChange={this.handleChange}
          />

        <button type='submit'> {this.props.buttonText} </button>

      </form>
    )
  }
}

export default PhotoForm
