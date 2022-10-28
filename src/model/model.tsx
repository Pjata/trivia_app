/**
 * Everything in one place for now.
 * 
 * TODO structure the model
 */

export type Task = {
  taskPhrase: string
  answers: { text: string; isAnswer?: boolean }[]
}

export type Result = {
  task: Task
  selection?: Selection
  evaluation: boolean[]
  verdict?: boolean
}

export type Selection = (string | number)[]
