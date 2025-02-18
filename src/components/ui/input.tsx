import * as React from "react";

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {}

const Input = React.forwardRef<HTMLInputElement, InputProps>(({ className, ...props }, ref) => {
  return (
    <input
      ref={ref}
      className={`w-full p-2 border rounded-md focus:ring focus:ring-blue-300 ${className}`}
      {...props}
    />
  );
});

Input.displayName = "Input";
export { Input };
