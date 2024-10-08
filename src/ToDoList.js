import React, { useState } from 'react';
import { Tab, Tabs, ListGroup, Container, Row, Col, Form, Button } from 'react-bootstrap';
import './index.css'; // Custom styling for layout

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
    const dueDateObj = new Date(dueDate);
    const diffTime = dueDateObj - currentDate;
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

    if (diffDays > 7) return 'primary';
    if (diffDays <= 7 && diffDays > 4) return 'success';
    if (diffDays <= 4 && diffDays > 2) return 'warning';
    return 'danger';
  };

  const addTodo = (e) => {
    e.preventDefault();
    if (newTodo.title && newTodo.dueDate) {
      setTodos([...todos, { ...newTodo, description: `Description for ${newTodo.title}` }]);
      setNewTodo({ title: '', dueDate: '' });
    }
  };

  const handleDescriptionChange = (index, event) => {
    const updatedTodos = [...todos];
    updatedTodos[index].description = event.target.textContent;
    setTodos(updatedTodos);
  };

  const handleDueDateChange = (index, event) => {
    const updatedTodos = [...todos];
    updatedTodos[index].dueDate = event.target.value;
    setTodos(updatedTodos);
  };

  return (
    <Container>
      <h1 className="text-center my-4">Assignment 2: Chandrashekar's ToDo List</h1>
      <Row>
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
        <Col md={8}>
          <Tab.Container id="todo-tabs" defaultActiveKey="#todo1">
            <Row>
              <Col sm={4}>
                <ListGroup>
                  {todos.map((todo, index) => (
                    <ListGroup.Item
                      key={index}
                      action
                      href={`#todo${index + 1}`}
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
                      <h3 contentEditable={true} onBlur={(e) => handleDescriptionChange(index, e)}>
                        {todo.description}
                      </h3>
                      <Form.Control
                        type="date"
                        value={todo.dueDate}
                        onChange={(e) => handleDueDateChange(index, e)}
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
