import React, { useEffect, useState } from "react";
import phonebookService from "./services/phonebookServices";
import Numbers from "./components/Numbers";
import FilterSearch from "./components/FilterSearch";
import PhoneBookForm from "./components/PhoneBookForm";
import Notification from "./components/Notification";
import { SnackbarProvider } from "notistack";

import "./App.css";
import AddButton from "./components/AddButton";

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState("");
  const [oldName, setOldName] = useState("");
  const [oldNumber, setOldNumber] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [filter, setFilter] = useState("");
  const [notification, setNotification] = useState("");
  const [notificationType, setNotifactionType] = useState("");
  const [openForm, setOpen] = useState(false);
  const [formType, setType] = useState("");

  //Populate Persons with data from db.json
  useEffect(() => {
    phonebookService.getAll().then((initialPeople) => {
      setPersons(initialPeople);
    });
  }, []);

  //So that anytime the user alters the input the form, we update the value of newName
  const handleNameChange = (event) => {
    setNewName(event.target.value);
  };

  const handleNumberChange = (event) => {
    setNewNumber(event.target.value);
  };

  const addPerson = (event) => {
    setOpen(false); //Close the dialog box!
    event.preventDefault(); //Prevent reload of page
    const newPersonObject = { name: newName, number: newNumber };
    //check if person is already in phonebook before adding
    if (
      persons.filter(
        (p) =>
          p.name.toLowerCase().trim() ===
          newPersonObject.name.toLowerCase().trim()
      ).length === 1 ||
      formType === "EDIT"
    ) {
      if (
        window.confirm(
          `You are about to alter ${newPersonObject.name}'s details. Confirm?`
        )
      ) {
        replaceDetails(newPersonObject);
      }
    } else {
      phonebookService
        .create(newPersonObject)
        .then((object) => setPersons(persons.concat(object)));
      notify(`Added ${newPersonObject.name}`, "add");
    }
    setNewName("");
    setNewNumber("");
    setOldName("");
    setOldNumber("");
  };

  const replaceDetails = (person) => {
    //The person object doesn't have an ID set, we must get the old one.
    var originalPersonObject = persons.find(
      (element) =>
        element.name.toLowerCase().trim() === person.name.toLowerCase().trim()
    );
    if (formType === "EDIT") {
      originalPersonObject = persons.find(
        (element) =>
          element.name.toLowerCase().trim() === oldName.toLowerCase().trim()
      );
    }
    console.log("OGPERSONOBJ:", originalPersonObject);
    const id = originalPersonObject.id;
    const updatedPersonObject = {
      name: person.name,
      number: person.number,
      id: id,
    };

    //Update the Database
    console.log(id, updatedPersonObject);
    phonebookService.update(id, updatedPersonObject);

    //We also have to update the original array
    let personCopy = JSON.parse(JSON.stringify(persons));
    personCopy[id - 1] = updatedPersonObject;
    setPersons(personCopy);
    notify(`Udpated ${updatedPersonObject.name}`, "replaced");
  };

  // Using Notification.js component
  const notify = (message, notificationType) => {
    setNotification(message);
    setNotifactionType(notificationType);
  };

  const handleFilterChange = (event) => {
    setFilter(event.target.value);
  };

  const handleDeleteUser = (personObject) => {
    if (window.confirm(`Delete ${personObject.name}?`)) {
      console.log(`ID = ${personObject.id}`);
      phonebookService
        .remove(personObject.id)
        .then((response) => {
          setPersons(persons.filter((e) => e !== personObject));
          notify(`Deleted ${personObject.name}`, "success");
        })
        .catch((error) => {
          notify(
            `Information of ${personObject.name} has already been removed from server`,
            "error"
          );
        });

      // Axios.get('http://localhost:3001/persons/'+ personObject.id)
      //      .then(response => {console.log('success')})
      //      .catch(error => {
      //        notify(`Information of ${personObject.name} has already been removed from server`, 'error')
      //      })

      // Axios.delete('http://localhost:3001/persons/'+ personObject.id)
    }
  };

  const handleEditUser = (personObject) => {
    setType("EDIT");
    if (openForm) {
      setOpen(false);
      setNewName("");
      setNewNumber("");
    } else {
      setOpen(true);
      setNewName(personObject.name);
      setNewNumber(personObject.number);
      setOldName(personObject.name);
      setOldNumber(personObject.number);
    }
  };

  //Close or Open the dialog box
  const handleClickAdd = () => {
    setType("ADD");
    setOpen(!openForm);
  };

  return (
    <SnackbarProvider maxSnack={3}>
      <div className="main">
        <h2 className="header">Phonebook</h2>

        <div className="horizontalHeader">
          <div className="addButton">
            <AddButton handleClickAdd={handleClickAdd}></AddButton>
          </div>
          <div className="searchBarGrowLeft">
            <FilterSearch
              filter={filter}
              handleFilterChange={handleFilterChange}
            />
          </div>
        </div>

        <PhoneBookForm
          name={newName}
          number={newNumber}
          handleNameChange={handleNameChange}
          addPerson={addPerson}
          handleNumberChange={handleNumberChange}
          handleClickAdd={handleClickAdd}
          handleEditUser={handleEditUser}
          open={openForm}
          formType={formType}
        />
        <h2>Contacts</h2>
        <div
          style={{ display: "flex", justifyContent: "center", width: "100%" }}
        >
          <Numbers
            persons={persons}
            filter={filter}
            handleDeleteUser={handleDeleteUser}
            handleEditUser={handleEditUser}
          />
        </div>
        <Notification
          message={notification}
          notificationType={notificationType}
        />
      </div>
    </SnackbarProvider>
  );
};

export default App;
