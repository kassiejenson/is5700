import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { TextField, Button } from '@mui/material';
import { useApi } from '../api';

const TodoEdit = () => {
    const { id } = useParams();
    const todosApi = useApi('todoItems');
    const [task, setTask] = useState('');
    const [completed, setCompleted] = useState(false);
    const [groupId, setGroupId] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        const todo = todosApi.getById(id);
        console.log(id, todo);
        if (todo) {
            setTask(todo.task);
            setCompleted(todo.completed);
            setGroupId(todo.groupId);
        }
    }, [id]);

    const handleSubmit = () => {
        todosApi.update(id, { task, completed, groupId });
        navigate(`/groups/${groupId}`);
    }

    return (
        <div>
            <h4>Edit Todo</h4>
            <TextField
                label="Task Name"
                value={task}
                onChange={(e) => setTask(e.target.value)}
            />
            <Button onClick={() => setCompleted(!completed)}>
                {completed ? 'Mark as Incomplete' : 'Mark as Complete'}
            </Button>
            <Button onClick={handleSubmit}>Update</Button>
        </div>
    );
};

export default TodoEdit;