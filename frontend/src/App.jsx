import './App.css'
import ShowTodo from './components/ShowTodo'
import { BrowserRouter, Link, Route, Router, Routes } from 'react-router-dom'
import SignIn from './pages/SignIn'
import SignUp from './pages/SignUp'
import AddTodo from './pages/AddTodo'
import AddList from './pages/AddList'
import Home from './pages/Home'

function App() {

  return (
    <div className='grid justify-center'>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Home/>}/>
          <Route path='/todo' element={<AddTodo/>}/>
          <Route path='/list' element={<AddList/>}/>
          <Route path='/signup' element={<SignUp/>}/>
          <Route path='/signin' element={<SignIn/>}/>
        </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App
