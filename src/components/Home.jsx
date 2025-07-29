import { Box } from "@mui/material";
import AuthForm from "./AuthForm";

function Home() {
  return (
    <Box
      display="flex"
      justifyContent="center"
      alignItems="center"
      minHeight="100vh"
      bgcolor="#f0f0f0"
    >
      <AuthForm />
    </Box>
  );
}

export default Home;
