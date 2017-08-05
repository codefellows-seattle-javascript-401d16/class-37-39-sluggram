// import React from 'react'
// import {connect} from 'react-redux'
// import {Link} from 'react-router-dom'
//
// import * as util from '../../lib/util.js'
// import {tokenSet} from '../../action/auth-actions.js'
// import * as authActions from '../../action/auth-actions.js'
// import {profileFetchRequest} from '../../action/profile-actions'
//
// class Nav extends React.Component {
//   constructor(props){
//     super(props)
//     this.handleLogout = this.handleLogout.bind(this)
//     this.validateRoute = this.validateRoute.bind(this)
//   }
//
//   componentDidMount(){
//     this.validateRoute(this.props)
//   }
//
//   validateRoute(props){
//     let {match, history} = props
//     let token = util.readCookie('X-Sluggra-Token')
//
//     if(!token){
//       return history.replace('/welcome/signup')
//     }
//
//     this.props.tokenSet(token)
//     this.props.profileFetch()
//     .catch(() => {
//       console.log('PROFILE FETCH ERROR: user does not have a profile')
//       if(!match.url.startsWith('/settings')){
//         return history.replace('/settings')
//       }
//     })
//   }
//
//   handleLogout(){
//     this.props.logout()
//     this.props.history.push('/welcome/login')
//   }
//
//   render(){
//     return(
//       <header className='navbar'>
//         <h1> Cadburygram </h1>
//         <nav>
//           <ul>
//             <li><Link to='/welcome/signup'> signup </Link></li>
//             <li><Link to='/welcome/login'> login </Link></li>
//             <li><Link to='/settings'> settings </Link></li>
//             <li><Link to='/dashboard'> dashboard </Link></li>
//           </ul>
//         </nav>
//         <button onClick={this.handleLogout}> logout </button>
//
//       </header>
//     )
//   }
// }
//
// let mapStateToProps = (state) => ({
//   profile: state.profile,
// })
//
// let mapDispatchToProps = (dispatch) => ({
//   logout: () => dispatch(authActions.logout()),
//   tokenSet: (token) =>  dispatch(tokenSet(token)),
//   profileFetch: () => dispatch(profileFetchRequest()),
// })
//
// export default connect(mapStateToProps, mapDispatchToProps)(Nav)
