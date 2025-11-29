import type { ButtonHTMLAttributes } from 'react';
import '../App.css';

type Props = ButtonHTMLAttributes<HTMLButtonElement>;

export function PrimaryButton(props: Props) {
  return <button className="btn-primary" {...props} />;
}
