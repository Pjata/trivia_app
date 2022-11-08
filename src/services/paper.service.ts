import { Paper, TaskDefinition } from '../model/model'

export const createPaper = (taskDefinitions: TaskDefinition[]): Paper => {
  const paper: Paper = {
    title: 'Example paper',
    tasks: taskDefinitions.map((taskDefinition, taskIndex) => ({
      ...taskDefinition,
      id: taskIndex,
      answers: taskDefinition.answers.map((answer, answerIndex) => ({...answer, id: answerIndex})),
    })),
  }

  paper.tasks.forEach(task => task.feedback && (task.feedback = {...task.feedback}))

  return paper
}
