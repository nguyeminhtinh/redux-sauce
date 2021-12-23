import React, { ButtonHTMLAttributes } from "react";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  customClassName?: string,
  children: React.ComponentProps<'button'>
};

const Button: React.FC<ButtonProps> = ({
  customClassName = '',
  children,
  ...rest
}: ButtonProps) => (
  <button
    className={`my-btn ${customClassName}`}
    {...rest}
    type="button"
    data-testid="button"
  >
    {children}
  </button>
)

export default Button