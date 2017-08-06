import React from 'react'
import * as util from '../../lib/util.js'

class PhotoForm extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      url: null,
      description: '',
      preview: '',
    }

    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  handleChange(e) {
    let { value, name } = e.target

    if (name === 'description') this.setState({ description: value })

    if (name === 'url') {
      let url = e.target.files[0]

      this.setState({ url })
      util
        .photoToDataURL(url)
        .then(preview => this.setState({ preview }))
        .catch(console.error)
    }
  }

  handleSubmit(e) {
    e.preventDefault()
    this.props.onComplete(this.state)
  }

  render() {
    return (
      <div className="photo-form">
        <form onSubmit={this.handleSubmit}>
          <img src={this.state.preview} />
          <input type="file" name="url" onChange={this.handleChange} />
          <textarea
            type="text"
            name="description"
            value={this.state.description}
            onChange={this.handleChange}
          />
          <button type="submit"> Submit </button>
        </form>
      </div>
    )
  }
}

export default PhotoForm
