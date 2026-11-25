export type TemplateId = 'classic' | 'gingerbread' | 'snowman' | 'reindeer'

export interface LetterData {
  contact: string
  institution: string
  message: string
  petName: string
  photoUrl: string
  template: TemplateId
}
