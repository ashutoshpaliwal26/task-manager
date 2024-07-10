import { Delete, Edit, Check } from "@mui/icons-material";
import { Checkbox, IconButton, Paper, Stack, TextField, Typography } from "@mui/material";
import { useState } from "react";


type PropTypeTodo = {
    todo: TodoItemType;
    completeHandeler: (id: TodoItemType['id']) => void;
    deleteHandeler: (id: TodoItemType['id']) => void;
    ediHandeler: (id: TodoItemType['id'], title: TodoItemType['title']) => void;
}


const TodoItem = ({ todo, completeHandeler, deleteHandeler, ediHandeler }: PropTypeTodo) => {

    const [isEdit, setIsEdit] = useState<boolean>(false);

    const [editText, setEditText] = useState<TodoItemType['title']>(todo.title);

    return (<>
        <Paper sx={{
            padding: "1rem"
        }}>
            <Stack direction={"row"} alignItems={"center"}>

                {
                    isEdit ? <TextField fullWidth value={editText} onChange={(e) => setEditText(e.target.value)} onKeyDown={(e)=>{
                        console.log(e.key)
                        if (e.key === "Enter") {
                            ediHandeler(todo.id, editText);
                            setIsEdit(!isEdit)
                        }
                        if(e.key === "Enter" && editText===""){
                            deleteHandeler(todo.id);
                            setIsEdit(!isEdit)
                        }
                    }}/> : <Typography sx={{
                        marginRight: "auto"
                    }}>
                        {todo.title}
                    </Typography>
                }


                <Checkbox onClick={() => { completeHandeler(todo.id) }} />
                {isEdit ? <IconButton onClick={() => { ediHandeler(todo.id, editText); setIsEdit(!isEdit) }}><Check color="primary" /></IconButton> : <IconButton onClick={() => {setIsEdit(!isEdit)}}><Edit color="primary" /></IconButton>}
                <IconButton onClick={() => { deleteHandeler(todo.id) }}><Delete color="primary" /></IconButton>
            </Stack>
        </Paper>
    </>
    )
}

export default TodoItem