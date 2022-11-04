import { exampleTasks } from './assets/mock/mocks'
import PaperManager from './components/PaperManager/PaperManager'
import { Paper } from './model/model'
import { createPaper } from './services/paper.service'

const paper: Paper = createPaper(exampleTasks)

const App = () => <PaperManager paper={paper} />

export default App
