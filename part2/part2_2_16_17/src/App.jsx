import { useState, useEffect } from 'react'
import personsService from './services/PersonsService'
import Notification from './components/Notification'
import './index.css'

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
  const [notificationMessage, setNotificationMessage] = useState(null)


  
  useEffect(() => {
    console.log('effect')
    personsService.getAll()
    .then(initialPersons => {
        setPersons(initialPersons)
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
      confirm(`${newName} is already added to phonebook, replace the old number with a new one?`) 
      && personsService
      .update(persons.find(person=> person.name === newName).id, {name: newName, number: newNumber})
      .then(updatedPerson => {
        setPersons(persons.map(person => person.name !== newName ? person : updatedPerson))
        setNotificationMessage(
          `'${newName}' was added to server`
        )
        setTimeout(() => {
          setNotificationMessage(null)
        }, 5000)
      })
    } else {
      const personObject = {
        name: newName,
        number: newNumber
      }

      personsService.create(personObject)
      .then(createdPerson => {
        setPersons(persons.concat(createdPerson))
        setNewName('')
        setNewNumber('')
      })
      setNotificationMessage(
        `'${newName}' was added to server`
      )
      setTimeout(() => {
        setNotificationMessage(null)
      }, 5000)

    }

    setNotificationMessage(
      `'${newName}' was added to server`
    )
    setTimeout(() => {
      setNotificationMessage(null)
    }, 5000)
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <Notification message={notificationMessage} />
      <Filter filter={filter} handleFilter={handleFilter}/>
      <PersonForm addPerson={addPerson} newName={newName} handleNewName={handleNewName} newNumber={newNumber} handleNewNumber={handleNewNumber}/>
      <h2>Numbers</h2>
      <Persons persons={persons} filter={filter} setNotificationMessage={setNotificationMessage}/>
    </div>
  )
}

// helper functions
  const filteredPersons = (persons, filter, setNotificationMessage) =>{
    if(filter === null || filter === ''){
      return persons.map(person =><Display 
        key={person.id} 
        name={person.name} 
        number={person.number} 
        id={person.id} 
        setNotificationMessage={setNotificationMessage}/>)
    } else {
      return persons.filter(person => person.name.toLowerCase().includes(filter.toLowerCase())).map(person =><Display key={person.id} name={person.name} number={person.number} id={person.id}/>)
    }
  }

const Persons = ({persons, filter, setNotificationMessage}) => {
  return (
      <ul>
        {filteredPersons(persons, filter, setNotificationMessage) }
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

const Display = ({name, number, id, setNotificationMessage}) => {
  return (
    <li>{name}: {number} <DeleteButton id={id} newName={name} setNotificationMessage={setNotificationMessage}/></li>
  )
}

const DeleteButton = ({id, newName, setNotificationMessage}) => {
  const handleDelete = () => {
    confirm(`Delete '${id}'?`) && personsService.deletePerson(id).then(() => {
      window.location.reload()
    }).catch(error => {
      console.log(error)
        setNotificationMessage(
          `Information of '${newName}' has already been removed from server`
        )
        setTimeout(() => {
          setNotificationMessage(null)
        }, 5000)
    })
  }
  return (
  <button onClick={handleDelete}>delete</button>
  )
}

export default App