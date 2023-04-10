import { Alert, Snackbar } from "@mui/material";
import React, { Fragment } from "react";

export default function CustomSnack({ open, message, setOpen, noClose }) {
  return (
    <Fragment>
      {noClose ? (
        <Snackbar open={open} onClose={() => setOpen(false)}>
          <Alert
            onClose={() => setOpen(false)}
            severity={message.type ? message.type : "error"}
            action={
              message.action && message.type === "success" && message.action
            }
          >
            {message.text}
          </Alert>
        </Snackbar>
      ) : (
        <Snackbar
          open={open}
          autoHideDuration={6000}
          onClose={() => setOpen(false)}
        >
          <Alert
            onClose={() => setOpen(false)}
            severity={message.type ? message.type : "error"}
            action={
              message.action && message.type === "success" && message.action
            }
          >
            {message.text}
          </Alert>
        </Snackbar>
      )}
    </Fragment>
  );
}
