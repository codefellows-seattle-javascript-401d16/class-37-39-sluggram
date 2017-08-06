import React from 'react'
import { connect } from 'react-redux'
import * as util from '../../lib/util.js'

import PhotoForm from '../photo-form'
import { photoSubmitRequest } from '../../action/photo-actions.js'

class DashboardContainer extends React.Component {
  constructor(props) {
    super(props)

    this.handlePhotoSubmit = this.handlePhotoSubmit.bind(this)
  }

  componentWillMount() {
    let profile
    console.log(
      'dashboard will mount',
      JSON.parse(localStorage.getItem('profile'))
    )
    if (!this.props.profile && localStorage.profile) {
      try {
        profile = JSON.parse(localStorage.getItem('profile'))
        this.props.profile.setState({ profile: profile })
      } catch (err) {
        console.error(err)
      }
    }
  }

  handlePhotoSubmit(photo) {
    return this.props.photoSubmit(photo).catch(console.err)
  }

  render() {
    return (
      <div className="dashboard-container">
        <h2>Dashboard</h2>
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
  profile: state.profile ? state.profile : {},
})
let mapDispatchToProps = dispatch => ({
  photoSubmit: photo => dispatch(photoSubmitRequest(photo)),
})

export default connect(mapStateToProps, mapDispatchToProps)(DashboardContainer)
