import AddIcCallIcon from "@material-ui/icons/AddIcCall";
import Button from "@material-ui/core/Button";
import React from "react";

const AddButton = ({ handleClickAdd }) => {
  return (
    <Button
      className="addButton"
      variant="contained"
      color="primary"
      startIcon={<AddIcCallIcon />}
      onClick={() => handleClickAdd()}
    >
      Add New
    </Button>
  );
};

export default AddButton;
