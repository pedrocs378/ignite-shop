import { styled } from '..';

export const SuccessContainer = styled('main', {
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  margin: '0 auto',
  height: 656,

  h1: {
    fontSize: '$2xl',
    color: '$gray100',
    marginTop: '3rem',
  },

  p: {
    fontSize: '$xl',
    color: '$gray300',
    maxWidth: 560,
    textAlign: 'center',
    marginTop: '1.5rem'
  },

  a: {
    marginTop: '5rem',
    display: 'block',
    textDecoration: 'none',

    fontSize: '$lg',
    color: '$green500',
    fontWeight: 'bold',

    transition: 'all 0.2s',

    '&:hover': {
      color: '$green300'
    }
  }
})

export const ProductImagesContainer = styled('div', {
  display: 'flex',
  justifyContent: 'center',
  position: 'relative',

  '> span': {
    position: 'absolute',
    top: '50%',
    right: -18,
    transform: 'translateY(-50%)',
    zIndex: 999,

    height: 36,
    width: 36,
    borderRadius: '50%',

    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',

    boxShadow: '0 0 60px rgba(0, 0, 0, 0.8)',
    color: '$gray900',
    fontWeight: 'bold',
    fontSize: '$xs',
    background: '$white'
  }
})

export const ImageContainer = styled('div', {
  width: 140,
  height: 140,
  background: 'linear-gradient(180deg, #1ea483 0%, #7465d4 100%)',
  borderRadius: '50%',
  padding: '0.25rem',
  boxShadow: '0 0 60px rgba(0, 0, 0, 0.8)',

  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',

  img: {
    objectFit: 'cover'
  },

  '& + &': {
    marginLeft: '-52px'
  }
})
