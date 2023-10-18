import { Label } from "@mui/icons-material";
import {
  Alert,
  AlertColor,
  Box,
  Button,
  Input,
  Snackbar,
  TextField,
} from "@mui/material";
import axios from "axios";
import { useRouter } from "next/router";
import { useState } from "react";
import { useSetRecoilState } from "recoil";
import { loginState, setUserInBrowserStorage } from "../state/loginState";

export const CreateUser = () => {
  const router = useRouter();
  const setLoginState = useSetRecoilState(loginState);
  // TODO: validate data
  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [retypedPassword, setRetypedPassword] = useState<string>("");
  const [email, setEmail] = useState<string>("");

  const [toastData, setToastData] = useState<{
    show: boolean;
    message: string;
    type: string;
  } | null>(null);

  const handleCreateUser = async () => {
    if (username.length == 0) return;
    const userId = await axios
      .post(`http://localhost:8080/createUser?username=${username}`, null)
      .then((res) => {
        setToastData({
          show: true,
          message: "User created successfully",
          type: "success",
        });
        setLoginState({ id: res.data.id, username: res.data.name });
        setUserInBrowserStorage(res.data.name, res.data.id);
        router.push("/");
      })
      .catch((error) => {
        setToastData({
          show: true,
          message: "Username already exists",
          type: "error",
        });
      });
  };

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
      }}
    >
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          width: 400,
          height: 400,
          borderRadius: "5%",
          backgroundColor: "#eddcb7",
          boxShadow:
            "rgba(0, 0, 0, 0.25) 0px 54px 55px, rgba(0, 0, 0, 0.12) 0px -12px 30px, rgba(0, 0, 0, 0.12) 0px 4px 6px, rgba(0, 0, 0, 0.17) 0px 12px 13px, rgba(0, 0, 0, 0.09) 0px -3px 5px",
        }}
      >
        <TextField
          value={username}
          id="username-input-field"
          label="Pick a username"
          variant="outlined"
          onChange={(e) => setUsername(e.target.value)}
        />
        <hr />
        <TextField
          value={email}
          id="email-input-field"
          label="email@domain.com"
          variant="outlined"
          onChange={(e) => setEmail(e.target.value)}
        />
        <hr />
        <TextField
          value={password}
          id="password-input-field"
          label="password"
          variant="outlined"
          onChange={(e) => setPassword(e.target.value)}
        />
        <hr />
        <TextField
          value={retypedPassword}
          id="password-input-field"
          label="retype password"
          variant="outlined"
          onChange={(e) => setRetypedPassword(e.target.value)}
        />
        <Button
          sx={{ marginTop: "20px" }}
          variant="contained"
          onClick={handleCreateUser}
        >
          Register now!
        </Button>
        <Snackbar
          open={toastData?.show}
          autoHideDuration={5000}
          onClose={(e) => setToastData(null)}
        >
          <Alert
            severity={toastData?.type as AlertColor}
            sx={{ width: "100%" }}
          >
            {toastData?.message}
          </Alert>
        </Snackbar>
      </Box>
    </div>
  );
};
