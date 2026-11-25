import type {
  ChangeEventHandler,
  InputHTMLAttributes,
  ReactNode,
  SelectHTMLAttributes,
  TextareaHTMLAttributes,
} from 'react'
import { ChevronDown, Image, Upload } from 'lucide-react'

const controlClassName =
  'h-11 w-full rounded-xl border border-border bg-surface px-3 text-sm text-primary outline-none transition placeholder:text-text-muted focus:border-primary focus:ring-2 focus:ring-primary/15'

interface FieldLabelProps {
  children: ReactNode
  htmlFor: string
  required?: boolean
}

export function FieldLabel({ children, htmlFor, required }: FieldLabelProps) {
  return (
    <label
      className="mb-1.5 block text-sm font-bold text-primary"
      htmlFor={htmlFor}
    >
      {children} {required && <span className="text-christmas-red">*</span>}
    </label>
  )
}

interface InputFieldProps extends InputHTMLAttributes<HTMLInputElement> {
  count?: number
  icon?: ReactNode
  label: string
}

export function InputField({
  count,
  icon,
  id,
  label,
  maxLength,
  required,
  ...props
}: InputFieldProps) {
  return (
    <div>
      <FieldLabel htmlFor={id!} required={required}>
        {label}
      </FieldLabel>
      <div className="relative">
        {icon && (
          <span className="pointer-events-none absolute top-1/2 left-3 -translate-y-1/2 text-primary">
            {icon}
          </span>
        )}
        <input
          className={`${controlClassName} ${icon ? 'pl-10' : ''} ${count !== undefined ? 'pr-14' : ''}`}
          id={id}
          maxLength={maxLength}
          required={required}
          {...props}
        />
        {count !== undefined && maxLength !== undefined && (
          <span className="pointer-events-none absolute top-1/2 right-3 -translate-y-1/2 text-xs text-primary">
            {count}/{maxLength}
          </span>
        )}
      </div>
    </div>
  )
}

interface SelectFieldProps extends SelectHTMLAttributes<HTMLSelectElement> {
  icon?: ReactNode
  label: string
}

export function SelectField({
  children,
  icon,
  id,
  label,
  required,
  ...props
}: SelectFieldProps) {
  return (
    <div>
      <FieldLabel htmlFor={id!} required={required}>
        {label}
      </FieldLabel>
      <div className="relative">
        {icon && (
          <span className="pointer-events-none absolute top-1/2 left-3 -translate-y-1/2 text-primary">
            {icon}
          </span>
        )}
        <select
          className={`${controlClassName} cursor-pointer appearance-none pr-10 ${icon ? 'pl-10' : ''}`}
          id={id}
          required={required}
          {...props}
        >
          {children}
        </select>
        <ChevronDown
          aria-hidden="true"
          className="pointer-events-none absolute top-1/2 right-3 size-4 -translate-y-1/2 text-primary"
        />
      </div>
    </div>
  )
}

interface UploadFieldProps {
  error?: string
  fileName?: string
  onChange: ChangeEventHandler<HTMLInputElement>
}

export function UploadField({ error, fileName, onChange }: UploadFieldProps) {
  return (
    <div>
      <FieldLabel htmlFor="pet-photo" required>
        Foto do pet
      </FieldLabel>
      <label
        className="relative flex min-h-16 cursor-pointer items-center justify-between gap-4 rounded-xl border border-dashed border-christmas-red/55 bg-christmas-red/[0.035] px-4 py-3 text-primary transition hover:border-christmas-red hover:bg-christmas-red/[0.06] focus-within:ring-2 focus-within:ring-primary/15"
        htmlFor="pet-photo"
      >
        <span className="pointer-events-none absolute -top-2 right-3 max-w-[calc(100%-1.5rem)] bg-surface px-2 text-right text-[11px] leading-tight text-text-muted">
          Depois de enviar, arraste a foto na carta para ajustar o enquadramento.
        </span>
        <span className="flex min-w-0 items-center gap-3">
          <Image
            aria-hidden="true"
            className="size-9 shrink-0"
            strokeWidth={1.8}
          />
          <span className="min-w-0">
            <span className="block truncate text-sm font-bold">
              {fileName || 'Selecione uma foto do pet'}
            </span>
            <span className="block text-xs text-text-muted">
              JPG ou PNG (até 5 MB)
            </span>
          </span>
        </span>
        <Upload
          aria-hidden="true"
          className="size-7 shrink-0"
          strokeWidth={1.8}
        />
        <input
          accept="image/jpeg,image/png"
          className="sr-only"
          id="pet-photo"
          onChange={onChange}
          type="file"
        />
      </label>
      {error && <p className="mt-1 text-xs text-christmas-red">{error}</p>}
    </div>
  )
}

interface TextareaFieldProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  count: number
  label: string
}

export function TextareaField({
  count,
  id,
  label,
  maxLength,
  required,
  ...props
}: TextareaFieldProps) {
  return (
    <div>
      <FieldLabel htmlFor={id!} required={required}>
        {label}
      </FieldLabel>
      <div className="relative">
        <textarea
          className="h-24 w-full resize-none rounded-xl border border-border bg-surface px-4 py-3 pb-7 text-sm leading-relaxed text-primary outline-none transition placeholder:text-text-muted focus:border-primary focus:ring-2 focus:ring-primary/15"
          id={id}
          maxLength={maxLength}
          required={required}
          {...props}
        />
        <span className="pointer-events-none absolute right-3 bottom-2 text-xs text-primary">
          {count}/{maxLength}
        </span>
      </div>
    </div>
  )
}
