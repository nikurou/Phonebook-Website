import React, { useEffect, useState } from 'react'
import phonebookService from './services/phonebookServices'
import Numbers from './components/Numbers'
import FilterSearch from './components/FilterSearch'
import PhoneBookForm from './components/PhoneBookForm'
import Notification from './components/Notification'
import './App.css'


const App = () => {
  const [ persons, setPersons ] = useState([]) 
  const [ newName, setNewName ] = useState('')
  const [ newNumber, setNewNumber] = useState('')
  const [ filter, setFilter ] = useState('')
  const [ notification, setNotification] = useState('')
  const [ notificationType, setNotifactionType ] = useState('')

  //Populate Persons with data from db.json
  useEffect(() => {
    phonebookService
      .getAll()
      .then(initialPeople => {
        setPersons(initialPeople)
      })
  }, [])

  //So that anytime the user alters the input the form, we update the value of newName 
  const handleNameChange = (event) => {
    setNewName(event.target.value)
  }

  const handleNumberChange = (event) => {
    setNewNumber(event.target.value)
  }

  const addPerson = (event) => {
    event.preventDefault() //Prevent reload of page
    const newPersonObject = {name: newName, number: newNumber} 

    //check if person is already in phonebook before adding

    if( persons.filter(p => p.name.toLowerCase().trim() === newPersonObject.name.toLowerCase().trim()).length === 1){ 
      if(window.confirm(`${newPersonObject.name} is already added to the phonebook, replace the old number with a new one?`)){
        replaceNumber(newPersonObject)
      }
    } else{
      setPersons(persons.concat(newPersonObject))
      phonebookService.create(newPersonObject)
      notify(`Added ${newPersonObject.name}`, 'add')
    }
    setNewName('')
    setNewNumber('')
  }

  const replaceNumber = (person) => {
    //The person object doesn't have an ID set, we must get the old one.
    const originalPersonObject = persons.find(element => element.name.toLowerCase().trim() === person.name.toLowerCase().trim())
    console.log('OGPERSONOBJ:',originalPersonObject)
    const id = originalPersonObject.id;
    const updatedPersonObject = {name: person.name, number: person.number, id: id}
    
    //Update the Database
    console.log(id, updatedPersonObject)
    phonebookService.update(id, updatedPersonObject)

    //We also have to update the original array
    let personCopy = JSON.parse(JSON.stringify(persons))
    personCopy[id-1] = updatedPersonObject
    setPersons(personCopy)
    notify(`Added ${updatedPersonObject.name}`, 'add')
  }

  const notify = (message, notificationType) => {
    setNotification(message)
    setNotifactionType(notificationType)
    setTimeout(()=>{
      setNotification('')
    },5000)
  }

  const handleFilterChange = (event) => {
    setFilter(event.target.value)
  }

  const handleDeleteUser = (personObject) => {
    if(window.confirm(`Delete ${personObject.name}?`)){

      phonebookService.remove(personObject.id).then(response => {
          setPersons( persons.filter(e => e !== personObject))
          notify(`Deleted ${personObject.name}`, 'success')
      }).catch(error=> {
             notify(`Information of ${personObject.name} has already been removed from server`, 'error')
      })
      
      // Axios.get('http://localhost:3001/persons/'+ personObject.id)
      //      .then(response => {console.log('success')})
      //      .catch(error => {
      //        notify(`Information of ${personObject.name} has already been removed from server`, 'error')
      //      })
      
      // Axios.delete('http://localhost:3001/persons/'+ personObject.id)
    }
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <Notification message = {notification} notificationType = {notificationType}/>
      <FilterSearch filter = {filter} handleFilterChange = {handleFilterChange}/>
      <h2>add a new</h2>
      <PhoneBookForm name = {newName} number = {newNumber} handleNameChange = {handleNameChange} addPerson = {addPerson} handleNumberChange = {handleNumberChange}/>
      <h2>Numbers</h2>
      <Numbers persons = {persons} filter = {filter} handleDeleteUser = {handleDeleteUser}/>
    </div>
  )
}



export default App

