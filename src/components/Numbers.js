import React from "react";

//Display of the phonebook contents

const Numbers = ({ persons, filter, handleDeleteUser }) => {
  const filteredArray = persons.filter((element) =>
    element.name.toLowerCase().includes(filter.toLowerCase())
  );

  return (
    <div>
      {filteredArray.map((person) => (
        <div key={person.name}>
          <span>
            {person.name} {person.number}
          </span>
          <button onClick={() => handleDeleteUser(person)}> Delete </button>
          <br />
        </div>
      ))}
    </div>
  );
};

export default Numbers;
