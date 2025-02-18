import * as React from "react";

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "default" | "outline" | "ghost" | "link";
}

const Button: React.FC<ButtonProps> = ({ variant = "default", className, ...props }) => {
  return (
    <button
      className={`px-4 py-2 rounded-md font-medium ${
        variant === "outline" ? "border border-gray-300" : ""
      }`}
      {...props}
    />
  );
};

export default Button;
