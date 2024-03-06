import { CSSProperties, FC, ReactNode } from "react";

export interface ButtonProps {
  color: CSSProperties["color"];
  children?: ReactNode;
}

const Button: FC<ButtonProps> = ({ color, children }) => {
  return <button style={{ color }}>{children}</button>;
};

export default Button;
