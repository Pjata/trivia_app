import ReactDOM from 'react-dom'
import TaskResolver from './TaskResolver'

it('It should mount', () => {
  const div = document.createElement('div')
  ReactDOM.render(<TaskResolver />, div)
  ReactDOM.unmountComponentAtNode(div)
})
