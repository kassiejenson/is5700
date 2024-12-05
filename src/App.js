import logo from './logo.svg';
import './App.css';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Home from './pages/Home';
import TodoListGroupAdd from './pages/TodoListGroupAdd';
import TodoListGroupEdit from './pages/TodoListGroupEdit';
import TodoList from './pages/TodoList';
import TodoAdd from './pages/TodoAdd';
import TodoEdit from './pages/TodoEdit';

function App() {
  return (
    <Router>
      <div>
        <nav>
          <Link to="/" style={{ padding: '10px' }}>Home</Link>
        </nav>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/groups/add" element={<TodoListGroupAdd />} />
          <Route path="/groups/edit/:id" element={<TodoListGroupEdit />} />
          <Route path="/groups/:id" element={<TodoList />} />
          <Route path="/todos/add/:groupId" element={<TodoAdd />} />
          <Route path="/todos/edit/:id" element={<TodoEdit />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
