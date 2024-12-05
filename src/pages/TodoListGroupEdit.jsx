import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { TextField, Button } from '@mui/material';
import { useApi } from '../api';

const TodoListGroupEdit = () => {
    const { id } = useParams();
    const groupsApi = useApi('todoListGroups');
    const [name, setName] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        const group = groupsApi.getById(id);
        if (group) setName(group.name);
    }, [id]);

    const handleSubmit = () => {
        groupsApi.update(id, { name });
        navigate('/');
    };

    return (
        <div>
            <h4>Edit Group</h4>
            <TextField
                label="Group Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
            />
            <Button onClick={handleSubmit}>Update</Button>
        </div>
    );
};

export default TodoListGroupEdit;