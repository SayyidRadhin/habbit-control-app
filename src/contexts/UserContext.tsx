import React, { ReactNode, createContext, useContext } from 'react'
import { useLocalStorage } from '../hooks/useLocalStorage'

type UserContextType = {
    createUser:(user:String) => void,
    User?:String
}

type childrenProps = {
    children: ReactNode
  }


const UserContext = createContext({} as UserContextType) 
export function useAuth() {
    return useContext(UserContext)
  }

function UserContextProvider({children}:childrenProps) {
    const [User, setUser] = useLocalStorage<String>("user", "")

   const createUser =(user:String)=>{
        setUser(user)
    }

  return (
    <UserContext.Provider value={{
        createUser,
        User
    }}>
        {children}
    </UserContext.Provider>
  )
}

export default UserContextProvider