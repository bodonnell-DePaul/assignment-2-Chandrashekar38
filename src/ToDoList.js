import React, { useState } from 'react';
import { Container, Row, Col, Form, Button, ListGroup, Tab } from 'react-bootstrap';
import './index.css';

const todoItems = [
  { title: 'Todo 1', description: 'Description for Todo 1', dueDate: '2024-10-20' },
  { title: 'Todo 2', description: 'Description for Todo 2', dueDate: '2024-10-15' },
  { title: 'Todo 3', description: 'Description for Todo 3', dueDate: '2024-10-10' },
  { title: 'Todo 4', description: 'Description for Todo 4', dueDate: '2024-10-05' }
];

const TodoList = () => {
  const [todos, setTodos] = useState(todoItems);
  const [newTodo, setNewTodo] = useState({ title: '', dueDate: '' });

  const getVariant = (dueDate) => {
    const currentDate = new Date();
    const itemDueDate = new Date(dueDate);
    const diffInDays = (itemDueDate - currentDate) / (1000 * 60 * 60 * 24);

    if (diffInDays > 7) return 'primary';
    if (diffInDays <= 7 && diffInDays >= 4) return 'success';
    if (diffInDays < 4 && diffInDays >= 2) return 'warning';
    return 'danger';
  };

  const addTodo = (e) => {
    e.preventDefault();
    if (newTodo.title && newTodo.dueDate) {
      setTodos([...todos, { ...newTodo, description: `Description for ${newTodo.title}` }]);
      setNewTodo({ title: '', dueDate: '' });
    }
  };

  const handleDescriptionChange = (index, newDescription) => {
    const updatedTodos = [...todos];
    updatedTodos[index].description = newDescription;
    setTodos(updatedTodos);
  };

  const handleDueDateChange = (index, newDueDate) => {
    const updatedTodos = [...todos];
    updatedTodos[index].dueDate = newDueDate;
    setTodos(updatedTodos);
  };

  return (
    <Container>
      <h1 className="text-center">Assignment 2: ToDo List</h1>
      <Row className="justify-content-center">
        <Col md={4}>
          <Form onSubmit={addTodo} className="form-container">
            <Form.Group controlId="newTodoItem">
              <Form.Label>ToDo Item</Form.Label>
              <Form.Control
                type="text"
                placeholder="Add todo item"
                value={newTodo.title}
                onChange={(e) => setNewTodo({ ...newTodo, title: e.target.value })}
              />
            </Form.Group>
            <Form.Group controlId="newDueDate">
              <Form.Label>Due Date</Form.Label>
              <Form.Control
                type="date"
                value={newTodo.dueDate}
                onChange={(e) => setNewTodo({ ...newTodo, dueDate: e.target.value })}
              />
            </Form.Group>
            <Button type="submit" className="btn-primary mt-3">Add Todo</Button>
          </Form>
        </Col>

        <Col md={6}>
          <Tab.Container defaultActiveKey="#todo1">
            <Row>
              <Col sm={4}>
                <ListGroup>
                  {todos.map((todo, index) => (
                    <ListGroup.Item
                      action
                      href={`#todo${index + 1}`}
                      key={index}
                      variant={getVariant(todo.dueDate)}
                    >
                      {todo.title}
                    </ListGroup.Item>
                  ))}
                </ListGroup>
              </Col>
              <Col sm={8}>
                <Tab.Content>
                  {todos.map((todo, index) => (
                    <Tab.Pane eventKey={`#todo${index + 1}`} key={index}>
                      <h3 contentEditable onBlur={(e) => handleDescriptionChange(index, e.target.textContent)}>
                        {todo.description}
                      </h3>
                      <Form.Control
                        type="date"
                        value={todo.dueDate}
                        onChange={(e) => handleDueDateChange(index, e.target.value)}
                      />
                    </Tab.Pane>
                  ))}
                </Tab.Content>
              </Col>
            </Row>
          </Tab.Container>
        </Col>
      </Row>
    </Container>
  );
};

export default TodoList;
