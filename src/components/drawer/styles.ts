import RMDDrawer from 'react-modern-drawer'

import { styled } from '../../styles';

export const DrawerContainer = styled(RMDDrawer, {
  backgroundColor: '$gray800 !important',
  boxShadow: '0 -4px 30px rgba(0, 0, 0, 1) !important',
  padding: '3rem',
  position: 'relative',

  display: 'flex',
  flexDirection: 'column',

  header: {
    position: 'absolute',
    top: '1.5rem',
    right: '1.5rem',
    left: '1.5rem',

    button: {
      marginLeft: 'auto',
      display: 'block'
    }
  }
})
