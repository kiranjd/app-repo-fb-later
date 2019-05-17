import { NativeModules } from 'react-native'

const { Stream } = NativeModules

export default {
  exampleMethod () {
    return Stream.exampleMethod()
  },

  EXAMPLE_CONSTANT: Stream.EXAMPLE_CONSTANT
}