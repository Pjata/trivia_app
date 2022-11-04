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
  task: Result
  onSubmit?: (selection: Selection) => void
  onNext?: () => void
}

const TaskManager = ({
  task,
  onSubmit = () => {},
  onNext,
}: TaskManagerProps) => {
  const [selection, setSelection] = useState<Selection>(task.selection)

  const updateSelection = function (value: Selection) {
    console.log('---------------')
    setSelection(value)
  }
  const isAnswerCorrect = (index: number) =>
    !!task.task.answers[index].isAnswer ==
    selection.includes(generateKey(task.task, index))

  const isSubmitted = !!task.evaluation.length

  console.log('[TaskManager] initial selection', selection)

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
              description={task.task.question}
            >
              {task.task.answers.map((solutionOption, index) => {
                let labelColor, labelText: string

                if (isAnswerCorrect(index)) {
                  ;[labelColor, labelText] = ['#00c9a6', 'correct']
                } else {
                  ;[labelColor, labelText] = ['#FF7B9F', 'incorrect']
                }

                return (
                  <Checkbox
                  key={generateKey(task.task, index)}
                    className="validated-answer-checkbox"
                    label={solutionOption.text}
                    value={solutionOption.text}
                    defaultChecked={selection.includes(
                      generateKey(task.task, index)
                    )}
                    disabled={isSubmitted}
                  />
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
              if (task.submitted) {
                onNext()
              } else {
                console.log('[TaskManager] onSubmit - selection', selection)
                console.log('[TaskManager] onSubmit - task', task)
                onSubmit(selection)
              }
            }}
          >
            {task.submitted ? 'Next question >' : 'Submit answer'}
          </Button>
        ) : (
          void 0
        )}
      </div>
      {task.submitted ? (
        <>
          <div className="feedback-elaboration margin-large margin-top-x-large margin-bottom-xx-large">
            {task.task.feedback ? (
              <div className="margin-large">
                <Heading level="h3" className="feedback">
                  {task.task.feedback[!!task.verdict ? 'positive' : 'negative']}
                </Heading>
              </div>
            ) : (
              void 0
            )}
            {task.task.elaboration ? (
              <div className="margin-large">
                <Text className="elaboration">{task.task.elaboration}</Text>
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
