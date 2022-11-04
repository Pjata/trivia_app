import { Heading } from '@instructure/ui'
import React, { useState } from 'react'
import { Paper, Result, Selection, Task } from '../../model/model'
import TaskManager from '../TaskManager/TaskManager'

interface PaperManagerProps {
  paper: Paper
}

const PaperManager = ({ paper }: PaperManagerProps) => {
  const [complete, setComplete] = useState<boolean>(false)
  const [results, setResults] = useState<Result[]>([])
  const [index, setIndex] = useState<number>(0)

  const currentTask = paper.tasks[index]

  const onNext = () => {
    console.log(paper)

    const nexIndex = index + 1

    setIndex(nexIndex)
    if (nexIndex >= paper.tasks.length) {
      setComplete(true)
    }
  }

  const onSubmit = (selection: Selection) => {
    console.log('[PaperManager] onSubmit', selection)

    const task = {...currentTask}

    task.submitted = true
    task.selection = [...selection]

    task.evaluation = task.task.answers.map((option, index) => !!option.isAnswer == selection.includes(generateKey(task.task, index)))
  
    task.verdict = task.evaluation.every(
      (verdict) => verdict
    )

    setResults((currentResults) => [...currentResults, task])
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
            task={task}
            key={generateKey(task.task, taskIndex)}
          />
        ))
      ) : (
        <TaskManager task={paper.tasks[index]} onNext={onNext} key={generateKey(currentTask.task, index)} onSubmit={onSubmit} />
      )}
      <div className="footer"></div>
    </>
  )
}

export default PaperManager

const generateKey = (task: Task, index: number): string =>
  `${task.question}-${index}`
