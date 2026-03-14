import { useState } from 'react'

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas'}
  ]) 
  const [newName, setNewName] = useState('')

  const handleNewName = (event) => {
    console.log(event.target.value);
    setNewName(event.target.value);
  }

  const addPerson = (event) => {
    console.log(event.target.value);
    event.preventDefault()
    const personObject = {
      name: newName,
      id: persons.length +1
    }

    setPersons(persons.concat(personObject))
    setNewName('')

  }

  return (
    <div>
      <h2>Phonebook</h2>
      <div>debug: {newName}</div>
      <form onSubmit={addPerson}>
        <div>
          name: <input value={newName} onChange={handleNewName}/>
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      <ul>
        {persons.map(person => 
        <Display key={person.name} name={person.name}/>
        )}
      </ul>
    </div>
  )
}

const Display = ({name}) => {
  return (
    <li>{name}</li>
  )
}

export default App