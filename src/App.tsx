import { Container } from "@mui/material";
import NavBar from "./components/NavBar";
import TodoList from "./components/TodoList";
import AddTodoForm from "./components/AddTodoForm";
import { useState } from "react";
const App = () => {
  const [searchTerm, setSearchTerm] = useState("");
  return (
    <>
      <NavBar searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
      <Container maxWidth="xl">
        <AddTodoForm />
        <TodoList searchTerm={searchTerm} />
      </Container>
    </>
  );
};

export default App;
