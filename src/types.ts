export type PremierTypes = 'first' | 'second' | 'third' | 'forth'
type ProjectItemProp = {
  title: string
  value: number | ''
}

export type TranslateTextType = { (title: string): string }

export interface ListProp {
  checked?: boolean
  clearTime?: string
  date?: string
  desc?: string
  finishedTime?: string | null
  id?: number
  premier?: PremierTypes
  title?: string
  type?: ProjectItemProp
}

export interface ProjectProp {
  detail: string
  id: number
  path: string
  title: string
}

export type ModalProp = {
  associatePjt: ProjectItemProp
  btnModalText: string
} & ListProp
