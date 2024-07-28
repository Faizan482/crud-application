import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import DescriptionIcon from "@mui/icons-material/Description";
import TableRowItem from "./TableRowItem";
import TodoDialog from "./TodoDialog";
import { useState } from "react";
import { useGetTodosQuery } from "./hooks/useGetTodosQuery";

interface TodoListProps {
  searchTerm: string;
}

interface SingleTodo {
  id: string;
  title: string;
  description: string;
  voiceNote: string;
  completed: boolean;
}
const TodoList = ({ searchTerm }: TodoListProps) => {
  const { data: todos = [] } = useGetTodosQuery();

  const [open, setOpen] = useState(false);
  const [editId, setEditId] = useState("");

  const handleOpenDialog = (id: string) => {
    setOpen(true);
    setEditId(id);
  };

  const handleClose = () => {
    setOpen(false);
  };

  // Filter todos based on the search term
  const filteredTodos = todos.filter(
    (todo: SingleTodo) =>
      todo.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      todo.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead sx={{ backgroundColor: "secondary.main" }}>
            <TableRow>
              <TableCell sx={{ color: "white" }}>Completed</TableCell>
              <TableCell sx={{ color: "white" }}>Title</TableCell>
              <TableCell sx={{ color: "white" }}>Description</TableCell>
              <TableCell sx={{ color: "white" }}>Audio</TableCell>
              <TableCell sx={{ color: "white" }} align="center">
                Actions
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredTodos.length === 0 ? (
              <TableRow>
                <TableCell colSpan={5} align="center">
                  <Typography
                    variant="h5"
                    sx={{
                      display: "flex",
                      justifyContent: "center",
                      paddingY: "12px",
                    }}
                  >
                    No Data Found
                    <DescriptionIcon sx={{ paddingTop: "5px" }} />
                  </Typography>
                </TableCell>
              </TableRow>
            ) : (
              filteredTodos.map((todo: SingleTodo) => (
                <TableRowItem
                  key={todo.id}
                  todo={todo}
                  handleOpenDialog={handleOpenDialog}
                />
              ))
            )}
          </TableBody>
        </Table>
      </TableContainer>
      <TodoDialog open={open} handleClose={handleClose} id={editId} />
    </>
  );
};

export default TodoList;
