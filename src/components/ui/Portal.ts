import { useEffect } from 'react';
import { createPortal } from 'react-dom';

type P = {
  children: React.ReactNode;
};
const Portal = ({ children }: P) => {
  const mount = document.getElementById('portal-root');
  const el = document.createElement('div');

  useEffect(() => {
    mount && mount.appendChild(el);
    return () => void mount!.removeChild(el);
  }, [el, mount]);

  return createPortal(children, el);
};

export default Portal;
