import React, { useState, useEffect } from 'react'
import axios from 'axios'

import NoteContainer from './NoteContainer'

import './App.css'

function App() {
  const [allNotes, setAllNotes] = useState([])

  const getAllNotes = () => {
    axios
      .get('https://carlos-notes-app-api.herokuapp.com/notes')
      .then((res) => {
        setAllNotes(res.data)
      })
  }

  useEffect(() => {
    getAllNotes()
  }, [])

  const addNotes = () => {
    axios
      .post('https://carlos-notes-app-api.herokuapp.com/notes', {
        body: '# Hello World!',
      })
      .then(() => {
        getAllNotes()
      })
  }

  const createNoteContainer = () => {
    return allNotes.map((note) => (
      <NoteContainer note={note} getAllNotes={() => getAllNotes()} />
    ))
  }

  return (
    <div>
      <h1>📒 Notes</h1>

      <button type="button" onClick={addNotes}>
        Add New Note
      </button>

      <br />
      <br />

      {createNoteContainer()}
    </div>
  )
}

export default App
