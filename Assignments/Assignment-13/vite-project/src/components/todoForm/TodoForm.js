import React from 'react'
import { useState } from 'react'
const TodoForm = ({addTodo}) => {
  const [value,setValue]=useState('')
  const handleSubmit=e=>{
    e.preventDefault();
    addTodo(value)
    setValue('')
  }
  return (
    <form className='TodoForm' onSubmit={handleSubmit}>
     
      <input name='input' type='text'className='todo-input' placeholder='What is the task done today?'
    value={value} onChange={(e)=>{setValue(e.target.value)}} />
      <button type='submit' className='todo-btn'>Add Task</button>
      
    </form>
  )
}

export default TodoForm
