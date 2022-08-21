import { TextField } from "@mui/material";
import { Formik } from "formik";
import { useState } from "react";
import { toast } from "react-toastify";
import useAuth from "../../core/auth/useAuth";
import authService from "../../core/services/authService";

import ButtonCustom from "../../base/ButtonCustom/ButtonCustom";
import ToastContainerCustom from "../../base/ToastContainer";

export default function LoginForm({ viewRegister }) {
  const { login } = useAuth();
  const [loading, setLoading] = useState(false);

  const notify = (messagem, type) => toast(messagem, { type: type });

  const handleSubmit = async ({ username, password }) => {
    setLoading(true);
    try {
      const response = await authService.login({ username, password });
      notify(`Welcome ${username}`, "success");
      login(response.data);
    } catch (error) {
      notify(error.response.data.message, "error");
    }
    setLoading(false);
  };

  return (
    <>
      <Formik
        initialValues={{ username: "", password: "" }}
        onSubmit={handleSubmit}
      >
        {({ values, handleChange, handleSubmit }) => (
          <form onSubmit={handleSubmit} className="w-25 p-3">
            <TextField
              margin="normal"
              fullWidth
              required
              name="username"
              id="outlined-required"
              label="Name"
              value={values.username}
              onChange={handleChange}
            />
            <TextField
              margin="normal"
              fullWidth
              required
              id="outlined-required"
              label="Password"
              type="password"
              name="password"
              value={values.password}
              onChange={handleChange}
            />
            <ButtonCustom
              variant="contained"
              loading={loading}
              type="submit"
              text="Login"
            />
            <ButtonCustom
              style={{ marginTop: "10px", width: "100%" }}
              variant="outlined"
              onClick={viewRegister}
              type="submit"
              text="Already have an account?"
            />
          </form>
        )}
      </Formik>
      <ToastContainerCustom />
    </>
  );
}
