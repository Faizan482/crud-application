import { useState } from "react";
import { Button } from "@mui/material";

import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";

import TodoDialog from "./TodoDialog";
const AddTodoForm = () => {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  return (
    <>
      <Box
        sx={{
          margin: 2,
          display: "flex",
          justifyContent: "space-between",
          paddingBottom: "6px",
          borderBottom: "1px solid gray",
        }}
      >
        <Typography variant="h6" noWrap>
          List Of Items
        </Typography>
        <Typography>
          <Button variant="contained" color="secondary" onClick={handleOpen}>
            Add New Todo
          </Button>
        </Typography>
      </Box>

      <TodoDialog open={open} handleClose={handleClose} />
    </>
  );
};

export default AddTodoForm;
