import List from './components/List';
import reactLogo from './assets/react.svg'
import './App.css'

function App() {

  return (
    <div>
      <a href="https://react.dev" target="_blank">
        <img src={reactLogo} className="logo react" alt="React logo" />
      </a>
      <h1>Art Institute of Chicago Gallery</h1>
      <List />
    </div>
  )
}

export default App
