import { styled } from '../../styles';

export const HeaderContainer = styled('header', {
  padding: '2rem 0',
  width: '100%',
  maxWidth: 1100,
  margin: '0 auto',

  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',

  button: {
    position: 'relative',
    padding: '0.75rem',
    border: 0,
    borderRadius: 6,
    background: '$gray800',
    fontSize: 0,

    transition: 'all 0.2s',

    '&:hover': {
      opacity: 0.7
    }
  },

  'button > span': {
    position: 'absolute',
    top: -15,
    right: -15,

    height: 30,
    width: 30,

    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',

    background: '$green500',
    border: '3px solid $gray900',
    borderRadius: '50%',

    color: '$white',
    fontSize: '$xs',
    fontWeight: 'bold',
    lineHeight: 1.6
  }
})

export const CartHeader = styled('header', {
  button: {
    fontSize: 0,
    border: 0,
    background: 'transparent',
  }
})

export const CartContent = styled('div', {
  marginTop: '1.5rem',

  display: 'flex',
  flexDirection: 'column',
  flex: 1,
  overflow: 'hidden',

  '> strong': {
    color: '$gray100',
    fontSize: '$lg',
    lineHeight: 1.6
  }
})

export const CartList = styled('div', {
  marginTop: '2rem',
  maxHeight: 'calc(100% - 5rem)',
  overflowY: 'auto',

  display: 'flex',
  flexDirection: 'column',
  gap: '1.5rem',
})

export const CartItem = styled('div', {
  display: 'flex',
  alignItems: 'center',
  gap: '1.25rem'
})

export const ImageContainer = styled('div', {
  width: '100%',
  maxWidth: 102,
  height: 93,
  background: 'linear-gradient(180deg, #1ea483 0%, #7465d4 100%)',
  borderRadius: 8,

  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',

  img: {
    objectFit: 'cover'
  }
})

export const CartItemDetails = styled('div', {
  fontSize: '$md',
  lineHeight: 1.6,

  p: {
    color: '$gray300',
    fontSize: '$lg',
  },

  strong: {
    display: 'block',
    color: '$gray100',
    marginTop: '0.125rem',
    fontSize: '$lg',
  },

  button: {
    display: 'block',
    marginTop: '0.5rem',
    background: 'transparent',
    border: 0,
    fontSize: '$sm',
    color: '$green500',
    fontWeight: 'bold',

    '&:hover': {
      textDecoration: 'underline'
    }
  }
})

export const CartFooter = styled('footer', {
  marginTop: 'auto',

  button: {
    marginTop: '3.375rem',
    width: '100%',
    padding: '1.25rem 0',
    border: 0,
    borderRadius: 8,

    background: '$green500',
    color: '$white',
    fontSize: '$md',
    fontWeight: 'bold',

    transition: 'all 0.2s',

    '&:not(:disabled):hover': {
      backgroundColor: '$green300'
    },

    '&:disabled': {
      opacity: 0.6,
      cursor: 'not-allowed'
    }
  },
})

export const CartInfoContainer = styled('div', {
  display: 'flex',
  flexDirection: 'column',
  gap: '0.25rem'
})

export const InfoRow = styled('div', {
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  color: '$gray100',

  span: {
    lineHeight: 1.6
  },

  b: {
    fontSize: '$md',
    lineHeight: 1.6
  },

  strong: {
    fontSize: '$xl',
    lineHeight: 1.4
  }
})
