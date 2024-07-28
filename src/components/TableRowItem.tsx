import { Delete, Edit } from "@mui/icons-material";
import {
  Checkbox,
  IconButton,
  TableCell,
  TableRow,
  Tooltip,
} from "@mui/material";
import { useDeleteTodoMutation } from "./hooks/useDeleteTodoMutation";
import { useCompleteTodoMutation } from "./hooks/useCompleteTodoMutation";
interface SingleTodo {
  id: string;
  title: string;
  description: string;
  voiceNote: string;
  completed: boolean;
}
interface TodoItemProp {
  todo: SingleTodo;
  handleOpenDialog: (id: string) => void;
}
const TableRowItem = ({ todo, handleOpenDialog }: TodoItemProp) => {
  const { mutate: deleteTodo } = useDeleteTodoMutation();
  const { mutate: completeTodo } = useCompleteTodoMutation();
  return (
    <TableRow
      key={todo.id}
      sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
    >
      <TableCell padding="checkbox">
        <Checkbox
          color="secondary"
          checked={todo.completed}
          onChange={() =>
            completeTodo({ id: todo.id, completed: !todo.completed })
          }
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
        <IconButton onClick={() => deleteTodo(todo.id)}>
          <Delete color="error" />
        </IconButton>
        <Tooltip title={todo.completed ? "Cannot edit completed item" : "Edit"}>
          <span>
            <IconButton
              onClick={() => handleOpenDialog(todo.id)}
              disabled={todo.completed}
              color={todo.completed ? "secondary" : "primary"}
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
