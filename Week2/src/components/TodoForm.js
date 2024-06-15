import React, { useState } from 'react';

export const TodoForm = ({ addTodo }) => {
  const [value, setValue] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (value.trim() === '') {
      setError('Task cannot be empty');
      return;
    }
    addTodo(value);
    setValue('');
    setError('');
  };

  return (
    <form onSubmit={handleSubmit} className='TodoForm'>
      <input
        type='text'
        value={value}
        onChange={(e) => setValue(e.target.value)}
        className='todo-input'
        placeholder='What is the task today?'
      />
      <button type='submit' className='todo-btn'>
        Add Task
      </button>
      {error && <p className='error'>{error}</p>}
    </form>
  );
};
