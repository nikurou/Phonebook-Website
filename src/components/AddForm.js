import React from "react";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import { makeStyles } from "@material-ui/core/styles";

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

const AddForm = ({
  name,
  number,
  handleNameChange,
  addPerson,
  handleNumberChange,
  open,
  handleClickAdd,
}) => {
  const classes = useStyles();
  return (
    <Dialog
      open={open}
      onClose={handleClickAdd}
      aria-labelledby="form-dialog-title"
      PaperProps={{
        style: { backgroundColor: "rgb(66,66,66)", color: "rgb(144,202,249)" },
      }}
    >
      <DialogTitle id="form-dialog-title">Add a Contact</DialogTitle>
      <DialogContent>
        <DialogContentText classes={{ root: classes.root }}>
          To add a contact, please enter the contact's name and number. You may
          also update contact information by re-entering the contact's name.
        </DialogContentText>
        <div className={classes.horizontalTextField}>
          <TextField
            classes={{ root: classes.rootInput }}
            InputProps={{ className: classes.inputTextColor }}
            autoFocus
            margin="dense"
            id="filled-basic"
            label="Name"
            value={name}
            onChange={handleNameChange}
          />
          <TextField
            classes={{ root: classes.rootInput }}
            InputProps={{ className: classes.inputTextColor }}
            autoFocus
            margin="dense"
            id="filled-basic"
            label="Number"
            value={number}
            onChange={handleNumberChange}
          />
        </div>
      </DialogContent>
      <DialogActions>
        <Button
          classes={{ root: classes.rootButton }}
          onClick={handleClickAdd}
          color="primary"
        >
          Cancel
        </Button>
        <Button
          classes={{ root: classes.rootButton }}
          onClick={addPerson}
          color="primary"
        >
          Add
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default AddForm;
