export default function LoginField({
  id,
  label,
  type = 'text',
  value,
  onChange,
  placeholder,
  icon: Icon,
  rightSlot,
  autoComplete,
  error,
  ...props
}) {
  return (
    <label htmlFor={id} className="flex flex-col gap-2">
      <span className="px-1 text-sm font-medium text-[var(--color-text)]">{label}</span>
      <div className="relative">
        {Icon ? (
          <Icon
            className="pointer-events-none absolute left-4 top-1/2 size-4 -translate-y-1/2 text-[var(--color-text)]/70"
            aria-hidden="true"
          />
        ) : null}
        <input
          id={id}
          type={type}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          autoComplete={autoComplete}
          className={`w-full rounded-2xl border bg-[var(--color-surface)] px-4 py-3 text-[var(--color-heading)] outline-none transition-colors placeholder:text-[var(--color-text)]/45 focus:border-[var(--primary)] ${
            error
              ? 'border-red-500 bg-red-50/10 focus:border-red-500'
              : 'border-[var(--color-soft-line)]'
          } ${Icon ? 'pl-11' : ''} ${rightSlot ? 'pr-20' : ''}`}
          {...props}
        />
        {rightSlot ? <div className="absolute inset-y-0 right-3 flex items-center">{rightSlot}</div> : null}
      </div>
      {error && (
        <span className="px-1 text-xs text-red-500 font-medium animate-fade-in">
          {error}
        </span>
      )}
    </label>
  )
}
