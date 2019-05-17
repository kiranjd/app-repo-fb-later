
import React, { Component } from 'react';
import { CheckBox } from 'react-native-elements';
import PropTypes from 'prop-types';

export default class CustomCheckbox extends Component {
  constructor(props) {
    super(props);

    this.state = {
      checked: false
    };

    this.handler = this.handler.bind(this);
  }

  handler(e){
    let { checked } = this.state;
    this.setState({checked: !checked})
    this.props.filterUser(this.props.tag, !checked, this.props.type);
  }

  render() {
    const { tag } = this.props;
    const { checked } = this.state;

    return (
      <CheckBox
        key={tag}
        title={tag}
        checked={checked}
        onPress={this.handler}
        //onPress={() => }
      />
    );
  }
}


// call this function in the render method of another Component
