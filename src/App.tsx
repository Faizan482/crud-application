import { Container } from "@mui/material";
import NavBar from "./components/NavBar";
import AddTodoForm from "./components/AddTodoForm";
import TodoList from "./components/TodoList";

const App = () => {
  return (
    <>
      <NavBar />
      <Container maxWidth="xl">
        <AddTodoForm />
        <TodoList />
      </Container>
    </>
  );
};

export default App;
