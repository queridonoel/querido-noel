import classicPost from '../assets/templates/classic/post.webp'
import classicPolaroid from '../assets/templates/classic/polaroid.webp'
import gingerbreadPost from '../assets/templates/gingerbread/post.webp'
import gingerbreadPolaroid from '../assets/templates/gingerbread/polaroid.webp'
import reindeerPost from '../assets/templates/reindeer/post.webp'
import reindeerPolaroid from '../assets/templates/reindeer/polaroid.webp'
import snowmanPost from '../assets/templates/snowman/post.webp'
import snowmanPolaroid from '../assets/templates/snowman/polaroid.webp'
import type { TemplateId } from '../types/letter'

export interface LetterTemplate {
  accent: string
  id: TemplateId
  name: string
  polaroid: string
  post: string
  rotation: number
}

export const letterTemplates: LetterTemplate[] = [
  {
    id: 'classic',
    name: 'Classic',
    post: classicPost,
    polaroid: classicPolaroid,
    accent: '#C92D35',
    rotation: -3,
  },
  {
    id: 'gingerbread',
    name: 'Gingerbread',
    post: gingerbreadPost,
    polaroid: gingerbreadPolaroid,
    accent: '#A85B35',
    rotation: -3,
  },
  {
    id: 'snowman',
    name: 'Snowman',
    post: snowmanPost,
    polaroid: snowmanPolaroid,
    accent: '#4D8FA8',
    rotation: -3,
  },
  {
    id: 'reindeer',
    name: 'Reindeer',
    post: reindeerPost,
    polaroid: reindeerPolaroid,
    accent: '#7D4A32',
    rotation: -3,
  },
]

export function getLetterTemplate(id: TemplateId) {
  return (
    letterTemplates.find((template) => template.id === id) ?? letterTemplates[0]
  )
}
