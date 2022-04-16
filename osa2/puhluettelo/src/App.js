import { useState } from 'react'

const Personform = (props) => {
  return (
    <div>
    <form onSubmit={props.addPerson}>
        <div>
          name: <input 
          value={props.newName}
          onChange={props.handleInput}/>
          number: <input
          value={props.newNumber}
          onChange={props.handleNumber}/>
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
    </div>
  )
}

const Person = (props) => {
  return (
    <div>
    nimi: {props.name} numero: {props.number}
    </div>
  )
}

const Persons = ({persons}) => {
  return (
    <div>
    {persons.map(person =>
      <li
        key={person.name}>
          <Person name={person.name} number={person.number}/>
      </li>
      )}
    </div>
  )
}

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas',
      number: '0401239110' }
  ]) 
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')

  const handleInput = (event) => {
    console.log(event.target.value)
    setNewName(event.target.value)
  }

  const handleNumber = (event) => {
    console.log(event.target.value)
    setNewNumber(event.target.value)
  }


  const addPerson = (event) => { 
    event.preventDefault()
    const personObject = {
      name: newName,
      number: newNumber
    }

    var found = false;
    for(var i = 0; i < persons.length; i++) {
      if (persons[i].name === newName) {
        found = true;
        break;
    }
}
    if (found === true) {
      alert(newName + ' löytyy jo luettelosta')
    } else {
      setPersons(persons.concat(personObject))
      setNewName('')
      setNewNumber('')
    }
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <Personform handleInput={handleInput} handleNumber={handleNumber} addPerson={addPerson} newName={newName} newNumber={newNumber}/>
      <h2>Numbers</h2>
      <Persons persons={persons}/>
    </div>
  )

}

export default App
