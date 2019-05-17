//  Created by react-native-create-bridge

import React, { Component } from 'react'
import { requireNativeComponent } from 'react-native'

const TestModule = requireNativeComponent('TestModule', TestModuleView)

export default class TestModuleView extends Component {
  render () {
    return <TestModule {...this.props} />
  }
}

TestModuleView.propTypes = {
  exampleProp: React.PropTypes.string
}
