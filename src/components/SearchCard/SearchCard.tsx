import { useMutation, useQuery } from "@apollo/client";
import { useContext, useEffect, useState } from "react"
import { ContactContext } from "../../context/ContactContext";
import { DELETE_CONTACT_PHONE, GET_CONTACT_DETAIL, GET_CONTACT_LIST } from "../../queries/Contact";
import { ContactContextType, ContactType } from "../../types/ContactType";
import { Delete, Favorite, Left, Name, PhoneInner, PhoneNumber, Right, Wrapper } from "../ContactCard/ContactCard.styles"
import { Desc } from "../ContactList/ContactList.styles";
import { FavFavorite, FavWrapper } from "./SearchCard.styles";

type SearchCardProps = {
  namePhone: string,
  setNamePhone: (value: string) => void,
  handleChange: (event: any) => void,
}

const SearchCard: React.FC<SearchCardProps> = ({namePhone, setNamePhone, handleChange}) => {
  // import needed values from react context
  const { allContacts, currOffset, favoriteId } = useContext(ContactContext) as ContactContextType;

  var a = [] as any[]
  const [dataChange, setDataChange] = useState(false)
  const [deletedId, setDeletedId] = useState(0)
  const [favDeletedId, setFavDeletedId] = useState(0)
  const [ID, setID] = useState(0)

  const [searchPhone, setSearchPhone] = useState([] as ContactType[])
  const [searchNameFav, setSearchNameFav] = useState([] as ContactType[])
  const [searchNameNotFav, setSearchNameNotFav] = useState([] as ContactType[])
  const [searchPhoneFav, setSearchPhoneFav] = useState([] as ContactType[])
  const [searchPhoneNotFav, setSearchPhoneNotFav] = useState([] as ContactType[])
  const [searchName, setSearchName] = useState([] as ContactType[])

  const {data} = useQuery(GET_CONTACT_DETAIL, {
    variables: {
      "id": ID
    }
  })

  const [deleteContact] = useMutation(DELETE_CONTACT_PHONE, {
    refetchQueries: [
      {query: GET_CONTACT_LIST, variables: { 
        "limit": 10, "offset": currOffset, 
        "order_by": {
        "first_name": "asc"
      },
        "where":  {
          "id": {
              "_nin": favoriteId
          }
        }
      }},
      'GetContactList',
    ],
  });

  // trigger when namePhone or allContacts changes
  // update the array for name filtering
  useEffect(() => {
    setSearchName(
      allContacts?.filter(contact => {
        if (contact.first_name.toLowerCase().includes(namePhone.toLowerCase()) 
          || contact.last_name.toLowerCase().includes(namePhone.toLowerCase())
          || (contact.first_name + contact.last_name).toLowerCase().replace(/\s/g, '').includes(namePhone.toLowerCase().replace(/\s/g, ''))){
          return contact
        }
      })
    )
  }, [namePhone, allContacts])

  // trigger when namePhone changes
  // update the array for phone filtering
  useEffect(() => {
    setSearchPhone(
      allContacts?.map(item => 
        ({
          ...item,
          phones: item.phones.filter(phone => phone.number.includes(namePhone))
        })
      ).filter(item => item.phones.length > 0)
    )
  }, [namePhone, allContacts])

  // update all respective arrays to differentiate between
  // favorite list and regular list
  useEffect(() => {
    setSearchNameFav(
      searchName?.filter(({ id: id1 }) => favoriteId.some((id2) => id2 === id1))
    )
    setSearchNameNotFav(
      searchName?.filter(({ id: id1 }) => !favoriteId.some((id2) => id2 === id1))
    )
    setSearchPhoneFav(
      searchPhone?.filter(({ id: id1 }) => favoriteId.some((id2) => id2 === id1))
    )
    setSearchPhoneNotFav(
      searchPhone?.filter(({ id: id1 }) => !favoriteId.some((id2) => id2 === id1))
    )
  }, [searchName, dataChange])

  // update regular list and favorite list when
  // user remove a contact
  useEffect(() => {
    setSearchNameNotFav(
      searchName?.filter(({ id: id1 }) => !favoriteId.some((id2) => id2 === id1))
      .filter(item => item.id !== deletedId)
    )
    setSearchNameFav(
      searchName?.filter(({ id: id1 }) => favoriteId.some((id2) => id2 === id1))
      .filter(item => item.id !== deletedId)
    )
  }, [deletedId])

  const addToFavorite = (
    id: number, 
    first_name: string,
    last_name: string, 
    phones: {
      number: string
    }[]
  ) => {

    a = JSON.parse(localStorage.getItem('favorite2') || '{}');
    
    a.push({
      "id": id,
      "first_name":first_name,
      "last_name": last_name,
      "phones": phones
    });

    localStorage.setItem('favorite2', JSON.stringify(a));
    setDataChange(!dataChange)
    window.dispatchEvent(new Event('favorite'));
  }

  // function to handle regular contact removal
  const handleDelete = (id: number) => {    
    deleteContact({
      variables: {
        "id": id
      }
    })
    setDeletedId(id)
    setDataChange(!dataChange)
  }

  // function to handle favorite contact removal
  const handleRemove = (id: number, type: string) => {
    a = JSON.parse(localStorage.getItem('favorite2') || '{}');
    a = a?.filter(item => item.id !== id);

    localStorage.setItem('favorite2', JSON.stringify(a));
    if (type !== "fav"){
      setDeletedId(id)
    } else {
      setFavDeletedId(id)
    }
    
    setDataChange(!dataChange)
    window.dispatchEvent(new Event('favorite'));
  }

  return (
    <>
      {searchName?.length > 0 ? (
        <>
          {searchNameFav?.length !== 0 && <Desc>Favorite</Desc>}
          {searchNameFav?.map(item => {
            return (
              <FavWrapper key={item.id}>
                <Left>
                  <Name>
                    {item.first_name + " " + item.last_name}
                  </Name>
                  {/* <p>{item.id}</p> */}
                  <PhoneNumber>
                  {item.phones.map(number => {
                    return (
                      <PhoneInner key={number.number + item.id}>
                        <p>{number.number}</p>
                      </PhoneInner>
                    )
                  })}
                  </PhoneNumber>
                </Left>
                <Right>
                  <FavFavorite />
                  <Delete onClick={() => handleRemove(item.id, "fav")}/>
                </Right>
              </FavWrapper>
            )
          })} 
          {searchNameNotFav?.length !== 0 && <Desc>Regular</Desc>}
          {searchNameNotFav?.map(item => {
            return (
              <Wrapper key={item.id}>
                <Left>
                  <Name>
                    {item.first_name + " " + item.last_name}
                  </Name>
                  {/* <p>{item.id}</p> */}
                  <PhoneNumber>
                  {item.phones.map(number => {
                    return (
                      <PhoneInner key={number.number + item.id}>
                        <p>{number.number}</p>
                      </PhoneInner>
                    )
                  })}
                  </PhoneNumber>
                </Left>
                <Right>
                  <Favorite onClick={() => addToFavorite(item.id, item.first_name, item.last_name, item.phones)}/>
                  <Delete onClick={() => handleDelete(item.id)}/>
                </Right>
              </Wrapper>
            )
          })}
        </>
      )
      : 
      (
        <>
          {searchPhoneFav?.length !== 0 && <Desc>Favorite</Desc>}
          {searchPhoneFav?.map(item => {
            return (
              <FavWrapper key={item.id}>
                <Left>
                  <Name>
                    {item.first_name + " " + item.last_name}
                  </Name>
                  <PhoneNumber>
                  {item.phones.map(number => {
                    return (
                      <PhoneInner key={number.number + item.id}>
                        <p>{number.number}</p>
                      </PhoneInner>
                    )
                  })}
                  </PhoneNumber>
                </Left>
                <Right>
                  <FavFavorite />
                  <Delete onClick={() => handleRemove(item.id, "fav") }/>
                </Right>
              </FavWrapper>
            )
          })} 
          {searchPhoneNotFav?.length !== 0 && <Desc>Regular</Desc>}
          {searchPhoneNotFav?.map(item => {
            return (
              <Wrapper key={item.id}>
                <Left>
                  <Name>
                    {item.first_name + " " + item.last_name}
                  </Name>
                  {/* <p>{item.id}</p> */}
                  <PhoneNumber>
                  {item.phones.map(number => {
                    return (
                      <PhoneInner key={number.number + item.id}>
                        <p>{number.number}</p>
                      </PhoneInner>
                    )
                  })}
                  </PhoneNumber>
                </Left>
                <Right>
                  <Favorite onClick={() => addToFavorite(item.id, item.first_name, item.last_name, item.phones)}/>
                  <Delete onClick={() => handleDelete(item.id)}/>
                </Right>
              </Wrapper>
            )
          })}
        </>
      )}
    </>
  )
}

export default SearchCard