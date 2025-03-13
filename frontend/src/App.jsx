import './App.css'
import ShowTodo from './components/ShowTodo'
import { Link, Router } from 'react-router-dom'
import SignIn from './pages/SignIn'

function App() {

  return (
    <div className='grid justify-center'>
        <SignIn/>
    </div>
  )
}

export default App
