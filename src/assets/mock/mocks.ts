import { Task } from '../../model/model'

export const exampleTask: Task = {
  question: 'Which of these seem a good idea?',
  answers: [
    {
      text: 'Jumping into a rose bush',
    },
    {
      text: 'Hiking',
      isAnswer: true,
    },
    {
      text: 'MTBking',
      isAnswer: true,
    },
    {
      text: 'Bang your head against the wall',
    },
  ],
  feedback: {
    positive: 'Good selection!',
    negative: 'Did you select the rose bush? Lot of people learn the hard way.',
  },
  elaboration:
    "Rose bushes have thorns, its very painful. Hiking and MTBking are healthy and very enjoyable activities. And - just don't bang your had against the wall.",
}

export const exampleTasks: Task[] = [
  exampleTask,
  {
    question: 'Which of the following are vegetables?',
    answers: [
      {
        text: 'Onions',
        isAnswer: true,
      },
      {
        text: 'Tomatoes',
        isAnswer: true,
      },
      {
        text: 'Peppers',
        isAnswer: true,
      },
      {
        text: 'Carrots',
        isAnswer: true,
      },
      {
        text: 'Orange',
        isAnswer: false,
      },
      {
        text: 'Piano',
        isAnswer: false,
      },
      {
        text: 'Depends on how you define "vegetables"',
        isAnswer: true,
      },
    ],
  },
  {
    question: 'Which of the following are fruits?',
    answers: [
      {
        text: 'Onions',
        isAnswer: false,
      },
      {
        text: 'Tomatoes',
        isAnswer: true,
      },
      {
        text: 'Peppers',
        isAnswer: true,
      },
      {
        text: 'Carrots',
        isAnswer: false,
      },
      {
        text: 'Orange',
        isAnswer: true,
      },
      {
        text: 'Piano',
        isAnswer: false,
      },
      {
        text: 'Depends on how you define "fruits"',
        isAnswer: true,
      },
    ],
    feedback: {
      positive: 'You seem to agree with my point of view.',
      negative: 'Which religion do you belong to?',
    },
    elaboration:
      'Do you beong to my church, where tomatoes and peppers can be praised as both vegetables and fruits at the same time? Depending on whether we define vegetables from a botanical or gastronomical angle, tomatoes and peppers could be both, as they are in fact crops, but they are often used as vegetables in food.',
  },
]
