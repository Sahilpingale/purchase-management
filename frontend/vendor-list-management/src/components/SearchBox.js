import React, { useState } from 'react'
import { Form, Button } from 'react-bootstrap'

const SearchBox = ({ history, search }) => {
  const [keyword, setKeyword] = useState('')

  // --- Handlers --- //
  const submitHandler = (e) => {
    e.preventDefault()
    if (keyword.trim()) {
      history.push(`/${search}/search/${keyword}`)
    } else {
      history.push(`/${search}`)
    }
  }
  return (
    <>
      <form onSubmit={submitHandler} inline>
        <input
          type="text"
          name="q"
          onChange={(e) => setKeyword(e.target.value)}
          placeholder="Search"
          className="mr-sm-2 ml-sm-5"
        ></input>
        <button type="submit">Search</button>
      </form>
    </>
  )
}

export default SearchBox
