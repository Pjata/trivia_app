import ReactDOM from 'react-dom'
import ResultPresenter from './ResultPresenter'

it('It should mount', () => {
  const div = document.createElement('div')
  ReactDOM.render(<ResultPresenter />, div)
  ReactDOM.unmountComponentAtNode(div)
})
