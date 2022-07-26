import React, { useState } from 'react'

const SearchBox = ({ history, search, resetCategoryFunc: resetCategory }) => {
  const [keyword, setKeyword] = useState('')

  // --- Handlers --- //
  const submitHandler = (e) => {
    e.preventDefault()
    if (keyword.trim()) {
      history.push(`/${search}/search/${keyword}`)
      resetCategory()
    } else {
      history.push(`/${search}`)
    }
  }

  return (
    <>
      <form className="" onSubmit={submitHandler}>
        <input
          type="text"
          name="q"
          onChange={(e) => setKeyword(e.target.value)}
          placeholder="Search"
          autoComplete="off"
          className="custom-input me-2"
        ></input>
        <button className="custom-button" type="submit">
          Search
        </button>
      </form>
    </>
  )
}

export default SearchBox
