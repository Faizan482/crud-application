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
import { useSelector } from "react-redux";
// import { RootState } from "../store";
import TableRowItem from "./TableRowItem";
import TodoDialog from "./TodoDialog";
import { useState } from "react";
import { blue } from "@mui/material/colors";
import { selectFilteredTodos } from "../features/todos/todoSlice";
const TodoList = () => {
  // const todos = useSelector((state: RootState) => state.todos.todos);
  const todos = useSelector(selectFilteredTodos);
  console.log(todos, "todoitemsssssssss");
  const [open, setOpen] = useState(false);
  const [editId, setEditId] = useState("");
  const handleOpenDialog = (id: string) => {
    setOpen(true);
    setEditId(id);
  };
  const handleClose = () => {
    setOpen(false);
  };
  const bgColor = blue[700];
  return (
    <>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead style={{ backgroundColor: bgColor }}>
            <TableRow>
              <TableCell
                sx={{
                  fontWeight: "bold",
                  color: "white",
                  fontFamily: "monospace",
                  fontSize: "17px",
                }}
              >
                Completed
              </TableCell>
              <TableCell
                sx={{
                  fontWeight: "bold",
                  color: "white",
                  fontFamily: "monospace",
                  fontSize: "17px",
                }}
              >
                Title
              </TableCell>
              <TableCell
                sx={{
                  fontWeight: "bold",
                  color: "white",
                  fontFamily: "monospace",
                  fontSize: "17px",
                }}
              >
                Discription
              </TableCell>
              <TableCell
                sx={{
                  fontWeight: "bold",
                  color: "white",
                  fontFamily: "monospace",
                  fontSize: "17px",
                }}
              >
                Audio
              </TableCell>
              <TableCell
                align="center"
                sx={{
                  fontWeight: "bold",
                  color: "white",
                  fontFamily: "monospace",
                  fontSize: "17px",
                }}
              >
                Actions
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {todos.length === 0 ? (
              <TableRow>
                <TableCell colSpan={5} align="center">
                  <Typography
                    variant="h5"
                    sx={{
                      display: "flex",
                      justifyContent: "center",
                      paddingY: "12px",
                      fontFamily: "sans-serif ",
                    }}
                  >
                    List of items is empty now
                    <DescriptionIcon sx={{ paddingTop: "5px" }} />
                  </Typography>
                </TableCell>
              </TableRow>
            ) : (
              todos.map((todo) => (
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
