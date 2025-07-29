import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { ReactTyped } from "react-typed";
import {
  Box,
  Button,
  Container,
  Paper,
  TextField,
  Typography,
  ToggleButton,
  ToggleButtonGroup,
  Toolbar,
  Stack,
  IconButton,
  Checkbox,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import AddIcon from "@mui/icons-material/Add";
import CloseIcon from "@mui/icons-material/Close";
import {
  getTodoAsync,
  todoCreateAsync,
  updateTodoAsync,
  deleteTodoAsync,
  updateStatusTask,
} from "../redux/services/todoService";
import toast from "react-hot-toast";
import * as Yup from "yup";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";

const todoSchema = Yup.object().shape({
  title: Yup.string().required("Title is required"),
});

const TodoItem = () => {
  const [filter, setFilter] = useState("all");
  const [editId, setEditId] = useState(null);
  const [editTitle, setEditTitle] = useState("");
  const inputRef = useRef();

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { todo, active, completed, total } = useSelector((state) => state.todo);

  const handleFilterChange = (event, newFilter) => {
    if (newFilter !== null) {
      setFilter(newFilter);
    }
  };

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(todoSchema),
  });

  const onSubmit = async (data) => {
    const payload = {
      title: data.title,
    };
    const res = await dispatch(todoCreateAsync(payload));
    if (res?.payload?.statusCode === 200) {
      toast.success(res?.payload?.message);
      reset();
      dispatch(getTodoAsync());
    }
  };

  const handleDelete = async (id) => {
    const res = await dispatch(deleteTodoAsync(id));
    if (res?.payload?.statusCode === 200) {
      toast.success(res?.payload?.message);
      dispatch(getTodoAsync());
    } else {
      toast.error("Failed to delete task");
    }
  };

  const handleEdit = (item) => {
    setEditId(item._id);
    setEditTitle(item.title);
    setTimeout(() => inputRef.current?.focus(), 0);
  };

  const handleSave = async () => {
    const res = await dispatch(
      updateTodoAsync({ id: editId, title: editTitle })
    );
    if (res?.payload?.statusCode === 200) {
      toast.success(res?.payload?.message);
      setEditId(null);
      setEditTitle("");
      dispatch(getTodoAsync());
    } else {
      toast.error("Failed to update task");
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    toast.success("Logged out successfully!");
    navigate("/");
  };

  const handleToggleStatus = async (item) => {
    console.log("id", item?._id);
    const payload = {
      status: item?.status === "active" ? "completed" : "active",
    };
    let res;

    res = await dispatch(updateStatusTask({ id: item._id, data: payload }));

    if (res?.payload?.statusCode === 200) {
      toast.success(res?.payload?.message);
      dispatch(getTodoAsync());
    }

    console.log("payload", payload);
  };

  useEffect(() => {
    dispatch(getTodoAsync());
  }, [dispatch]);

  return (
    <Box
      sx={{
        background: "linear-gradient(to bottom right, #e0eafc, #cfdef3)",
        minHeight: "100vh",
        width: "100%",
        py: 8,
      }}
    >
      <Container maxWidth="md">
        <Typography variant="h3" align="center" fontWeight={700} gutterBottom>
          <Toolbar sx={{ display: "flex", justifyContent: "space-between" }}>
            <Typography variant="h6" component="div">
              <ReactTyped
                strings={[
                  '<span style="color:#e11d48">Welcome to My ToDo App...</span>',
                  '<span style="color:#2563eb">Organize Your Day, Effortlessly...</span>',
                  '<span style="color:#16a34a">Track Tasks. Stay Focused. Be Productive.</span>',
                  '<span style="color:#f97316">Add, Edit, and Complete Your Tasks with Ease</span>',
                  '<span style="color:#9333ea">Smart Planning for a Smarter You...</span>',
                  '<span style="color:#059669">Your Daily Goals, Just a Click Away...</span>',
                  '<span style="color:#7c3aed">Make Every Day Count with ToDo!</span>',
                  '<span style="color:#f43f5e">Simple. Fast. Effective Task Management.</span>',
                ]}
                typeSpeed={100}
                backSpeed={80}
                loop={true}
                showCursor={false}
              />
            </Typography>
            <Button
              variant="outlined"
              color="error"
              onClick={handleLogout}
              sx={{ ml: 2, textTransform: "none" }}
            >
              Logout
            </Button>
          </Toolbar>
        </Typography>

        {/* Add Task Input */}
        <form onSubmit={handleSubmit(onSubmit)} noValidate>
          <Paper
            sx={{
              p: 2,
              mt: 4,
              display: "flex",
              alignItems: "center",
              borderRadius: 3,
              boxShadow: 3,
            }}
          >
            <TextField
              fullWidth
              placeholder="What needs to be done?"
              variant="outlined"
              {...register("title")}
              error={!!errors.title}
              helperText={errors.title?.message}
              sx={{ backgroundColor: "#fff", borderRadius: 2 }}
            />
            <Button
              variant="contained"
              startIcon={<AddIcon />}
              type="submit"
              sx={{
                ml: 2,
                background: "linear-gradient(to right, #8e2de2, #4a00e0)",
                borderRadius: 2,
                px: 3,
              }}
            >
              Add
            </Button>
          </Paper>
        </form>

        {/* Stats Section */}
        <Box sx={{ display: "flex", gap: 2, mt: 4 }}>
          {[
            { label: "Total", value: total || 0 },
            { label: "Active", value: active || 0, color: "orange" },
            { label: "Completed", value: completed || 0, color: "green" },
          ].map((stat, index) => (
            <Paper
              key={index}
              sx={{
                flex: 1,
                p: 2,
                textAlign: "center",
                borderRadius: 3,
                boxShadow: 2,
              }}
            >
              <Typography variant="h6" color={stat.color || "text.primary"}>
                {stat.value}
              </Typography>
              <Typography
                variant="body1"
                fontWeight={"bold"}
                color="text.secondary"
              >
                {stat.label}
              </Typography>
            </Paper>
          ))}
        </Box>

        {/* Filter */}
        <ToggleButtonGroup
          color="primary"
          value={filter}
          exclusive
          onChange={handleFilterChange}
          fullWidth
          sx={{ mt: 4 }}
        >
          <ToggleButton
            value="all"
            sx={{
              textTransform: "none",
              background:
                filter === "all"
                  ? "linear-gradient(to right, #8e2de2, #4a00e0)"
                  : "transparent",
              color: filter === "all" ? "#fff" : "inherit",
              "&.Mui-selected": {
                color: "#fff",
                background: "linear-gradient(to right, #8e2de2, #4a00e0)",
              },
            }}
          >
            All
          </ToggleButton>
          <ToggleButton value="active">Active</ToggleButton>
          <ToggleButton value="completed">Completed</ToggleButton>
        </ToggleButtonGroup>

        {/* Task List */}
        <Paper
          sx={{
            mt: 4,
            py: 4,
            px: 2,
            textAlign: "center",
            borderRadius: 3,
            boxShadow: 1,
          }}
        >
          {todo?.length > 0 ? (
            <Box sx={{ maxHeight: 300, overflowY: "auto", pr: 1 }}>
              {todo.map((item) => {
                if (
                  (filter === "active" && item.status === "completed") ||
                  (filter === "completed" && item.status !== "completed")
                ) {
                  return null;
                }

                return (
                  <Paper
                    key={item._id}
                    elevation={1}
                    sx={{
                      mb: 1,
                      px: 2,
                      py: 1,
                      borderRadius: 2,
                      bgcolor: "#f9f9f9",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "space-between",
                    }}
                  >
                    <Box
                      sx={{ display: "flex", alignItems: "center", flex: 1 }}
                    >
                      <Checkbox
                        checked={item.status === "completed"}
                        onChange={() => handleToggleStatus(item)}
                        sx={{ mr: 1 }}
                      />

                      {editId === item._id ? (
                        <TextField
                          inputRef={inputRef}
                          value={editTitle}
                          onChange={(e) => setEditTitle(e.target.value)}
                          onKeyDown={(e) => {
                            if (e.key === "Enter") handleSave();
                          }}
                          variant="outlined"
                          size="small"
                          sx={{ flex: 1, backgroundColor: "#fff" }}
                        />
                      ) : (
                        <Typography
                          variant="body1"
                          sx={{
                            textDecoration:
                              item.status === "completed"
                                ? "line-through"
                                : "none",
                          }}
                        >
                          {item.title}
                        </Typography>
                      )}
                    </Box>

                    <Stack direction="row" spacing={1}>
                      {editId === item._id ? (
                        <>
                          <IconButton onClick={handleSave}>
                            <AddIcon sx={{ color: "green" }} />
                          </IconButton>
                          <IconButton onClick={() => setEditId(null)}>
                            <CloseIcon sx={{ color: "red" }} />
                          </IconButton>
                        </>
                      ) : (
                        <>
                          <IconButton onClick={() => handleEdit(item)}>
                            <EditIcon color="primary" />
                          </IconButton>
                          <IconButton onClick={() => handleDelete(item._id)}>
                            <DeleteIcon color="error" />
                          </IconButton>
                        </>
                      )}
                    </Stack>
                  </Paper>
                );
              })}
            </Box>
          ) : (
            <>
              <Typography variant="h6">🎉</Typography>
              <Typography>No tasks yet. Add one above!</Typography>
            </>
          )}
        </Paper>
      </Container>
    </Box>
  );
};

export default TodoItem;
