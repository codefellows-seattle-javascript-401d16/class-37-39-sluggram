import React from 'react'
import {connect} from 'react-redux'
// import BarForm from '../bar-form'
import * as util from '../../lib/util.js'
// import * as barActions from '../../action/bar-actions.js'
// import BarItem from '../bar-item'
class Dashboard extends React.Component {


  render(){
    return (
      <div className='dashboard'>
        <h2> dashboard </h2>
      </div>
    )
  }
}

let mapStateToProps = () => ({})

let mapDispatchToProps = () => ({
})


export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Dashboard)
