import React from 'react'

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'default' | 'outline' | 'ghost'
  size?: 'sm' | 'md' | 'lg'
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className = '', variant = 'default', size = 'md', ...props }, ref) => {
    const baseStyles = 'font-sans font-semibold rounded-md transition-all duration-200 active:scale-[0.97] active:shadow-none'
    const variants = {
      default: 'bg-auric-300 text-nebula-900 hover:bg-auric-100 shadow-[0_0_20px_rgba(220,181,95,0.35)]',
      outline: 'border border-white/20 text-foreground hover:bg-white/5 hover:border-white/35',
      ghost: 'text-foreground hover:bg-white/5',
    }
    const sizes = {
      sm: 'px-2 py-1 text-sm',
      md: 'px-4 py-2 text-base',
      lg: 'px-6 py-3 text-lg',
    }
    return (
      <button
        ref={ref}
        className={`${baseStyles} ${variants[variant]} ${sizes[size]} ${className}`}
        {...props}
      />
    )
  }
)
Button.displayName = 'Button'
