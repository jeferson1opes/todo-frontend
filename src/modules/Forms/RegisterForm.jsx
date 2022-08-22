import { useState } from "react";
import { Formik } from "formik";

import authService from "../../core/services/authService";

import { toast } from "react-toastify";
import { TextField } from "@mui/material";
import ButtonCustom from "../../base/ButtonCustom/ButtonCustom";
import ToastContainerCustom from "../../base/ToastContainer";

export default function RegisterForm({ viewLogin }) {
  const [loading, setLoading] = useState(false);
  const notify = (messagem, type) => toast(messagem, { type: type });

  const handleSubmit = async ({ username, name, password }) => {
    setLoading(true);
    try {
      await authService.register({ username, name, password });
      notify("Account created successfully", "success");
    } catch (error) {
      notify(error.response.data.message, "error");
    }
    setLoading(false);
  };

  return (
    <>
      <Formik
        initialValues={{ username: "", name: "", password: "" }}
        onSubmit={handleSubmit}
      >
        {({ values, handleChange, handleSubmit }) => (
          <form onSubmit={handleSubmit} className="w-25 p-3">
            <TextField
              margin="normal"
              fullWidth
              name="username"
              required
              id="outlined-required"
              label="UserName"
              value={values.username}
              type="text"
              onChange={handleChange}
            />

            <TextField
              margin="normal"
              fullWidth
              required
              name="name"
              id="outlined-required"
              label="Name"
              value={values.name}
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
              text="Register"
            />
            <ButtonCustom
              style={{ marginTop: "10px", width: "100%" }}
              variant="outlined"
              onClick={viewLogin}
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
