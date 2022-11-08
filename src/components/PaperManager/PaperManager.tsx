import { useState } from 'react'
import { Heading } from '@instructure/ui'
import { Paper, Result, Selection, TaskDefinition } from '../../model/model'
import ResultPresenter from '../ResultPresenter/ResultPresenter'
import TaskResolver from '../TaskResolver/TaskResolver'

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

  const onSubmit = (result: Result) => {
    setResults((currentResultsState) => [...currentResultsState, result])
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
        results.map((result, resultIndex) => (
          <ResultPresenter
            result={result}
            key={generateKey(result.taskDefinition, resultIndex)}
          />
        ))
      ) : results[index] ? (
        <ResultPresenter
          result={results[index]}
          onConfirm={onNext}
          confirmButtonText={
            index >= paper.tasks.length - 1 ? 'See results' : void 0
          }
        />
      ) : (
        <TaskResolver
          task={paper.tasks[index]}
          key={generateKey(currentTask, index)}
          onConfirm={onSubmit}
        />
      )}
      <div className="footer"></div>
    </>
  )
}

export default PaperManager

const generateKey = (task: TaskDefinition, index: number): string =>
  `${task.question}-${index}`
