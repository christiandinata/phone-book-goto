import React, { createContext, useState } from "react";
import { useGetContact, useGetTotalContact, useGetTotalContacts } from "../queries/Contact";
import { ContactContextType } from "../types/ContactType";

export const ContactContext = createContext<ContactContextType | null>(null);

type contextProps = {
  children: React.ReactNode
}

export const AppProvider: React.FC<contextProps> = ({children}) => {

  const [currOffset, setCurrOffset] = useState(0)
  const [currPage, setCurrPage] = useState(1)
  const [favoriteId, setFavoriteId] = useState([] as number[])
  const [editedID, setEditedID] = useState()

  const totalContacts = useGetTotalContact(favoriteId);
  const allContacts = useGetTotalContacts(editedID);
  const contacts = useGetContact(currOffset, favoriteId);
  const lastPage = totalContacts ? Math.ceil(totalContacts?.length / 10) : 1;

  return(
    <ContactContext.Provider value={{
        currOffset, currPage, favoriteId, editedID, 
        contacts, totalContacts, allContacts, lastPage, 
        setCurrOffset, setCurrPage, setEditedID, setFavoriteId,
      }}>
      {children}
    </ContactContext.Provider>
  )
}

