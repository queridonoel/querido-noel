import { useState, type ChangeEvent } from 'react'
import { House, PawPrint, Phone } from 'lucide-react'
import { letterTemplates } from '../../config/templates'
import type { LetterData } from '../../types/letter'
import { formatPhone } from '../../utils/letter'
import { SectionTitle } from '../SectionTitle'
import { InputField, TextareaField, UploadField } from './FormControls'

interface LetterFormProps {
  data: LetterData
  onChange: (updates: Partial<LetterData>) => void
}

export function LetterForm({ data, onChange }: LetterFormProps) {
  const [fileName, setFileName] = useState('')
  const [fileError, setFileError] = useState('')

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
    onChange({ photoUrl: URL.createObjectURL(file) })
  }

  return (
    <form className="space-y-5" noValidate>
      <SectionTitle>Informações da cartinha</SectionTitle>

      <div>
        <InputField
          count={data.petName.length}
          icon={
            <PawPrint
              aria-hidden="true"
              className="size-4"
              fill="currentColor"
            />
          }
          id="pet-name"
          label="Nome do pet"
          maxLength={25}
          name="petName"
          onChange={(event) => onChange({ petName: event.target.value })}
          placeholder="Ex.: Mel, Thor, Nina"
          required
          type="text"
          value={data.petName}
        />
      </div>

      <UploadField
        error={fileError}
        fileName={fileName}
        onChange={handleFileChange}
      />

      <TextareaField
        count={data.message.length}
        id="request"
        label="O que o pet quer de Natal?"
        maxLength={150}
        name="request"
        onChange={(event) => onChange({ message: event.target.value })}
        placeholder="Conte o que o pet precisa, seu desejo de Natal ou como ele pode fazer parte de uma nova família..."
        required
        value={data.message}
      />

      <div className="grid gap-4 sm:grid-cols-2">
        <InputField
          icon={<House aria-hidden="true" className="size-4" />}
          id="institution"
          label="Nome da ONG ou canil"
          maxLength={28}
          name="institution"
          onChange={(event) => onChange({ institution: event.target.value })}
          placeholder="Ex.: Canil Amigo"
          required
          type="text"
          value={data.institution}
        />
        <InputField
          icon={
            <Phone aria-hidden="true" className="size-4" fill="currentColor" />
          }
          id="contact"
          inputMode="tel"
          label="Contato"
          maxLength={15}
          name="contact"
          onChange={(event) =>
            onChange({ contact: formatPhone(event.target.value) })
          }
          placeholder="Ex.: (11) 99999-9999"
          required
          type="tel"
          value={data.contact}
        />
      </div>

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
          {letterTemplates.map((template, index) => (
            <label className="cursor-pointer" key={template.name}>
              <input
                checked={data.template === template.id}
                className="peer sr-only"
                name="template"
                onChange={() => onChange({ template: template.id })}
                type="radio"
                value={index}
              />
              <span className="block aspect-square overflow-hidden rounded-lg border-2 border-transparent transition hover:-translate-y-0.5 peer-checked:ring-2 peer-checked:ring-christmas-red/35 peer-focus-visible:ring-2 peer-focus-visible:ring-primary">
                <img
                  alt={`Template ${template.name}`}
                  className="h-full w-full object-cover"
                  src={template.post}
                />
              </span>
              <span className="sr-only">
                Template {index + 1}: {template.name}
              </span>
            </label>
          ))}
        </div>
      </section>
    </form>
  )
}
