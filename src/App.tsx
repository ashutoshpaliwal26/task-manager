import { AppBar, Button, Container, Stack, TextField, Toolbar, Typography } from "@mui/material"
import TodoItem from "./components/todoItem"
import { useEffect, useState } from "react"

const App = () => {
  const [todos, setTodos] = useState<TodoItemType[]>([]);

  const [todoTitle, setTodoTitle] = useState<TodoItemType['id']>("");

  useEffect(()=>{
  },[])
  const completeHandeler = (id: TodoItemType["id"]): void => {
    const newTodos = todos.map((i)=>{
      if(i.id === id){
        i.isComplet = !i.isComplet;
      }
      return i;
    })

    setTodos(newTodos);
  }
  const deleteHandeler = (id: TodoItemType["id"]): void => {
    const newTodos:TodoItemType[] = todos.filter((ele)=> ele.id !== id )
    setTodos(newTodos);
  }
  
  const ediHandeler = (id: TodoItemType['id'], title : TodoItemType["title"]) =>{
    const newTodos = todos.map((i)=>{
      if(i.id === id){
        i.title = title;
      }
      return i;
    })
    setTodos(newTodos);
  }
  
  const submitHandeler = () => {
    const newTodo: TodoItemType = {
      title: todoTitle,
      isComplet: false,
      id: String(Math.random())
    }
    setTodos((pre) => ([...pre, newTodo]));
    setTodoTitle("");
  }

  return (
    <div>
      <Container maxWidth="sm" sx={{
        height: "100vh",

      }}>
        <AppBar position="static">
          <Toolbar>
            <Typography>
              TODO App
            </Typography>
          </Toolbar>
        </AppBar>
        <Stack sx={{
          overflow: "scroll"
        }} height={"70%"} direction={"column"} spacing={"1rem"} p={"1rem"}>
          {
            todos.map((i) => {
              return <TodoItem key={i.id}
                todo={i}
                completeHandeler={completeHandeler}
                deleteHandeler={deleteHandeler}
                ediHandeler={ediHandeler}
              />
            })
          }
        </Stack>
        <TextField value={todoTitle} onChange={(e) => { setTodoTitle(e.target.value) }} fullWidth label={"New Task"} onKeyDown={(e) => {
          if (e.key === "Enter" && todoTitle !== "") {
            submitHandeler();
          }
        }}/>
        <Button fullWidth variant="contained" sx={{
          margin: "1rem 0"
        }} onClick={submitHandeler}
        disabled={todoTitle===""} >Add</Button>
      </Container>
    </div>
  )
}

export default App