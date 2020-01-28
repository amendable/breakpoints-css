# Breakpoints CSS

This adds breakpoint support to your styles via styled-components.

## Usage
```jsx sandbox
import { render } from 'react-dom'
import Box, { AmendableProvider } from '@amendable/core'
import breakpointsCss from '@amendable/breakpoints-css'
import inlinePropsCss from '@amendable/inline-props-css'

render(
  <AmendableProvider
    resolvers={[
      breakpointsCss(),
      inlinePropsCss()
    ]}
  >
    <Box color={{ xs: 'red', lg: 'blue' }}>
      This will be red on small screens and blue on desktops+.
    </Box>
  </AmendableProvider>
)
```

## Supported props

It supports all props.
