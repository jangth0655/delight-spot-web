'use client';

import { useEffect, useState } from 'react';
import ReactDOM from 'react-dom';

interface Props {
  children: React.ReactNode;
  portalId?: string;
}

export default function Portal({ children, portalId = 'modal' }: Props) {
  const [container, setContainer] = useState<HTMLElement | null>(null);

  useEffect(() => {
    let portalRoot = document.getElementById(portalId);

    if (!portalRoot) {
      portalRoot = document.createElement('div');
      portalRoot.setAttribute('id', portalId);
      document.body.appendChild(portalRoot);
    }
    setContainer(portalRoot);

    return () => {
      if (portalRoot && document.body.contains(portalRoot)) {
        document.body.removeChild(portalRoot);
      }
    };
  }, [portalId]);

  return container ? ReactDOM.createPortal(children, container) : null;
}
