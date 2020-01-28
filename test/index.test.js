import breakpointsResolver from '../src'

const applyResolvers = (css) => ({ css })

it('returns correct props and css', () => {
  const { css } = breakpointsResolver().resolve({ key: 'display', value: { xs: 'block' }, props: {}, applyResolvers })
  expect(css).toEqual({
    '@media (min-width: 0px)': {
      display: 'block',
    }
  });
})
