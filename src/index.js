import _ from 'lodash'
import defaultBreakpoints from './defaultBreakpoints'

export default ({ breakpoints = defaultBreakpoints } = { breakpoints: defaultBreakpoints }) => ({
  match: ({ value }) => {
    if (!_.isPlainObject(value)) return

    return !_.isEmpty(_.intersection(_.keys(value), _.keys(breakpoints)))
  },
  resolve: ({
    key,
    value,
    applyResolvers,
    props,
  }) => {
    const sortedValues = _.reduce(breakpoints, (memo, val, key) => {
      if (_.isUndefined(value[key])) return memo

      memo[key] = value[key]
      return memo
    }, {})

    let index = -1

    const result = _.reduce(sortedValues, (memo, innerValue, innerKey) => {
      index++

      if (_.isUndefined(breakpoints[innerKey])) {
        console.warn(`Responsive resolver: ${innerKey} breakpoint missing from config`)
      }

      if (index === 0) {
        return {
          ...memo,
          ...applyResolvers({ [key]: innerValue }).css
        }
      }

      const breakpointKey = `@media (min-width: ${breakpoints[innerKey]})`

      return {
        ...memo,
        [breakpointKey]: {
          ...(props.css || {})[breakpointKey],
          ...applyResolvers({ [key]: innerValue }).css
        }
      }
    }, {})

    return {
      css: {
        ...(props.css || {}),
        ...result,
      },
    }
  }
})
