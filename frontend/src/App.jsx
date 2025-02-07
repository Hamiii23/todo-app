import InputBox from './components/InputBox'
import Button from './components/Button'
import './App.css'
import ShowTodo from './components/ShowTodo'

function App() {

  return (
    <div className='grid justify-center'>
        <div className=''>
          <div>
            <h1 className='text-4xl m-2'>Todo App</h1>
          </div>
            <InputBox label={"Title"} placeholder={"Enter todo title"}/>
            <InputBox label={"Description"} placeholder={"Enter todo description"}/>
            <Button label={"Add todo"}/>
        </div>
        <div>
          <ShowTodo title={"todo 1"} description={"desc 1"}/>
        </div>
    </div>
  )
}

export default App
