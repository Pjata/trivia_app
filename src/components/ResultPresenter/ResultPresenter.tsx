import './ResultPresenter.css'

import { Button, Checkbox, Heading, Text } from '@instructure/ui'
import { Result, TaskDefinition } from '../../model/model'

interface ResultPresenterProps {
  result: Result
  onConfirm?: () => void
  confirmButtonText?: string
}

const ResultPresenter = ({
  result,
  onConfirm,
  confirmButtonText = 'Next question >',
}: ResultPresenterProps) => {
  const wasAnswerChecked = (index: number): boolean =>
    (result.taskDefinition.answers[index].isAnswer &&
      result.evaluation[index]) ||
    (!result.taskDefinition.answers[index].isAnswer &&
      !result.evaluation[index])

  const getVerdict = () => result.evaluation.every((verdict) => verdict)

  const isSubmitted = !!result.evaluation.length

  return (
    <>
      <div className="task margin-large margin-top-x-large">
        <div className="margin-bottom-12">
          <Heading level="h4">{result.taskDefinition.question}</Heading>
        </div>
        <div className="answers">
          {result.taskDefinition.answers.map((solutionOption, index) => {
            let answerVerdict = result.evaluation[index]
              ? 'correct'
              : 'incorrect'

            return (
              <span className="validated-answer">
                <Checkbox
                  key={generateKey(result.taskDefinition, index)}
                  className="validated-answer-checkbox"
                  label={solutionOption.text}
                  value={solutionOption.text}
                  defaultChecked={wasAnswerChecked(index)}
                  disabled={isSubmitted}
                />
                <span className={`answer-verdict answer-${answerVerdict}`}>
                  {answerVerdict}
                </span>
              </span>
            )
          })}
        </div>
      </div>
      <div className="control-row margin-large">
        {onConfirm && <Button onClick={onConfirm}>{confirmButtonText}</Button>}
      </div>
      {isSubmitted && (
        <div className="feedback-elaboration margin-large margin-top-x-large margin-bottom-xx-large">
          {result.taskDefinition.feedback && (
            <div className="margin-large">
              <Heading level="h3" className="feedback">
                {
                  result.taskDefinition.feedback[
                    getVerdict() ? 'positive' : 'negative'
                  ]
                }
              </Heading>
            </div>
          )}
          {result.taskDefinition.elaboration && (
            <div className="margin-large">
              <Text className="elaboration">
                {result.taskDefinition.elaboration}
              </Text>
            </div>
          )}
        </div>
      )}
    </>
  )
}

export default ResultPresenter

const generateKey = (task: TaskDefinition, index: number) =>
  `${task.id}-${task.answers[index].id}`
