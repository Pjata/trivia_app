import React, { useState } from 'react'
import './Round.css'

import {
  Button,
  Checkbox,
  CheckboxGroup,
  FormFieldGroup,
  ScreenReaderContent,
} from '@instructure/ui'
import { Result, Selection, Task } from '../../model/model'

interface RoundProps {
  task: Task
  onSubmit: (result: Result) => void
  onNext: () => void
}

const Round = ({ task, onSubmit, onNext }: RoundProps) => {
  const [submitted, setSubmitted] = useState<boolean>(false)
  const [selection, setSelection] = useState<Selection>([])

  const resetState = () => {
    setSelection([])
    setSubmitted(false)
    // TODO reset the checkboxes
  }
  return (
    <>
      <FormFieldGroup
        description={
          <ScreenReaderContent>CheckboxGroup examples</ScreenReaderContent>
        }
      >
        <CheckboxGroup
          name="sports"
          onChange={function (value) {
            setSelection(value)
          }}
          defaultValue={selection}
          description={task.taskPhrase}
        >
          {task.answers.map((solutionOption, index) =>
            !submitted ? (
              <Checkbox
                key={generateKey(solutionOption.text, index)} // so the Checkbox is reset onNext
                label={solutionOption.text}
                value={generateKey(solutionOption.text, index)}
              />
            ) : (
              <div key={generateKey(solutionOption.text, index)}> {/* key - so the Checkbox is reset onNext */}
                {solutionOption.text}
                {!!task.answers[index].isAnswer ==
                selection.includes(generateKey(solutionOption.text, index))
                  ? ' | right answer'
                  : ' | wrong answer'}
                {task.answers[index].isAnswer
                  ? ' | isAnswer: true'
                  : ' | isAnswer: false'}
                {selection.includes(generateKey(solutionOption.text, index))
                  ? ' | included in selection'
                  : ' | not included in selection'}
              </div>
            )
          )}
        </CheckboxGroup>
      </FormFieldGroup>

      <Button
        onClick={() => {
          if (submitted) {
            resetState()
            onNext()
          } else {
            setSubmitted(true)
            const evaluation: boolean[] = []
            task.answers.forEach((option, index) =>
              evaluation.push(
                !!option.isAnswer ==
                  selection.includes(generateKey(option.text, index))
              )
            )

            onSubmit({
              task: task,
              selection: selection,
              evaluation,
              verdict: evaluation.every((value) => value),
            })
          }
        }}
      ></Button>
    </>
  )
}

export default Round

const generateKey = (text: string, index: number) => `${text}-${index}`
