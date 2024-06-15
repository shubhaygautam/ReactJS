import React, { useState, useEffect } from 'react';
import { Todo } from './Todo';
import { TodoForm } from './TodoForm';
import { v4 as uuidv4 } from 'uuid';
import { EditTodoForm } from './EditTodoForm';
import {
  MenuItem,
  Select,
  FormControl,
  InputLabel,
  Container,
  Typography,
} from '@mui/material';
import { styled } from '@mui/system'; // Correct import for styled

const Wrapper = styled(Container)({
  marginTop: '20px',
  textAlign: 'center',
});

const Controls = styled('div')({
  display: 'flex',
  justifyContent: 'space-between',
  marginTop: '20px',
});

export const TodoWrapper = () => {
  const [todos, setTodos] = useState([]);
  const [filter, setFilter] = useState('all');
  const [sort, setSort] = useState('asc');

  useEffect(() => {
    const savedTodos = JSON.parse(localStorage.getItem('todos')) || [];
    setTodos(savedTodos);
  }, []);

  useEffect(() => {
    localStorage.setItem('todos', JSON.stringify(todos));
  }, [todos]);

  const addTodo = (todo) => {
    setTodos([
      ...todos,
      { id: uuidv4(), task: todo, completed: false, isEditing: false },
    ]);
  };

  const deleteTodo = (id) => setTodos(todos.filter((todo) => todo.id !== id));

  const toggleComplete = (id) => {
    setTodos(
      todos.map((todo) =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      )
    );
  };

  const editTodo = (id) => {
    setTodos(
      todos.map((todo) =>
        todo.id === id ? { ...todo, isEditing: !todo.isEditing } : todo
      )
    );
  };

  const editTask = (task, id) => {
    setTodos(
      todos.map((todo) =>
        todo.id === id ? { ...todo, task, isEditing: !todo.isEditing } : todo
      )
    );
  };

  const filteredTodos = todos.filter((todo) => {
    if (filter === 'completed') return todo.completed;
    if (filter === 'incomplete') return !todo.completed;
    return true;
  });

  const sortedTodos = filteredTodos.sort((a, b) => {
    if (sort === 'asc') return a.task.localeCompare(b.task);
    return b.task.localeCompare(a.task);
  });

  return (
    <Wrapper maxWidth='sm'>
      <Typography variant='h3' component='h1' gutterBottom>
        Get Things Done!
      </Typography>
      <TodoForm addTodo={addTodo} />
      <Controls className='controls'>
        <FormControl variant='outlined' style={{ minWidth: 120 }}>
          <InputLabel>Filter</InputLabel>
          <Select
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
            label='Filter'
          >
            <MenuItem value='all'>All</MenuItem>
            <MenuItem value='completed'>Completed</MenuItem>
            <MenuItem value='incomplete'>Incomplete</MenuItem>
          </Select>
        </FormControl>
        <FormControl variant='outlined' style={{ minWidth: 120 }}>
          <InputLabel>Sort</InputLabel>
          <Select
            value={sort}
            onChange={(e) => setSort(e.target.value)}
            label='Sort'
          >
            <MenuItem value='asc'>Ascending</MenuItem>
            <MenuItem value='desc'>Descending</MenuItem>
          </Select>
        </FormControl>
      </Controls>
      {sortedTodos.map((todo) =>
        todo.isEditing ? (
          <EditTodoForm key={todo.id} editTodo={editTask} task={todo} />
        ) : (
          <Todo
            key={todo.id}
            task={todo}
            deleteTodo={deleteTodo}
            editTodo={editTodo}
            toggleComplete={toggleComplete}
          />
        )
      )}
    </Wrapper>
  );
};
