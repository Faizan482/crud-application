import { Delete, Edit } from "@mui/icons-material";
import {
  Checkbox,
  IconButton,
  TableCell,
  TableRow,
  Tooltip,
} from "@mui/material";
import { useDispatch } from "react-redux";
import { deleteTodo, Todo, toggleComplete } from "../features/todos/todoSlice";

interface TodoItemProp {
  todo: Todo;
  handleOpenDialog: (id: string) => void;
}
const TableRowItem = ({ todo, handleOpenDialog }: TodoItemProp) => {
  const dispatch = useDispatch();
  return (
    <TableRow
      key={todo.id}
      sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
    >
      <TableCell padding="checkbox">
        <Checkbox
          color="primary"
          checked={todo.completed}
          onChange={() => dispatch(toggleComplete(todo.id))}
          inputProps={{
            "aria-label": "select all desserts",
          }}
        />
      </TableCell>

      <TableCell component="th" scope="row">
        {todo.title}
      </TableCell>
      <TableCell>{todo.description}</TableCell>
      <TableCell>
        {todo.voiceNote && <audio controls src={todo.voiceNote} />}
      </TableCell>
      <TableCell align="center">
        <IconButton onClick={() => dispatch(deleteTodo(todo.id))}>
          <Delete color="error" />
        </IconButton>
        <Tooltip title={todo.completed ? "Cannot edit completed item" : "Edit"}>
          <span>
            <IconButton
              onClick={() => handleOpenDialog(todo.id)}
              disabled={todo.completed}
              sx={{
                color: todo.completed ? "lightgray" : "blue",
              }}
            >
              <Edit />
            </IconButton>
          </span>
        </Tooltip>
      </TableCell>
    </TableRow>
  );
};

export default TableRowItem;
