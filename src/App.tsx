import { useState } from 'react'
import './App.css'
import Round from './components/Round/Round'
import { Result, Task } from './model/model'

/** Constant example for now */
let exampleTask: Task = {
  taskPhrase: 'Which of these seem a good idea?',
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
}

function App() {
  const [currentTask, setCurentTask] = useState<Task>(exampleTask)

  const results: Result[] = []
  const next = () => {
    console.log('NEXT')
  }

  return (
    <Round
      task={currentTask}
      onSubmit={(result) => {
        results.push(result)
        console.log('resultS:', results)
      }}
      onNext={() => {
        setCurentTask({
          taskPhrase: 'Did you get the preious question right?',
          answers: [{ text: 'Yes', isAnswer: true }, { text: 'No' }],
        })
      }}
    />
  )
}

export default App
