import { useEffect, useState } from 'react';
import ReactDOM from 'react-dom'

import * as S from './styles';

type DrawerProps = {
  open: boolean;
  onClose?: () => void;
  direction: 'left' | 'right' | 'top' | 'bottom';
  children?: React.ReactNode;
  duration?: number;
  overlayOpacity?: number;
  overlayColor?: String;
  enableOverlay?: boolean;
  style?: React.CSSProperties;
  zIndex?: number;
  size?: number | string;
  className?: string | undefined;
  customIdSuffix?: string | undefined;
}

export function Drawer(props: DrawerProps) {
  const [isMounted, setIsMounted] = useState(false)

  useEffect(() => {
    setIsMounted(true)

    return () => setIsMounted(false)
  }, [])

  return isMounted ? ReactDOM.createPortal(
  <S.DrawerContainer {...props} />,
  document.getElementById('drawer-container')
  ) : null
}
