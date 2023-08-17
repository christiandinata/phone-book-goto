export type ContactType = {
  id: number;
  created_at: string;
  first_name: string,
  last_name: string,
  phones: {
    number: string
  }[],
}

export type ContactContextType = {
  favoriteId: number[],
  editedID: any,
  currOffset: number,
  currPage: number,
  contacts: ContactType[],
  totalContacts: ContactType[],
  allContacts: ContactType[],
  lastPage: number,
  setEditedID: (id: any) => void,
  setFavoriteId: (id: number[]) => void,
  setCurrOffset: (offset: number) => void,
  setCurrPage: (page: number) => void
}