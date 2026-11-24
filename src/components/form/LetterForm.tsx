import { useState, type ChangeEvent } from 'react'
import { House, PawPrint, Phone } from 'lucide-react'
import {
  InputField,
  SelectField,
  TextareaField,
  UploadField,
} from './FormControls'

const templates = [
  ['#642A78', '#F2DAF5'],
  ['#C92D35', '#FFF0EE'],
  ['#F4A321', '#FFF1C9'],
  ['#8C7768', '#F4E9DD'],
]

function formatPhone(value: string) {
  const digits = value.replace(/\D/g, '').slice(0, 11)
  if (digits.length <= 2) return digits
  if (digits.length <= 6) return `(${digits.slice(0, 2)}) ${digits.slice(2)}`
  if (digits.length <= 10) {
    return `(${digits.slice(0, 2)}) ${digits.slice(2, 6)}-${digits.slice(6)}`
  }
  return `(${digits.slice(0, 2)}) ${digits.slice(2, 7)}-${digits.slice(7)}`
}

function SectionTitle({ children }: { children: string }) {
  return (
    <h2 className="flex items-center gap-2 font-heading text-xl font-semibold text-primary">
      <span className="grid size-8 shrink-0 place-items-center rounded-full bg-christmas-red text-white">
        <PawPrint aria-hidden="true" className="size-5" fill="currentColor" />
      </span>
      {children}
    </h2>
  )
}

export function LetterForm() {
  const [message, setMessage] = useState('')
  const [phone, setPhone] = useState('')
  const [fileName, setFileName] = useState('')
  const [fileError, setFileError] = useState('')
  const [selectedTemplate, setSelectedTemplate] = useState(0)

  function handleFileChange(event: ChangeEvent<HTMLInputElement>) {
    const file = event.target.files?.[0]
    setFileError('')
    setFileName('')
    if (!file) return
    if (!['image/jpeg', 'image/png'].includes(file.type)) {
      setFileError('Selecione uma imagem JPG ou PNG.')
      event.target.value = ''
      return
    }
    if (file.size > 5 * 1024 * 1024) {
      setFileError('A imagem deve ter no máximo 5 MB.')
      event.target.value = ''
      return
    }
    setFileName(file.name)
  }

  return (
    <form className="space-y-5" noValidate>
      <SectionTitle>Informações da cartinha</SectionTitle>

      <div className="grid gap-4 sm:grid-cols-2">
        <InputField
          icon={
            <PawPrint
              aria-hidden="true"
              className="size-4"
              fill="currentColor"
            />
          }
          id="pet-name"
          label="Nome do pet"
          name="petName"
          placeholder="Ex.: Mel, Thor, Nina"
          required
          type="text"
        />
        <SelectField
          icon={
            <PawPrint
              aria-hidden="true"
              className="size-4"
              fill="currentColor"
            />
          }
          defaultValue=""
          id="pet-type"
          label="Tipo de pet"
          name="petType"
          required
        >
          <option disabled value="">
            Selecione...
          </option>
          <option value="dog">Cachorro</option>
          <option value="cat">Gato</option>
        </SelectField>
      </div>

      <UploadField
        error={fileError}
        fileName={fileName}
        onChange={handleFileChange}
      />

      <div className="grid gap-4 sm:grid-cols-2">
        <InputField
          icon={<House aria-hidden="true" className="size-4" />}
          id="institution"
          label="Nome da ONG ou canil"
          name="institution"
          placeholder="Ex.: Canil Amigo"
          required
          type="text"
        />
        <InputField
          icon={
            <Phone aria-hidden="true" className="size-4" fill="currentColor" />
          }
          id="contact"
          inputMode="tel"
          label="Contato"
          name="contact"
          onChange={(event) => setPhone(formatPhone(event.target.value))}
          placeholder="Ex.: (11) 99999-9999"
          required
          type="tel"
          value={phone}
        />
      </div>

      <TextareaField
        count={message.length}
        id="request"
        label="O que eu quero de Natal?"
        maxLength={300}
        name="request"
        onChange={(event) => setMessage(event.target.value)}
        placeholder="Conte o que o pet precisa, seu desejo de Natal ou como ele pode fazer parte de uma nova família..."
        required
        value={message}
      />

      <section aria-labelledby="template-heading">
        <div aria-hidden="true" className="mb-4 border-t border-border" />
        <h2
          className="mb-3 font-heading text-lg font-semibold text-primary"
          id="template-heading"
        >
          Escolha um modelo de cartinha
        </h2>
        <div
          aria-labelledby="template-heading"
          className="grid grid-cols-4 gap-3"
          role="radiogroup"
        >
          {templates.map(([color, background], index) => (
            <label className="cursor-pointer" key={color}>
              <input
                checked={selectedTemplate === index}
                className="peer sr-only"
                name="template"
                onChange={() => setSelectedTemplate(index)}
                type="radio"
                value={index}
              />
              <span
                className="block aspect-[4/3] rounded-lg border-2 border-transparent p-2 transition hover:-translate-y-0.5 hover:border-primary/35 peer-checked:border-primary peer-checked:ring-2 peer-checked:ring-primary/15 peer-focus-visible:ring-2 peer-focus-visible:ring-primary"
                style={{ backgroundColor: background }}
              >
                <span
                  className="block h-full rounded-md border border-white/70"
                  style={{ backgroundColor: color }}
                />
              </span>
              <span className="sr-only">Template {index + 1}</span>
            </label>
          ))}
        </div>
      </section>
    </form>
  )
}
