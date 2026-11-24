import classicPost from '../assets/templates/classic/post.webp'
import gingerbreadPost from '../assets/templates/gingerbread/post.webp'
import reindeerPost from '../assets/templates/reindeer/post.webp'
import snowmanPost from '../assets/templates/snowman/post.webp'
import type { TemplateId } from '../types/letter'

export interface LetterTemplate {
  accent: string
  id: TemplateId
  name: string
  post: string
}

export const letterTemplates: LetterTemplate[] = [
  {
    id: 'classic',
    name: 'Classic',
    post: classicPost,
    accent: '#C92D35',
  },
  {
    id: 'gingerbread',
    name: 'Gingerbread',
    post: gingerbreadPost,
    accent: '#5F7F16',
  },
  {
    id: 'snowman',
    name: 'Snowman',
    post: snowmanPost,
    accent: '#4D8FA8',
  },
  {
    id: 'reindeer',
    name: 'Reindeer',
    post: reindeerPost,
    accent: '#642A78',
  },
]

export function getLetterTemplate(id: TemplateId) {
  return (
    letterTemplates.find((template) => template.id === id) ?? letterTemplates[0]
  )
}
