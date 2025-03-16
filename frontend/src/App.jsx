import './App.css'
import ShowTodo from './components/ShowTodo'
import { Link, Router } from 'react-router-dom'
import SignIn from './pages/SignIn'
import SignUp from './pages/SignUp'

function App() {

  return (
    <div className='grid justify-center'>
        <SignIn/>
        {/* <SignUp/> */}
    </div>
  )
}

export default App
