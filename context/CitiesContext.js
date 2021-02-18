import React, {createContext, useState, useContext} from 'react'

const SavedContext = createContext()

export default function SavedProvider({children}) {
  const [cities, setCities] = useState(null)

  return(
    <SavedContext.Provider 
    value={{
      cities,
      setCities
    }}
    >
      {children}
    </SavedContext.Provider>
  )
}

export function citySaved(){
  const context = useContext(SavedContext)
  if(!context) throw new Error('citySaved must be used within a SavedProvider')
  const { cities, setCities } = context
  return { cities, setCities}
}