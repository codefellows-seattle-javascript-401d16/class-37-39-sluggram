import React from 'react'
import { connect } from 'react-redux'
import * as util from '../../lib/util.js'

import PhotoForm from '../photo-form'
import { photoSubmitRequest } from '../../action/photo-actions.js'

class DashboardContainer extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      bio: '',
      avatar: null,
    }

    this.handlePhotoSubmit = this.handlePhotoSubmit.bind(this)
  }

  componentWillMount() {
    console.log('dashboard will mount', this.props.profile)
    let { bio, avatar } = this.props.profile

    this.props.profile
      ? this.setState({ bio: bio, avatar: avatar })
      : this.props.history.push('/settings')
  }

  handlePhotoSubmit(photo) {
    return this.props.photoSubmit(photo).catch(console.err)
  }

  render() {
    console.log('render', this.state)
    return (
      <div className="dashboard-container">
        <h2>Dashboard</h2>
        <img src={this.state.avatar} />
        <p>{this.state.bio}</p>
        <PhotoForm onComplete={this.handlePhotoSubmit} />
        {util.renderIf(
          this.props.photos,
          <ul>
            {this.props.photos.map(photo => {
              return <li key={photo._id}><img src={photo.url} /></li>
            })}
          </ul>
        )}
      </div>
    )
  }
}

let mapStateToProps = state => ({
  photos: state.photos,
  profile: state.profile ? state.profile : null,
})
let mapDispatchToProps = dispatch => ({
  photoSubmit: photo => dispatch(photoSubmitRequest(photo)),
})

export default connect(mapStateToProps, mapDispatchToProps)(DashboardContainer)
