import { useState,useEffect } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import { MdDelete } from "react-icons/md";
import { FaEdit } from "react-icons/fa";
import Navbar from './components/Navbar'
import { v4 as uuidv4 } from 'uuid';


function App() {
  const [count, setCount] = useState(0)

  const [todo, setTodo] = useState("")
  const [todos, setTodos] = useState([])
  const [showFinished, setshowFinished] = useState(true)



  useEffect(() => {
    let todoString = localStorage.getItem("todos")
    if(todoString){
      let todos = JSON.parse(localStorage.getItem("todos")) 
      setTodos(todos)
    }
  }, [])

  const toggleFinished = (e) => {
    setshowFinished(!showFinished)
  }

  const handleEdit = (e, id)=>{ 
    let t = todos.filter(i=>i.id === id) 
    setTodo(t[0].todo)
    let newTodos = todos.filter(item=>{
      return item.id!==id
    }); 
    setTodos(newTodos) 
    saveToLocalStorage()
  }
  const handleDelete = (e, id) => {
    let newTodos = todos.filter(item => {
      return item.id !== id
    });
    setTodos(newTodos)
    saveToLocalStorage()
  }

  const handleAdd = () => {
    setTodos([...todos, { id: uuidv4(), todo, isCompleted: false }])
    setTodo("")
    saveToLocalStorage()
  }

  const handleChange = (e) => {
    setTodo(e.target.value)
  }

  const handleCheckbox = (e) => {
    let id = e.target.name;
    let index = todos.findIndex(item => {
      return item.id === id;
    })
    let newTodos = [...todos];
    newTodos[index].isCompleted = !newTodos[index].isCompleted;
    setTodos(newTodos)
    saveToLocalStorage()
  }


  const saveToLocalStorage = (params) => {
    localStorage.setItem("todos", JSON.stringify(todos))
  }

  return (
    <>
      <Navbar />
      <div className="mx-3 md:container md:mx-auto my-5 p-4 bg-purple-200 rounded-xl min-h-[75vh] md:w-1/2">
      <h1 className='font-bold text-center text-2xl'>iTask Your Todo At OnePlace</h1>
        <div className="addTodo flex flex-col gap-5">
          <h2 className='text-lg font-bold'>Add a Todo</h2>
          <input onChange={handleChange} value={todo} type="text" className='rounded-full px-5 py-1 w-full' />
          <button onClick={handleAdd} disabled={todo.length<3} className='bg-violet-500 mx-1 rounded-full hover:bg-violet-800 disabled:bg-violet-500 p-4 py-2 text-sm font-bold text-white'>Save</button>
        </div>
        <input className="my-4" onChange={toggleFinished} type="checkbox" checked={showFinished} />Show Finished
        <h2 className='text-lg font-bold'>Your Todos </h2>
        <div className="todos">

          {todos.length === 0 && <div className='m-5 font-bold'>No Todos to display...</div>}
          {todos.map(item => {


            return (showFinished || !item.isCompleted) && <div key={item.id} className="todo flex my-4 md:w-1/2 justify-between">
              <div className='flex gap-5'>
                <input name={item.id} onChange={handleCheckbox} type="checkbox" id="" value={todo.iscompleted} />
                <div className={item.isCompleted ? "line-through" : ""}>{item.todo}</div>
              </div>
              <div className="button flex h-full">
                <button onClick={(e)=>handleEdit(e, item.id)} className='bg-violet-500 mx-1 rounded-full hover:bg-violet-800 disabled:bg-violet-500 p-4 py-2 text-sm font-bold text-white'><FaEdit /></button>
                <button onClick={(e) => { handleDelete(e, item.id) }} className='bg-violet-500 mx-1 rounded-full hover:bg-violet-800 disabled:bg-violet-500 p-4 py-2 text-sm font-bold text-white'><MdDelete /></button>
              </div>

            </div>
          })}
        </div>
      </div>
    </>
  )
}

export default App
