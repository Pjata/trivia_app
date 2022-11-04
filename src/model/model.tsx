/**
 * Everything in one place for now.
 *
 * TODO structure the model
 */

export type Selection = (string | number)[]

export interface Task {
  question: string
  answers: { text: string; isAnswer?: boolean }[]
  feedback?: { positive: string; negative: string }
  elaboration?: string
}

export interface Result {
  task: Task
  selection: Selection
  evaluation: boolean[]
  verdict?: boolean
  submitted?: boolean
}

export interface Paper {
  title: string
  tasks: Result[]
  postponeFeedback?: boolean
}
