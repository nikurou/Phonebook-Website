import React from "react";
import Paper from "@material-ui/core/Paper";
import { makeStyles } from "@material-ui/core/styles";
import IconButton from "@material-ui/core/IconButton";
import DeleteIcon from "@material-ui/icons/Delete";
import EditIcon from "@material-ui/icons/Edit";
import AccountCircleIcon from "@material-ui/icons/AccountCircle";
//Display of the phonebook contents

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    flexDirection: "column",
    width: "100%",
    fontFamily: "Courier New",
  },
  paperContainer: {
    margin: "0.5%",
    padding: "1%",
    backgroundColor: "rgb(183,183,183)",
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: "20px",
  },
  buttons: {},
  information: {
    display: "flex",
    width: "20%",
    flexDirection: "row",
    marginTop: "auto",
    marginBottom: "auto",
  },
  numberContainer: {
    marginTop: "auto",
    marginBottom: "auto",
    maxWidth: "25%",
  },
  nameText: {
    fontWeight: "bold",
    marginTop: "auto",
    marginBottom: "auto",
  },
  accountCircle: {
    paddingRight: "2%",
    height: "50px",
    width: "50px",
  },
}));

// [ Icon Name            number               [Edit] [Delete]]

const Numbers = ({ persons, filter, handleDeleteUser, handleEditUser }) => {
  const filteredArray = persons.filter((element) =>
    element.name.toLowerCase().includes(filter.toLowerCase())
  );

  const classes = useStyles();

  return (
    <div className={classes.root}>
      {filteredArray.map((person) => (
        <Paper
          elevation={10}
          key={person.name}
          className={classes.paperContainer}
        >
          <div className={classes.information}>
            <AccountCircleIcon className={classes.accountCircle} />
            <h3 className={classes.nameText}>{person.name}</h3>
          </div>
          <h3 className={classes.numberContainer}>{person.number}</h3>
          <div className={classes.buttons}>
            <IconButton onClick={() => handleEditUser(person)}>
              <EditIcon />
            </IconButton>
            <IconButton onClick={() => handleDeleteUser(person)}>
              <DeleteIcon />
            </IconButton>
          </div>
        </Paper>
      ))}
    </div>
  );
};

export default Numbers;
