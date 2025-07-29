import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { Box, Button, TextField, Typography, Link, Paper } from "@mui/material";
import * as Yup from "yup";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { login, signup } from "../redux/services/authService";
import toast from "react-hot-toast";

// Form Validation schema using Yup
const signupSchema = Yup.object().shape({
  name: Yup.string().required("Name is required"),
  phone: Yup.string().required("Phone is required"),
  email: Yup.string().email("Invalid email").required("Email is required"),
  password: Yup.string()
    .min(6, "Password must be at least 6 characters")
    .required("Password is required"),
});

const loginSchema = Yup.object().shape({
  email: Yup.string().email("Invalid email").required("Email is required"),
  password: Yup.string().required("Password is required"),
});

const AuthForm = () => {
  const [isLogin, setIsLogin] = useState(true);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(isLogin ? loginSchema : signupSchema),
  });

  useEffect(() => {
    reset();
  }, [isLogin, reset]);

  const onSubmit = async (data) => {
    let res;
    if (isLogin) {
      const payload = {
        email: data.email,
        password: data.password,
      };

      res = await dispatch(login(payload));
      if (res?.payload?.statusCode === 200) {
        toast.success(res?.payload?.message);
        if (res?.payload?.token) {
          localStorage.setItem("token", res?.payload?.token);
          localStorage.setItem("user", JSON.stringify(res?.payload?.user));
          navigate("/todoitem");
        }
      }
    } else {
      const payload = {
        email: data.email,
        password: data.password,
        phone: data.phone,
        name: data.name,
      };
      dispatch(signup(payload));
      if (res?.payload?.statusCode === 200) {
        toast.success(res?.payload?.message);
      }
    }
    reset();
  };

  return (
    <Paper
      elevation={5}
      sx={{
        padding: 4,
        width: 400,
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        minHeight: isLogin ? 300 : 430,
        transition: "min-height 0.3s ease-in-out",
        borderRadius: 3,
        background: "linear-gradient(135deg, #e3f2fd, #e0f7fa)",
        boxShadow: "0px 4px 20px rgba(0,0,0,0.2)",
      }}
    >
      <Box>
        <Typography
          variant="h5"
          align="center"
          gutterBottom
          sx={{ fontWeight: 600, color: "#1976d2" }}
        >
          {isLogin ? "Login" : "Sign Up"}
        </Typography>

        <form onSubmit={handleSubmit(onSubmit)} noValidate>
          <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
            {!isLogin && (
              <>
                <TextField
                  fullWidth
                  label="Name"
                  {...register("name")}
                  error={!!errors.name}
                  helperText={errors.name?.message}
                />
                <TextField
                  fullWidth
                  label="Phone"
                  {...register("phone")}
                  error={!!errors.phone}
                  helperText={errors.phone?.message}
                />
              </>
            )}

            <TextField
              fullWidth
              label="Email"
              type="email"
              {...register("email")}
              error={!!errors.email}
              helperText={errors.email?.message}
            />

            <TextField
              fullWidth
              label="Password"
              type="password"
              {...register("password")}
              error={!!errors.password}
              helperText={errors.password?.message}
            />
          </Box>

          <Box mt={3}>
            <Button
              variant="contained"
              type="submit"
              fullWidth
              sx={{
                background: "linear-gradient(45deg, #2196F3 30%, #21CBF3 90%)",
                color: "white",
                fontWeight: "bold",
                paddingY: 1.2,
                "&:hover": {
                  background:
                    "linear-gradient(45deg, #1976D2 30%, #1DE9B6 90%)",
                },
              }}
            >
              {isLogin ? "Login" : "Sign Up"}
            </Button>
          </Box>
        </form>
      </Box>

      <Box mt={4} textAlign="center">
        <Typography variant="body2">
          {isLogin ? "Don't have an account?" : "Already have an account?"}{" "}
          <Link
            href="#"
            onClick={() => setIsLogin(!isLogin)}
            underline="hover"
            sx={{ fontWeight: 600 }}
          >
            {isLogin ? "Sign Up" : "Login"}
          </Link>
        </Typography>
      </Box>
    </Paper>
  );
};

export default AuthForm;
