import React, { ChangeEvent, InputHTMLAttributes } from "react";

interface InputFieldProps extends InputHTMLAttributes<HTMLInputElement> {
  type?: string;
  name: string;
  value?: string;
  label?: string;
  error?: string;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  disable?: boolean;
  required?: boolean;
  maxLength?: number;
  placeholder?: string;
  className?: string;
  inputWrapper?: string;
  register?: (name: string) => Record<string, unknown>;
}

const InputField: React.FC<InputFieldProps> = ({
  type = "text",
  name,
  value,
  label,
  error,
  onChange,
  disable = false,
  required = false,
  maxLength,
  placeholder = "",
  className = "",
  inputWrapper = "",
  register = () => ({}),
  ...props
}) => {
  return (
    <div className={`w-full ${className}`}>
      {label && (
        <label
          htmlFor={name}
          className={`mb-1 block text-sm font-semibold text-gray-700 ${
            required ? "after:ml-1 after:text-red-500 after:content-['*']" : ""
          }`}
        >
          {label}
        </label>
      )}

      <div
        className={`relative flex items-center rounded-lg border px-3 py-2 transition-all duration-200 
        ${
          disable
            ? "bg-gray-100 border-gray-300 cursor-not-allowed"
            : "bg-white border-gray-300"
        } 
        ${
          error
            ? "border-red-500"
            : "focus-within:border-blue-500 focus-within:ring-1 focus-within:ring-blue-200"
        } 
        ${inputWrapper}`}
      >
        <input
          id={name}
          name={name}
          type={type}
          value={value}
          onChange={onChange}
          disabled={disable}
          maxLength={maxLength}
          placeholder={placeholder}
          {...register(name)}
          className={`w-full bg-transparent text-sm text-gray-800 placeholder:text-gray-400 
          focus:outline-none disabled:cursor-not-allowed disabled:opacity-60`}
          {...props}
        />
      </div>

      {error && (
        <p className="mt-1 text-xs font-medium text-red-600">{error}</p>
      )}
    </div>
  );
};

export default InputField;
