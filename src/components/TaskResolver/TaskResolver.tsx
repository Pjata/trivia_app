import { useState } from 'react'
import './TaskResolver.css'

import {
  Button,
  Checkbox,
  CheckboxGroup,
  FormFieldGroup,
  ScreenReaderContent,
} from '@instructure/ui'
import { Result, Selection, TaskDefinition } from '../../model/model'

interface TaskResolverProps {
  task: TaskDefinition
  onConfirm: (result: Result) => void
}

const TaskResolver = ({ task, onConfirm }: TaskResolverProps) => {
  const [selection, setSelection] = useState<Selection>([])

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
              onChange={setSelection}
              defaultValue={selection}
              description={task.question}
            >
              {task.answers.map((solutionOption, index) => (
                <Checkbox
                  key={generateKey(task, index)}
                  className="validated-answer-checkbox"
                  label={solutionOption.text}
                  value={generateKey(task, index)}
                  defaultChecked={selection.includes(generateKey(task, index))}
                />
              ))}
            </CheckboxGroup>
          </FormFieldGroup>
        </>
      </div>
      <div className="control-row margin-large">
        <Button
          onClick={() => {
            onConfirm({
              taskDefinition: task,
              evaluation: task.answers.map(
                (option, index) =>
                  !!option.isAnswer ==
                  selection.includes(generateKey(task, index))
              ),
            })
          }}
        >
          Submit answer
        </Button>
      </div>
    </>
  )
}

export default TaskResolver

const generateKey = (task: TaskDefinition, index: number) =>
  `${task.id}-${task.answers[index].id}`
