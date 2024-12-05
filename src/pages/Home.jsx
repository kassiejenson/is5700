import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Checkbox, Button, Accordion, AccordionSummary, AccordionDetails } from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { useApi } from '../api';

const Home = () => {
    const groupsApi = useApi('todoListGroups');
    const todosApi = useApi('todoItems');
    const [groups, setGroups] = useState([]);
    const [todos, setTodos] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        setGroups(groupsApi.getAll());
        setTodos(todosApi.getAll());
    }, []);

    const deleteGroup = (id) => {
        groupsApi.delete(id);
        setGroups(groupsApi.getAll());
    };

    const deleteTodo = (todoId) => {
        todosApi.delete(todoId);
        setTodos((prevTodos) => prevTodos.filter((todo) => todo.id !== todoId));
    };

    return (
        <div className="home">
            <h4 style={{ textAlign: 'center' }}>Todo Groups</h4>
            <Button onClick={() => { navigate('/groups/add') }}>Add Group</Button>
            {groups.map((group) => {
                const groupTodos = todos.filter(todo => todo.groupId === group.id);

                const columns = [
                    { field: 'completed', headerName: 'completed', width: 150,
                        renderCell: (params) => (
                            <span>{params.value ? 'Completed' : 'Not Completed' }</span>
                    )},
                    { field: 'task', headerName: 'task', width: 400 },
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

                const rows = groupTodos.map((todo) => ({
                    id: todo.id,
                    task: todo.task,
                    completed: todo.completed,
                }));

                return (
                    <Accordion key={group.id}>
                        <AccordionSummary
                            expandIcon={<ExpandMoreIcon />}
                            aria-controls={`panel-${group.id}-content`}
                            id={`panel-${group.id}-header`}
                        >{group.name}</AccordionSummary>
                        <AccordionDetails>
                            <div style={{ height: 400, width: '100%' }}>
                                <DataGrid
                                    rows={rows}
                                    columns={columns}
                                    pageSize={5}
                                />
                            </div>
                            <Button onClick={() => navigate(`/todos/add/${group.id}`)}>Add Todo</Button>
                            <Button onClick={() => deleteGroup(group.id)}>Delete Group</Button>
                        </AccordionDetails>
                    </Accordion>
                );
            })};
        </div>  
    );
};

export default Home;