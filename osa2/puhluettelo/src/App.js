import { useState, useEffect } from 'react'
import personService from './services/persons'

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

const Notification = ({message}, {type}) => {
  if (message === null) {
    return null
  }
  return (
    <div className='notif'>
      {message}
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
  const [message, setMessage] = useState(null)
  const [type, setType] = useState('error')

  useEffect(() => {
    personService
    .getAll()
    .then(initialPersons => {
      setPersons(initialPersons)
      })
  }, [])

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
      setType('error')
      setMessage('Nimi ' + newName + ' löytyy jo luettelosta')
      setNewName('')
      setNewNumber('')
      setTimeout(() => {
        setMessage(null)
        setType(null)
      }, 4000)
    } else {
      setType('added')
      //setPersons(persons.concat(personObject))
      setMessage('Nimi ' + newName + ' lisätty luetteloon!')
      personService
      .create(personObject)
      .then(returnedPerson => {
        setPersons(persons.concat(returnedPerson))
        setNewName('')
        setNewNumber('')
      })
      .catch(error => {
        setType('error')
        setMessage('' + error.response.data.error)
      })
      setTimeout(() => {
        setMessage(null)
        setType(null)
      }, 4000)
    }
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <Notification message={message} type={type} />
      <Personform handleInput={handleInput} handleNumber={handleNumber} addPerson={addPerson} newName={newName} newNumber={newNumber}/>
      <h2>Numbers</h2>
      <Persons persons={persons}/>
    </div>
  )

}

export default App
