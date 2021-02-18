import React, {createContext, useState, useContext} from 'react'

const CityContext = createContext()

export default function SavedCityProvider({children}) {
  const [isSaved, setIsSaved] = useState(1)

  return(
    <CityContext.Provider 
    value={{
      isSaved,
      setIsSaved
    }}
    >
      {children}
    </CityContext.Provider>
  )
}

export function useSaved(){
  const context = useContext(CityContext)
  if(!context) throw new Error('useSaved must be used within a SavedCityProvider')
  const { isSaved, setIsSaved } = context
  return { isSaved, setIsSaved}
}