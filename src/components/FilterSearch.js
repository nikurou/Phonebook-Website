import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import SearchIcon from "@material-ui/icons/Search";
import { useState } from "react";

const useStyles = makeStyles((theme) => ({
  searchOnFocus: {
    width: "100%",

    transition: "width .8s",
  },
  searchOnBlur: {
    width: "70%",

    transition: "width .8s",
  },
  searchBar: {
    padding: "2px 4px",
    display: "flex",
    alignItems: "center", //center vertically
    backgroundColor: "dimgray",
  },
  inputView: {
    width: "100%",
  },
  input: {
    marginLeft: theme.spacing(1),
    color: "white",
    backgroundColor: "dimgray",
    borderWidth: "0",
    border: "None",
    width: "85%",
    transition: "width .8s",
    "&:focus": { width: "85%", outline: "None" },
    "&::placeholder": { color: "white" },
  },
}));

const FilterSearch = ({ filter, handleFilterChange }) => {
  //whether or not textbar is focused on
  const [isInputFocused, setIsInputFocused] = useState(false);
  const classes = useStyles();

  return (
    <div
      className={isInputFocused ? classes.searchOnFocus : classes.searchOnBlur}
      tabIndex="1"
    >
      <Paper component="form" className={classes.searchBar}>
        <div className={classes.icon}>
          <SearchIcon style={{ color: "white" }} />
        </div>
        <div className={classes.inputView}>
          <input
            placeholder="Search..."
            className={classes.input}
            onFocus={() => setIsInputFocused(true)}
            onBlur={() => setIsInputFocused(false)}
            value={filter}
            onChange={handleFilterChange}
          />
        </div>
      </Paper>
    </div>
  );
};

export default FilterSearch;
