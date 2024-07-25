import {
  Box,
  Button,
  Dialog,
  DialogContent,
  DialogTitle,
  TextField,
  Typography,
} from "@mui/material";
import MicIcon from "@mui/icons-material/Mic";
import MicOffIcon from "@mui/icons-material/MicOff";
import React, { useEffect, useRef, useState } from "react";
import { addTodo, updateTodo } from "../features/todos/todoSlice";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../store";
interface todoDialogProps {
  open: boolean;
  handleClose: () => void;
  id?: string;
}
const TodoDialog = ({ open, handleClose, id }: todoDialogProps) => {
  const todos = useSelector((state: RootState) => state.todos.todos);
  console.log(todos, "in dailog");
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [isRecording, setIsRecording] = useState(false);
  const [audioURL, setAudioURL] = useState("");
  const [recordingTime, setRecordingTime] = useState(0);
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const audioChunksRef = useRef<Blob[]>([]);
  const intervalRef = useRef<number | null>(null);

  const dispatch = useDispatch();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (id) {
      dispatch(updateTodo({ title, description, id }));
    } else {
      dispatch(
        addTodo({
          title,
          description,
          completed: false,
          voiceNote: audioURL,
        })
      );
    }
    setTitle("");
    setDescription("");
    setAudioURL("");
    setRecordingTime(0);
    handleClose();
  };

  const handleStartRecording = async () => {
    if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      const mediaRecorder = new MediaRecorder(stream);
      mediaRecorderRef.current = mediaRecorder;
      mediaRecorder.ondataavailable = (event) => {
        audioChunksRef.current.push(event.data);
      };
      mediaRecorder.onstop = () => {
        const audioBlob = new Blob(audioChunksRef.current, {
          type: "audio/wav",
        });
        const audioURL = URL.createObjectURL(audioBlob);
        setAudioURL(audioURL);
        audioChunksRef.current = [];
      };
      mediaRecorder.start();
      setIsRecording(true);
    }
  };

  const handleStopRecording = () => {
    if (mediaRecorderRef.current) {
      mediaRecorderRef.current.stop();
      setIsRecording(false);
    }
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs < 10 ? "0" : ""}${secs}`;
  };

  useEffect(() => {
    if (id && open) {
      const findTodo = todos.find((todo) => todo?.id === id);
      if (findTodo) {
        setTitle(findTodo?.title);
        setDescription(findTodo?.description);
      }
    }
  }, [open]);

  useEffect(() => {
    if (isRecording) {
      intervalRef.current = setInterval(() => {
        setRecordingTime((prevTime) => prevTime + 1);
      }, 1000);
    } else {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
    }

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [isRecording]);
  return (
    <Dialog
      open={open}
      onClose={handleClose}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      <DialogTitle>{id ? "Edit" : "Add"} Todo</DialogTitle>
      <DialogContent>
        <form onSubmit={handleSubmit}>
          <TextField
            label="Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            fullWidth
            required
            margin="normal"
          />
          <TextField
            label="Description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            fullWidth
            required
            margin="normal"
          />

          {!id && (
            <>
              <Typography variant="subtitle1" sx={{ paddingY: "4px" }}>
                Do You Want To Record Something!!
              </Typography>
              {isRecording ? (
                <Button
                  variant="contained"
                  color="error"
                  onClick={handleStopRecording}
                >
                  Stop Recording
                  <MicOffIcon />
                </Button>
              ) : (
                <Button
                  variant="contained"
                  color="info"
                  onClick={handleStartRecording}
                >
                  Start Recording
                  <MicIcon />
                </Button>
              )}
            </>
          )}

          {isRecording && <p>Recording Time: {formatTime(recordingTime)}</p>}
          <Box sx={{ paddingY: "10px" }}>
            {audioURL && <audio controls src={audioURL} />}
          </Box>
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              paddingY: "5px",
            }}
          >
            <Button
              type="submit"
              variant="contained"
              color="primary"
              sx={{ width: "100%" }}
            >
              {id ? "Edit" : "Add"} Todo
            </Button>
          </Box>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default TodoDialog;
