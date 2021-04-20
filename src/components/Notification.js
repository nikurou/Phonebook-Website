import React, { useEffect } from "react";
import { useSnackbar } from "notistack";
import { Button } from "@material-ui/core";

const Notification = ({ message, notificationType }) => {
  const { enqueueSnackbar } = useSnackbar();

  //A map of all the notification types to their respective variant colors for snackbar
  const notifDict = {
    add: "success",
    replaced: "success",
    success: "error",
    error: "error",
  };

  useEffect(() => {
    if (message !== "")
      enqueueSnackbar(message, { variant: notifDict[notificationType] });
  }, [message, notificationType]);

  return <div />;
};

export default Notification;
