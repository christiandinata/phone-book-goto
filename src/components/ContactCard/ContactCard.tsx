import { useMutation, useQuery } from "@apollo/client";
import { useContext, useEffect, useState } from "react";
import { ContactContext } from "../../context/ContactContext";
import { DELETE_CONTACT_PHONE, GET_CONTACT_DETAIL, GET_CONTACT_LIST, UPDATE_CONTACT, UPDATE_PHONE } from "../../queries/Contact";
import { ContactContextType } from "../../types/ContactType";
import { Button, FormGroup, FormInner, FormInput, FormLabel, FormWrapper } from "../ContactForm/ContactForm.styles";
import { Left, Right, Name, PhoneNumber, Wrapper, Favorite, Edit, Delete, PhoneInner, ContactDetail } from "./ContactCard.styles";

const ContactCard: React.FC = () => {
  // import needed values from react context
  const { contacts, allContacts, currOffset, currPage, setCurrPage, lastPage, favoriteId, setEditedID } = useContext(ContactContext) as ContactContextType;
  const [formVisible, setFormVisible] = useState(false)
  const [formNameVisible, setFormNameVisible] = useState(false)
  const [formPhoneVisible, setFormPhoneVisible] = useState(false)
  const [ID, setID] = useState(0)
  const [number, setNumber] = useState("")
  const [contactData, setContactData] = useState({
    first_name: "",
    last_name: "",
    number: ""
  })
  var a = [] as any[];

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

  const [updateContact] = useMutation(UPDATE_CONTACT, {
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

  const [updatePhone] = useMutation(UPDATE_PHONE, {
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

  // trigger localStorage on page first load
  useEffect(() => {
    if (localStorage.getItem('favorite2') === null){
      localStorage.setItem('favorite2', JSON.stringify([]))
    }

    a = JSON.parse(localStorage.getItem('favorite2') || "{}");
  }, [])

  // add regular contact to favorite list
  const addToFavorite = (
      id: number, 
      first_name: string, 
      last_name: string, 
      phones: {
        number: string
      }[]
    ) => {
    if (currPage === lastPage && contacts?.length === 1){
      setCurrPage(lastPage-1)
    }
   
    a = JSON.parse(localStorage.getItem('favorite2') || '{}');
    
    a.push({
      "id": id,
      "first_name":first_name,
      "last_name": last_name,
      "phones": phones
    });

    localStorage.setItem('favorite2', JSON.stringify(a));

    window.dispatchEvent(new Event('favorite'));
  }

  // handle form visibility
  const handleEditForm = (id: number, type: string, number: string) => {
    setFormVisible(true);
    if (type === 'name'){
      setFormNameVisible(true)
      setFormPhoneVisible(false)
    } else {
      setFormNameVisible(false)
      setFormPhoneVisible(true)
    }
    setID(id)
    setNumber(number)
    setEditedID(id)
  }

  // handle form for name editing
  const handleEditName = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    const firstName = allContacts?.map(item => (item.first_name).toLowerCase())
    const lastName = allContacts?.map(item => (item.last_name).toLowerCase())

    e.preventDefault();
    
    if (firstName.includes(contactData.first_name.toLowerCase()) || lastName.includes(contactData.last_name.toLowerCase())){
      alert("First name or last name is already registered")
    } else if (!contactData.first_name || !contactData.last_name){
      alert("Please do not leave any empty fields")
    } else {
      updateContact({
        variables: {
          "id": ID, 
          "_set": {
            "first_name": contactData.first_name,
            "last_name": contactData.last_name,
          }
        }
      })
      setFormVisible(false)
      setContactData({
        ...contactData,
        first_name: "",
        last_name: "",
      })
      setEditedID(undefined)
    }
  }

  // handle form for phone number editing
  const handleEditPhone = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.preventDefault();
    
    if (!contactData.number){
      alert("Please do not leave any empty fields")
    } else {
      updatePhone({
        variables: {
          "pk_columns": {
            "number": number,
            "contact_id": ID
          },
          "new_phone_number": contactData.number
        }
      })
      setFormVisible(false)
      setContactData({
        ...contactData,
        first_name: "",
        last_name: "",
        number: ""
      })
      setEditedID(undefined)
    }
  }

  // function to remove regular contact
  const handleDelete = (id: number) => {
    if (currPage === lastPage && contacts?.length === 1){
      setCurrPage(lastPage-1)
    }
    
    deleteContact({
      variables: {
        "id": id
      }
    })
  }

  return (
    <>
      {formVisible && (
        <FormWrapper>
          <FormInner>
            <h4>Editing contact: </h4>
            <ContactDetail>
              <p>First name: {data?.contact_by_pk.first_name}</p>
              <p>Last name: {data?.contact_by_pk.last_name}</p>
              <div>Phones: 
                {data?.contact_by_pk.phones.map((item: any) => (
                  <div key={item.id}> 
                    <p>{item.number}</p>
                  </div>
                ))}
              </div>
            </ContactDetail>
            {formNameVisible &&
              <>
                <FormGroup>
                  <FormLabel>
                    First name
                  </FormLabel>
                  <FormInput 
                    placeholder='enter first name' 
                    type="text" 
                    value={contactData.first_name}
                    onChange={(e) => setContactData({ ...contactData, first_name: e.target.value })}
                  />
                </FormGroup>
                <FormGroup>
                  <FormLabel>
                    Last name
                  </FormLabel>
                  <FormInput 
                    placeholder='enter last name' 
                    type="text"
                    value={contactData.last_name}
                    onChange={(e) => setContactData({ ...contactData, last_name: e.target.value })}
                  />
                </FormGroup>
                <Button onClick={() => setFormVisible(false)}>
                  Close
                </Button>
                <Button onClick={(e) => handleEditName(e)}>
                  Submit
                </Button>
              </>
            }
            {formPhoneVisible && 
              <>
                <FormGroup>
                  <FormLabel>
                    Phone
                  </FormLabel>
                  <FormInput
                    type="text"
                    value={contactData.number}
                    onChange={(e) => setContactData({...contactData, number: e.target.value})}
                    placeholder="enter phone number"
                  />
                </FormGroup>
                <Button onClick={() => setFormVisible(false)}>
                  Close
                </Button>
                <Button onClick={(e) => handleEditPhone(e)}>
                  Submit
                </Button>
              </>
            }
          </FormInner>
        </FormWrapper>
      )}
      {contacts?.map(item => (
        <Wrapper key={item.id}>
          <Left>
            <Name>
              {item.first_name + " " + item.last_name}
              <Edit onClick={() => handleEditForm(item.id, "name", "")}/>
            </Name>
            <PhoneNumber>
            {item.phones.map(number => {
              return (
                <PhoneInner key={number.number + item.id}>
                  <p>{number.number}</p>
                  <Edit onClick={() => handleEditForm(item.id, "phone", number.number)}/>
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
      ))}
    </> 
  )
}

export default ContactCard;