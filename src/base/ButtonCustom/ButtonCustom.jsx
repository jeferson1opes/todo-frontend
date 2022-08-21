import * as React from "react";
import Button from "@mui/material/Button";
import { CircularProgress } from "@mui/material";

export default function ButtonCustom({
  loading,
  variant,
  text,
  onClick,
  color,
  type,
  ...others
}) {
  return (
    <Button
      {...others}
      variant={variant}
      color={color}
      disabled={loading}
      onClick={onClick}
      type={type ? type : null}
    >
      {loading ? (
        <CircularProgress style={{ height: 20, width: 20, color: "#1976d2" }} />
      ) : (
        text
      )}
    </Button>
  );
}
