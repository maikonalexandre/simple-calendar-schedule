import { twMerge } from 'tailwind-merge'

export const GradientBar = ({ className }: { className?: string }) => {
  return (
    <div
      className={twMerge(
        'h-1 w-full rounded bg-gradient-to-r from-green-300 via-blue-500 to-purple-600',
        className,
      )}
    />
  )
}
