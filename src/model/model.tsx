/**
 * Everything in one place for now.
 *
 * TODO structure the model
 */

export type Selection = (string | number)[]

export interface TaskDefinition {
  id?: number
  question: string
  answers: { id?: number, text: string; isAnswer?: boolean }[]
  feedback?: { positive: string; negative: string }
  elaboration?: string
}

export interface Result {
  taskDefinition: TaskDefinition
  evaluation: boolean[]
}

export interface Paper {
  title: string
  tasks: TaskDefinition[]
  postponeFeedback?: boolean
}
