import React from'react';

const PhoneBookForm = ({name, number, handleNameChange, addPerson, handleNumberChange}) => {
    return(
        <form onSubmit = {addPerson}>
          <div>
            name: <input value = {name} onChange = {handleNameChange} /> <br/>
            number: <input value = {number} onChange = {handleNumberChange}/>
          </div>
          <div>
            <button type="submit" >add</button>
          </div>
        </form>
    )
  }

  export default PhoneBookForm