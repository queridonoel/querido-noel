import type { ReactNode } from 'react'
import { PawPrint } from 'lucide-react'

interface SectionTitleProps {
  children: ReactNode
}

export function SectionTitle({ children }: SectionTitleProps) {
  return (
    <h2 className="flex items-center gap-2 font-heading text-xl font-semibold text-primary">
      <span className="grid size-8 shrink-0 place-items-center rounded-full bg-christmas-red text-white">
        <PawPrint aria-hidden="true" className="size-5" fill="currentColor" />
      </span>
      {children}
    </h2>
  )
}
