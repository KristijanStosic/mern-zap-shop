import React, { useState } from 'react'
import { Paper, InputBase, IconButton } from '@mui/material'
import { useNavigate } from 'react-router-dom'
import SearchIcon from '@mui/icons-material/Search';

const Search = () => {
  const navigate = useNavigate()
  const [keyword, setKeyword] = useState('')

  const submitSearchHandler = (e) => {
    e.preventDefault()
    if (keyword.trim()) {
      navigate(`/search/${keyword}`)
    } else {
      navigate('/')
    }
  }

  return (
    <Paper
      component='form'
      sx={{ p: '2px 4px', display: 'flex', alignItems: 'center',  }}
      onSubmit={submitSearchHandler}
    >
      <InputBase
        sx={{ ml: 1, flex: 1 }}
        placeholder='Search products...'
        onChange={(e) => setKeyword(e.target.value)}
        inputProps={{ 'aria-label': 'search products' }}
      />
      <IconButton
        type='submit'
        sx={{ p: '10px' }}
        aria-label='search'
      >
        <SearchIcon 
        />
      </IconButton>
    </Paper>
  )
}

export default Search
