import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { TextField, Button } from '@mui/material';
import { useApi } from '../api';

const TodoListGroupAdd = () => {
    const groupsApi = useApi('todoListGroups');
    const [name, setName] = useState('');
    const navigate = useNavigate();

    const handleSubmit = () => {
        groupsApi.create({ name });
        navigate('/');
    };

    return (
        <div>
            <h4>Add Group</h4>
            <TextField
                label="Group Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
            />
            <Button onClick={handleSubmit}>Add</Button>
        </div>
    );
};

export default TodoListGroupAdd;