import assert from 'node:assert/strict'
import { describe, it } from 'node:test'
import {
  canDownloadLetter,
  clampPhotoPosition,
  formatPhone,
  isValidPhone,
  toSafeFileName,
  validatePhotoFile,
} from '../src/utils/letter.ts'

const completeLetter = {
  contact: '(11) 99999-9999',
  institution: 'Canil Amigo',
  message: 'Uma nova família',
  petName: 'Mel',
  photoUrl: 'blob:photo',
  template: 'classic',
}

describe('formatPhone', () => {
  it('formata telefones fixos e celulares enquanto são digitados', () => {
    assert.equal(formatPhone('1198765432'), '(11) 9876-5432')
    assert.equal(formatPhone('11987654321'), '(11) 98765-4321')
    assert.equal(formatPhone('11987'), '(11) 987')
  })

  it('remove caracteres não numéricos e limita a 11 dígitos', () => {
    assert.equal(formatPhone('+55 (11) 98765-4321'), '(55) 11987-6543')
    assert.equal(formatPhone('11987654321999'), '(11) 98765-4321')
  })
})

describe('isValidPhone', () => {
  it('aceita contatos com 10 ou 11 dígitos', () => {
    assert.equal(isValidPhone('(11) 9876-5432'), true)
    assert.equal(isValidPhone('(11) 99876-5432'), true)
  })

  it('rejeita contatos incompletos', () => {
    assert.equal(isValidPhone('(11) 99876-543'), false)
    assert.equal(isValidPhone(''), false)
  })
})

describe('validatePhotoFile', () => {
  it('aceita JPG e PNG com até 5 MB', () => {
    assert.equal(validatePhotoFile({ type: 'image/jpeg', size: 1 }), null)
    assert.equal(
      validatePhotoFile({ type: 'image/png', size: 5 * 1024 * 1024 }),
      null,
    )
  })

  it('rejeita formato incompatível e arquivo acima do limite', () => {
    assert.equal(
      validatePhotoFile({ type: 'image/webp', size: 1 }),
      'Selecione uma imagem JPG ou PNG.',
    )
    assert.equal(
      validatePhotoFile({ type: 'image/png', size: 5 * 1024 * 1024 + 1 }),
      'A imagem deve ter no máximo 5 MB.',
    )
  })
})

describe('clampPhotoPosition', () => {
  it('mantém a posição entre 0 e 100', () => {
    assert.equal(clampPhotoPosition(-1), 0)
    assert.equal(clampPhotoPosition(42), 42)
    assert.equal(clampPhotoPosition(101), 100)
  })
})

describe('toSafeFileName', () => {
  it('remove acentos, espaços e caracteres inseguros', () => {
    assert.equal(toSafeFileName('  Cão & Mel!  '), 'cao-mel')
  })

  it('usa o fallback quando o nome não produz caracteres válidos', () => {
    assert.equal(toSafeFileName('!!!'), 'pet')
    assert.equal(toSafeFileName('...', 'animal'), 'animal')
  })
})

describe('canDownloadLetter', () => {
  it('habilita o download quando os dados obrigatórios são válidos', () => {
    assert.equal(canDownloadLetter(completeLetter), true)
  })

  it('rejeita campos vazios e telefone incompleto', () => {
    for (const field of ['petName', 'photoUrl', 'message', 'institution']) {
      assert.equal(
        canDownloadLetter({ ...completeLetter, [field]: ' ' }),
        false,
      )
    }

    assert.equal(
      canDownloadLetter({ ...completeLetter, contact: '(11) 9999' }),
      false,
    )
  })
})
