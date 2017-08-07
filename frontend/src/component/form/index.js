import React from 'react'
import * as util from '../../lib/util.js'

let defaultValue = (input) => {
  if(input.default)
    return input.default
  let type = input.type || 'text'
  switch(type){
    case 'checkbox':
      return false;
    case 'number':
      return 0
    default:
      return ''
  }
}

let initState = _.reduce((result, input) => {
  result[`${input.name}Error`] = null
  result[`${input.name}Dirty`] = false
  result[`${input.name}Focused`] = false
  result[`${input.name}Pristine`] = true
  result[input.name] = defaultValue(input)
  return result
}, {})

class Form extends React.Component {
  constructor(props){
    this.state = initState(props.inputs)
  }

  render(){
    return (
      <form className={className}>
        {this.props.inputs.map((item, i) => 
          <input 
            key={i}
            name={item.name}
            onBlur={this.handleBlur}
            onFocus={this.handleFocus}
            onChange={this.handleChange}
            value={this.state[item.name]
            className={util.classToggler({
              error: this.state[`${valid}Error`],
              focus: this.state[`${valid}Focus`],
              dirty: this.state[`${valid}Dirty`],
              focused: this.state[`${valid}Focused`],
              pristine: this.state[`${valid}Pristine`],
            })}
            />
        )}
        
      </form>
    )
  }
}
