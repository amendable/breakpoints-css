import _ from 'lodash'

export default ({
  breakpoints,
}) => (
  _.first(_.minBy(_.toPairs(breakpoints), ([, value]) => (
    parseFloat(value)
  )))
)
