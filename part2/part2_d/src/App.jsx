import { useState, useEffect } from 'react'
import axios from 'axios'
import Note from './components/Note'
import noteService from './services/notes'


const App = () => {
  const [notes, setNotes] = useState([])
  const [newNote, setNewNote] = useState('')
  const [showAll, setShowAll] = useState(true)

  // is called when the component is mounted, 
  // and the empty array as the second argument ensures that the effect is only run once, 
  // when the component is first rendered.
  useEffect(() => {
    console.log('effect');
    noteService
      .getAll()
      .then(initialNotes => {
        setNotes(initialNotes)
      })
  }, [])

  //TODO: Seguimos por el punto 'Extraer la comunicación con el backend en un módulo separado' 
  // importante noteService

  console.log('render', notes.length, 'notes');


  const addNote = (event) => {
    event.preventDefault();
    console.log('button clicker', event.target);
    const noteObject = {
      content: newNote,
      important: Math.random() < 0.5
    }

    noteService
      .create(noteObject)
      .then(returnedNote => {
        setNotes(notes.concat(returnedNote))
        setNewNote('')
    })


    setNotes(notes.concat(noteObject))
    setNewNote('')
  }

  const handleNoteChange = (event) => {
    console.log(event.target.value);
    setNewNote(event.target.value)
  }

  const toggleImportanceOf= (id) => {
    //console.log(`importance of ${id} needs to be toggled`)
    //const url = `http://localhost:3001/notes/${id}` //comillas invertidas para poder interpolar la variable id en la url
    const note = notes.find( n => n.id === id)
    const changedNote = {...note, important: !note.important}

    noteService.update(id, changedNote).then(returnedNote => {
      setNotes(notes.map(note => note.id !== id ? note : returnedNote))
    }).catch(error => {
      alert(`the note '${note.content}' was already deleted from server`)
      setNotes(notes.filter(note => note.id !== id))
    })
  
  }

  const notesToShow = showAll ? notes : notes.filter(note => note.important === true)

  return (
    <div>
      <h1>Notes</h1>
      <div>
        <button onClick={() => setShowAll(!showAll)}>
          show {showAll ? 'important' : 'all'}
        </button>
      </div>
      <ul>
        {notesToShow.map(note =>
          <Note 
            key={note.id} 
            note={note} 
            toggleImportance={() => toggleImportanceOf(note.id)} />
        )}
      </ul>
      <form onSubmit={addNote}>
        <input
          value={newNote}
          onChange={handleNoteChange}
        />
        <button type="submit">save</button>
      </form>
    </div>
  )
}

export default App 
