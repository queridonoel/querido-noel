export type PetType = '' | 'dog' | 'cat'
export type TemplateId = 'classic' | 'gingerbread' | 'snowman' | 'reindeer'

export interface LetterData {
  contact: string
  institution: string
  message: string
  petName: string
  petType: PetType
  photoUrl: string
  template: TemplateId
}
