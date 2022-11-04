import React, { useState } from 'react'
import './TaskManager.css'

import {
  Button,
  Checkbox,
  CheckboxGroup,
  FormFieldGroup,
  Heading,
  ScreenReaderContent,
  Text,
} from '@instructure/ui'
import { Result, Selection, Task } from '../../model/model'

interface TaskManagerProps {
  initialTask: Result
  onSubmit?: (result: Result) => void
  onNext?: (loadNextTask: (nextTask: Result) => void) => void
}

const TaskManager = ({
  initialTask,
  onSubmit = () => {},
  onNext,
}: TaskManagerProps) => {
  const [selection, setSelection] = useState<Selection>(initialTask.selection)
  const [currentTask, setCurrentTask] = useState<Result>(initialTask)

  const resetState = (withTask: Result) => {
    setSelection(withTask.selection)
  }

  const updateSelection = function (value: Selection) {
    setSelection(value)
  }
  const isAnswerCorrect = (index: number) =>
    !!currentTask.task.answers[index].isAnswer ==
    selection.includes(generateKey(currentTask.task, index))

  return (
    <>
      <div className="task margin-large margin-top-x-large">
        <>
          <FormFieldGroup
            description={
              <ScreenReaderContent>
                {`Give the correct answer using the form below.`}
              </ScreenReaderContent>
            }
          >
            <CheckboxGroup
              name={`multiple-selection-form`}
              onChange={updateSelection}
              defaultValue={selection}
              description={currentTask.task.question}
            >
              {currentTask.task.answers.map((solutionOption, index) => {
                let labelColor, labelText: string

                if (isAnswerCorrect(index)) {
                  ;[labelColor, labelText] = ['#00c9a6', 'correct']
                } else {
                  ;[labelColor, labelText] = ['#FF7B9F', 'incorrect']
                }

                return (
                  <div
                    className={`validated-answer validated-answer-${labelText}`}
                    key={generateKey(currentTask.task, index)}
                  >
                    <Checkbox
                      className="validated-answer-checkbox"
                      as={'span'}
                      label={solutionOption.text}
                      defaultChecked={selection.includes(
                        generateKey(currentTask.task, index)
                      )}
                      disabled={currentTask.submitted}
                    />
                    {currentTask.submitted ? (
                      <span
                        style={{ color: labelColor }}
                        className={`verdict verdict-${labelText}`}
                      >
                        {labelText}
                      </span>
                    ) : (
                      void 0
                    )}
                  </div>
                )
              })}
            </CheckboxGroup>
          </FormFieldGroup>
        </>
      </div>
      <div className="control-row margin-large">
        {onNext ? (
          <Button
            onClick={() => {
              if (currentTask.submitted) {
                onNext((nextTask: Result) => {
                  console.log('[TaskManager] - Load next task', nextTask)
                  setCurrentTask(nextTask)
                  resetState(nextTask)
                })
              } else {
                currentTask.submitted = true
                currentTask.selection = [...selection]
                currentTask.task.answers.forEach((option, index) =>
                  currentTask.evaluation.push(
                    !!option.isAnswer ==
                      selection.includes(generateKey(currentTask.task, index))
                  )
                )
                currentTask.verdict = currentTask.evaluation.every(
                  (verdict) => verdict
                )

                onSubmit(currentTask)
                setCurrentTask({ ...currentTask })
              }
            }}
          >
            {currentTask.submitted ? 'Next question >' : 'Submit answer'}
          </Button>
        ) : (
          void 0
        )}
      </div>
      {currentTask.submitted ? (
        <>
          <div className="feedback-elaboration margin-large margin-top-x-large margin-bottom-xx-large">
            {currentTask.task.feedback ? (
              <div className="margin-large">
                <Heading level="h3" className="feedback">
                  {
                    currentTask.task.feedback[
                      !!currentTask.verdict ? 'positive' : 'negative'
                    ]
                  }
                </Heading>
              </div>
            ) : (
              void 0
            )}
            {currentTask.task.elaboration ? (
              <div className="margin-large">
                <Text className="elaboration">
                  {currentTask.task.elaboration}
                </Text>
              </div>
            ) : (
              void 0
            )}
          </div>
        </>
      ) : (
        void 0
      )}
    </>
  )
}

export default TaskManager

const generateKey = (task: Task, index: number) => `${task.question}-${index}`
