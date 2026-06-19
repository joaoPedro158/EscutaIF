import React from 'react';

/**
 * Reusable and responsive input field component styled according to Figma designs.
 * Supports labels, custom icons, error states, and smooth focus interactions.
 * 
 * @param {Object} props - Component props
 * @param {string} props.label - The text label displayed above the input
 * @param {string} [props.error] - Error message to be displayed below the input
 * @param {React.ComponentType} [props.icon: Icon] - Optional Lucide or SVG icon to render inside the input (left side)
 * @param {string} [props.id] - Unique identifier for the input and label connection
 * @param {string} [props.className] - Additional container classes
 * @param {string} [props.inputClassName] - Additional input-specific classes
 */
export default function InputField({
  label,
  error,
  icon: Icon,
  id,
  className = '',
  inputClassName = '',
  ...props
}) {
  const inputId = id || `input-${label?.toLowerCase().replace(/\s+/g, '-') || Math.random().toString(36).substr(2, 9)}`;

  return (
    <div className={`flex flex-col gap-2 w-full text-left relative ${className}`}>
      {/* Label */}
      {label && (
        <label
          htmlFor={inputId}
          className="font-['Plus_Jakarta_Sans'] font-semibold text-[14px] tracking-[0.14px] text-[var(--color-text)] transition-colors duration-200"
        >
          {label}
        </label>
      )}

      {/* Input Container */}
      <div className="relative w-full flex items-center group">
        {/* Left Icon (if provided) */}
        {Icon && (
          <div className="absolute left-4 text-gray-400 group-focus-within:text-[var(--primary)] transition-colors duration-200">
            <Icon size={20} />
          </div>
        )}

        {/* Text Input */}
        <input
          id={inputId}
          className={`
            w-full 
            bg-[var(--color-surface)] 
            text-[var(--color-heading)] 
            font-['Plus_Jakarta_Sans'] 
            font-normal 
            text-[16px] 
            rounded-[12px] 
            pt-[17px] 
            pb-[18px] 
            ${Icon ? 'pl-12' : 'pl-4'} 
            pr-4 
            border 
            border-transparent
            placeholder-[#6b7280] 
            outline-none 
            transition-all 
            duration-200
            hover:bg-[rgba(0,105,76,0.03)]
            focus:bg-white
            focus:border-[var(--primary)]
            focus:ring-4
            focus:ring-[rgba(0,105,76,0.1)]
            disabled:opacity-50 
            disabled:cursor-not-allowed
            ${error ? 'border-red-500 bg-red-50/10 focus:border-red-500 focus:ring-red-500/10' : ''}
            ${inputClassName}
          `}
          {...props}
        />
      </div>

      {/* Error Message */}
      {error && (
        <p className="text-xs text-red-500 font-medium animate-fade-in mt-0.5 pl-1">
          {error}
        </p>
      )}
    </div>
  );
}

  