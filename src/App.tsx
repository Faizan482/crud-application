import { Container } from "@mui/material";
import NavBar from "./components/NavBar";
import TodoList from "./components/TodoList";
import AddTodoForm from "./components/AddTodoForm";

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
