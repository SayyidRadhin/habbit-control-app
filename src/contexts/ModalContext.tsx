import React, { ReactNode, createContext, useContext,useState } from 'react'

type ModalContextType = {
    setShowModal:React.Dispatch<React.SetStateAction<boolean>>,
    showModal:boolean
}

type childrenProps = {
    children: ReactNode
  }


const ModalContext = createContext({} as ModalContextType) 
export function useModal() {
    return useContext(ModalContext)
  }

function ModalContextProvider({children}:childrenProps) {
    const [showModal, setShowModal] = useState(false);
   

  return (
    <ModalContext.Provider value={{
        setShowModal,
        showModal
        
    }}>
        {children}
    </ModalContext.Provider>
  )
}

export default ModalContextProvider