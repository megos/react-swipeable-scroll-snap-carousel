import { globalStyle, style } from '@vanilla-extract/css'

export const container = style({
  scrollSnapType: 'x mandatory',
  scrollBehavior: 'smooth',
  userSelect: 'none',
  WebkitUserSelect: 'none',
  display: 'flex',
  overflowX: 'auto',
  width: '100%',
  height: '100%',
  flexFlow: 'row nowrap',
  '::-webkit-scrollbar': {
    display: 'none',
  },
})

export const scrolling = style({
  scrollSnapType: 'none',
  scrollBehavior: 'auto',
})

globalStyle(`${container} > *`, {
  scrollSnapAlign: 'center',
  width: '100%',
  height: '100%',
  flex: 'none',
})
