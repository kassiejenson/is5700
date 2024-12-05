import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Button } from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';
import { useApi } from '../api';

const TodoList = () => {
    const { id } = useParams();
    const todosApi = useApi('todoItems');
    const [todos, setTodos] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        const groupTodos = todosApi.getAll().filter((todo) => todo.groupId === id);
        setTodos(groupTodos);
    }, [id]);

    const deleteTodo = (todoId) => {
        todosApi.delete(todoId);
        setTodos(todosApi.getAll().filter((todo) => todo.groupId === id));
    };

    const columns = [
        { field: 'completed', headerName: 'completed', width: 200,
            renderCell: (params) => (
                <span>{params.value ? 'Completed' : 'Not Completed'}</span>
        )},
        { field: 'task', headerName: 'task', width: 200 },
        { field: 'actions', headerName: 'actions', width: 150,
            renderCell: (params) => (
                <div>
                    <Button
                        variant="outlined"
                        size="small"
                        onClick={() => navigate(`/todos/edit/${params.row.id}`)}
                    >Edit</Button>
                    <Button
                        variant="outlined"
                        size="small"
                        onClick={() => deleteTodo(params.row.id)}
                    >Delete</Button>
                </div>
            ),
        },
    ];

    const rows = todos.map((todo) => ({
        id: todo.id,
        task: todo.task,
        completed: todo.completed,
    }));

    return (
        <div>
            <h4>Todos</h4>
            <Button onClick={() => navigate(`/todos/add/${id}`)}>Add Todo</Button>
            <div style={{ height: 400, width: '100%' }}>
                <DataGrid
                    rows={rows}
                    columns={columns}
                    pageSize={5}
                />
            </div>
        </div>
    );
};

export default TodoList;