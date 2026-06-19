import React, { useState } from 'react';

export default function PasswordInput({
  label = 'Senha',
  value,
  onChange,
  id = 'password',
  name = 'password',
  placeholder = '••••••••',
  error,
  className = '',
  inputClassName = '',
  ...props
}) {
  const [isVisible, setIsVisible] = useState(false);

  const toggleVisibility = () => {
    setIsVisible((prev) => !prev);
  };

  return (
    <div
      className={`flex flex-col gap-2 w-full text-left relative ${className}`}
    >
      {/* Label */}
      {label && (
        <label
          htmlFor={id}
          className="font-['Plus_Jakarta_Sans'] font-semibold text-[14px] tracking-[0.14px] text-[#3d4943] transition-colors duration-200"
        >
          {label}
        </label>
      )}

      {/* Input Container */}
      <div className="relative w-full flex items-center">
        <input
          id={id}
          name={name}
          type={isVisible ? 'text' : 'password'}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          className={`
            w-full
            bg-[#f7f9f8]
            text-[#3d4943]
            font-['Plus_Jakarta_Sans']
            font-normal
            text-[16px]
            rounded-[12px]
            pt-[17px]
            pb-[18px]
            pl-4
            pr-12
            border
            border-transparent
            placeholder-[#6b7280]
            outline-none
            transition-all
            duration-200
            hover:bg-[rgba(0,105,76,0.03)]
            focus:bg-white
            focus:border-[#00694c]
            focus:ring-4
            focus:ring-[rgba(0,105,76,0.1)]
            disabled:opacity-50
            disabled:cursor-not-allowed
            ${
              error
                ? 'border-red-500 bg-red-50/10 focus:border-red-500 focus:ring-red-500/10'
                : ''
            }
            ${inputClassName}
          `}
          {...props}
        />

        {/* Botão de Mostrar/Ocultar Senha */}
        <button
          type="button"
          onClick={toggleVisibility}
          className="absolute right-4 text-[#6b7280] hover:text-[#00694c] focus:outline-none focus:text-[#00694c] transition-colors p-1"
          aria-label={isVisible ? 'Ocultar senha' : 'Mostrar senha'}
        >
          {isVisible ? (
            /* Ícone de Olho Aberto */
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="22"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="size-[20px]"
            >
              <path d="M2.062 12.348a1 1 0 0 1 0-.696 10.75 10.75 0 0 1 19.876 0 1 1 0 0 1 0 .696 10.75 10.75 0 0 1-19.876 0z" />
              <circle cx="12" cy="12" r="3" />
            </svg>
          ) : (
            /* Ícone de Olho Cortado */
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="22"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="size-[20px]"
            >
              <path d="M9.88 9.88a3 3 0 1 0 4.24 4.24" />
              <path d="M10.73 5.08A10.43 10.43 0 0 1 12 5c7 0 10 7 10 7a13.16 13.16 0 0 1-1.67 2.68" />
              <path d="M6.61 6.61A13.52 13.52 0 0 0 2 12s3 7 10 7a9.74 9.74 0 0 0 5.39-1.61" />
              <line x1="2" y1="2" x2="22" y2="22" />
            </svg>
          )}
        </button>
      </div>

      {/* Mensagem de Erro */}
      {error && (
        <p className="text-xs text-red-500 font-medium mt-0.5 pl-1 animate-fade-in">
          {error}
        </p>
      )}
    </div>
  );
}