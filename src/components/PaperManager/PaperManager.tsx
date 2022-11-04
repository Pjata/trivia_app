import { Heading } from '@instructure/ui'
import React, { useState } from 'react'
import { Paper, Result, Task } from '../../model/model'
import TaskManager from '../TaskManager/TaskManager'

interface PaperManagerProps {
  paper: Paper
}

const PaperManager = ({ paper }: PaperManagerProps) => {
  const [complete, setComplete] = useState<boolean>(false)
  let index = 0

  const onNext = (loadNextTask: (nextTask: Result) => void) => {
    console.log(paper)
    index++
    if (index >= paper.tasks.length) {
      setComplete(true)
    } else {
      loadNextTask(paper.tasks[index])
    }
  }

  return (
    <>
      <div
        className="paper-title margin-large margin-top-x-large"
        paper-title
        margin-large
      >
        <Heading level="h2">{paper.title}</Heading>
      </div>
      {complete ? (
        paper.tasks.map((task, taskIndex) => (
          <TaskManager
            initialTask={task}
            key={generateKey(task.task, taskIndex)}
          />
        ))
      ) : (
        <TaskManager initialTask={paper.tasks[index]} onNext={onNext} />
      )}
      <div className="footer"></div>
    </>
  )
}

export default PaperManager

const generateKey = (task: Task, index: number): string =>
  `${task.question}-${index}`
