import type { ReactNode } from 'react';
import '../App.css';

interface Props {
  title?: string;
  children: ReactNode;
}

export function ScreenContainer({ title, children }: Props) {
  return (
    <div className="screen">
      {title && <h1 className="screen-title">{title}</h1>}
      <div className="screen-content">{children}</div>
    </div>
  );
}
