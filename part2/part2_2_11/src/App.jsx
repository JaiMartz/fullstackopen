import { useState, useEffect, use } from 'react'
import axios from 'axios'

const App = () => {
  const [persons, setPersons] = useState([])
/*
[
    { name: 'Arto Hellas', number: '040-123456', id: 1 },
    { name: 'Ada Lovelace', number: '39-44-5323523', id: 2 },
    { name: 'Dan Abramov', number: '12-43-234345', id: 3 },
    { name: 'Mary Poppendieck', number: '39-23-6423122', id: 4 }
  ]
*/
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [filter, setFilter] = useState('')

  useEffect(() => {
    console.log('effect');
    axios.get('http://localhost:3001/persons')
    .then(response => {
      console.log('promise fulfilled');
      setPersons(response.data)
    })
  }, [])

  const handleNewName = (event) => {
    console.log(event.target.value);
    setNewName(event.target.value);
  }

  const handleNewNumber = (event) => {
    console.log(event.target.value);
    setNewNumber(event.target.value);
  }

  const handleFilter = (event) => {
    console.log(event.target.value);
    setFilter(event.target.value);
  }

  const addPerson = (event) => {
    console.log(event.target.value);
    event.preventDefault()

    if(persons.find(person => person.name === newName)){
      alert(`${newName} is already added to phonebook`)
    } else {
      const personObject = {
        name: newName,
        number: newNumber
      }

      setPersons(persons.concat(personObject))
      setNewName('')
      setNewNumber('')
    }
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter filter={filter} handleFilter={handleFilter}/>
      <PersonForm addPerson={addPerson} newName={newName} handleNewName={handleNewName} newNumber={newNumber} handleNewNumber={handleNewNumber}/>
      <h2>Numbers</h2>
      <Persons persons={persons} filter={filter}/>
    </div>
  )
}

// helper functions
  const filteredPersons = (persons, filter) =>{
    if(filter === null || filter === ''){
      return persons.map(person =><Display key={person.id} name={person.name} number={person.number}/>)
    } else {
      return persons.filter(person => person.name.toLowerCase().includes(filter.toLowerCase())).map(person =><Display key={person.id} name={person.name} number={person.number}/>)
    }
  }

const Persons = ({persons, filter}) => {
  return (
      <ul>
        {filteredPersons(persons, filter) }
      </ul>
  )
}

const PersonForm = ({addPerson, newName, handleNewName, newNumber, handleNewNumber}) => {
  return (
    <form onSubmit={addPerson}>
      <h2>Add a new</h2>
      <div>
        name: <input value={newName} onChange={handleNewName}/>
      </div>
      <div>
        number: <input value={newNumber} onChange={handleNewNumber}/>
      </div>
      <div>
        <button type="submit">add</button>
      </div>
    </form>
  )
}

const Filter = ({filter, handleFilter}) => {
  return (
    <div>
      filter shown with: <input value={filter} onChange={handleFilter}/>
    </div>
  )
}

const Display = ({name, number}) => {
  return (
    <li>{name}: {number}</li>
  )
}

export default App