import React from "react";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import { makeStyles } from "@material-ui/core/styles";
import AddForm from "./AddForm";
import EditForm from "./EditForm";

const useStyles = makeStyles({
  root: {
    color: "rgb(183,183,183)",
  },
  rootInput: {
    color: "white",
    "& label.Mui-focused": {
      color: "rgb(144,202,249)",
    },
    "& label": {
      color: "rgb(183,183,183)",
    },
    "& .MuiInput-underline:after": {
      borderBottomColor: "rgb(144,202,249)",
    },
    "& .MuiInput-underline:before": {
      borderBottomColor: "rgb(183,183,183)",
    },
  },
  inputTextColor: {
    color: "white",
  },
  horizontalTextField: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
  },
  rootButton: {
    "& .MuiButton-label ": {
      color: "rgb(144,202,249)",
    },
  },
});

//Component to handle input of new person
const PhoneBookForm = ({
  name,
  number,
  handleNameChange,
  addPerson,
  handleNumberChange,
  open,
  handleClickAdd,
  handleEditUser,
  formType, //"ADD" or "EDIT"
}) => {
  if (formType === "ADD") {
    return (
      <AddForm
        name={name}
        number={number}
        handleNameChange={handleNameChange}
        addPerson={addPerson}
        handleNumberChange={handleNumberChange}
        open={open}
        handleClickAdd={handleClickAdd}
      ></AddForm>
    );
  }
  return (
    <EditForm
      name={name}
      number={number}
      handleNameChange={handleNameChange}
      addPerson={addPerson}
      handleNumberChange={handleNumberChange}
      open={open}
      handleClickAdd={handleClickAdd}
      handleEditUser={handleEditUser}
    ></EditForm>
  );
};

export default PhoneBookForm;
