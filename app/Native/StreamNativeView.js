import React, { Component } from 'react'
import { requireNativeComponent } from 'react-native'

const Stream = requireNativeComponent('Stream', StreamView)

export default class StreamView extends Component {
  render () {
    return <Stream {...this.props} />
  }
}

StreamView.propTypes = {
  exampleProp: React.PropTypes.any
}