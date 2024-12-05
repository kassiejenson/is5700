import { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { TextField, Button } from '@mui/material';
import { useApi } from '../api';

const TodoAdd = () => {
    const { groupId } = useParams();
    const todosApi = useApi('todoItems');
    const [task, setTask] = useState('');
    const navigate = useNavigate();

    const handleSubmit = () => {
        todosApi.create({ task, completed: false, groupId });
        navigate(`/groups/${groupId}`);
    }

    return (
        <div>
            <h4>Add Todo</h4>
            <TextField
                label="Task Name"
                value={task}
                onChange={(e) => setTask(e.target.value)}
            />
            <Button onClick={handleSubmit}>Add</Button>
        </div>
    );
};

export default TodoAdd;