import _ from 'lodash'
import defaultBreakpoints from './defaultBreakpoints'

export default ({ breakpoints = defaultBreakpoints } = { breakpoints: defaultBreakpoints }) => (
  (props, { applyResolvers }) => {
    _.each(props, (value, key) => {
      if (!_.isPlainObject(value)) return
      if (_.isEmpty(_.intersection(_.keys(value), _.keys(breakpoints)))) return

      const sortedValues = _.reduce(breakpoints, (memo, val, key) => {
        if (_.isUndefined(value[key])) return memo

        memo[key] = value[key]
        return memo
      }, {})

      _.each(sortedValues, (innerValue, innerKey) => {
        if (_.isUndefined(breakpoints[innerKey])) {
          console.warn(`Responsive resolver: ${innerKey} breakpoint missing from config`)
        }

        const breakpointKey = `@media (min-width: ${breakpoints[innerKey]})`

        delete props[key]
        props.css = {
          ...(props.css || {}),
          [breakpointKey]: {
            ...(props.css || {})[breakpointKey],
            ...applyResolvers({ [key]: innerValue }).css
          }
        }
      }, {})
    })

    return props
  }
)
