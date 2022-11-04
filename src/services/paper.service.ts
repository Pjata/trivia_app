import { Paper, Task } from '../model/model'

export function createPaper(tasks: Task[]): Paper {
  const paper: Paper = {
    title: 'Example paper',
    tasks: [],
  }

  tasks.forEach((task) =>
    paper.tasks.push({
      task,
      selection: [],
      evaluation: [],
    })
  )

  return paper
}
