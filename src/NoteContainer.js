import React, { useState } from 'react'

import axios from 'axios'
import ReactMarkdown from 'react-markdown'

function NoteContainer({ note, getAllNotes }) {
  const [newBody, setNewBody] = useState('')
  const [edit, setEdit] = useState(false)

  const onToggle = () => {
    setEdit(!edit)
  }

  const updateNote = (id, newBody) => {
    axios
      .put(`http://localhost:3001/notes/${id}`, {
        newBody: newBody,
      })
      .then(() => {
        onToggle()
        getAllNotes()
      })
  }

  const deleteNote = (id) => {
    axios.delete(`http://localhost:3001/notes/${id}`).then(() => {
      getAllNotes()
    })
  }

  return (
    <div className="Container">
      <div className="NoteHeader">
        <span>{note.createdAt}</span>

        <div>
          {edit ? (
            <span
              className="ButtonSpan"
              role="img"
              aria-label="preview"
              onClick={() => updateNote(note.id, newBody)}
            >
              👌
            </span>
          ) : (
            <span
              className="ButtonSpan"
              role="img"
              aria-label="preview"
              onClick={() => onToggle()}
            >
              ✍️
            </span>
          )}

          <span
            className="ButtonSpan"
            role="img"
            aria-label="Delete"
            onClick={() => deleteNote(note.id)}
          >
            🗑️
          </span>
        </div>
      </div>

      {edit ? (
        <textarea
          className="StyledTextarea"
          defaultValue={note.body}
          onChange={(value) => setNewBody(value.target.value)}
        />
      ) : (
        <div className="NotePreviewBody">
          <ReactMarkdown children={note.body} />
        </div>
      )}
    </div>
  )
}

export default NoteContainer
