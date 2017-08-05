import React from 'react'
import {connect} from 'react-redux'
import PhotoForm from '../photo-form'
import * as util from '../../lib/util.js'
import * as photoActions from '../../action/photo-actions.js'

class PhotoItem extends React.Component {
  constructor(props){
    super(props)
  }

  render(){
    console.log('__PHOTO-ITEM-PRE-RENDER-RETURN__', this.props)
    let {image} = this.props
    return(
      <div className='photo-item'>
        <h2> photo item </h2>

        

        {util.renderIf(this.props.image.owner === this.props.state.profile.owner,
          <button onClick={() => this.props.photoDelete(image)}> delete photo </button>
        )}
      </div>
    )
  }
}

let mapStateToProps = (state) => ({
  state: state,
})

let mapDispathToProps = () => ({
})

export default connect(
  mapStateToProps,
  mapDispathToProps
)(PhotoItem)
