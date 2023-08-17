import { useMutation } from '@apollo/client';
import React, { useContext, useState } from 'react';
import { ContactContext } from '../../context/ContactContext';
import { ADD_CONTACT_WITH_PHONES, GET_CONTACT_LIST } from '../../queries/Contact';
import { ContactContextType } from '../../types/ContactType';
import { Button, ButtonPhone, FormGroup, FormInner, FormInput, FormLabel, FormWrapper, Wrapper } from './ContactForm.styles'

const ContactForm: React.FC = () => {
  // import needed values from react context
  const { allContacts, currOffset, favoriteId } = useContext(ContactContext) as ContactContextType;
  
  const [addContact, { error }] = useMutation(ADD_CONTACT_WITH_PHONES, {
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
    ]
  });

  const [formVisible, setFormVisible] = useState(false)
  const [phone, setPhone] = useState([{}])

  const [formData, setFormData] = useState({
    first_name: "",
    last_name: "",
    phones: [""] as string[],
  })

  // handle phone values
  const handlePhone = (e:React.ChangeEvent<HTMLInputElement>, idx: number) => {
    const phonesClone = [...formData.phones];

    phonesClone[idx] = e.target.value

    setFormData({ ...formData, phones: phonesClone });
  }

  // handle multiple phone numbers
  const handlePhoneCount = (e:React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.preventDefault();
    setFormData({ ...formData, phones: [...formData.phones, ""]});
  }

  // handle add contact and close button
  const handleEndButton = (type: string) => {
    if (type === "true"){
      setFormVisible(true)
    }else{
      setFormVisible(false)
    }
  }

  // assigning values to phone variable
  // it is used to create a appropriate body to be sent to the server
  formData.phones.map((item, idx: any) => {
    phone[idx] = {
      number: item
    }
  })

  // handle submit button
  const handleSubmit = (e:React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    const firstName = allContacts?.map(item => (item.first_name).toLowerCase())
    const lastName = allContacts?.map(item => (item.last_name).toLowerCase())
    
    e.preventDefault();
    
    if (firstName.includes(formData.first_name.toLowerCase()) || lastName.includes(formData.last_name.toLowerCase())) {
      alert('First name or last name is already registered')
    } else if (!formData.first_name || !formData.last_name || !formData.phones[0]) {
      alert('Please do not leave any empty fields')
    } else {
    if (error) alert('Phone number is already registered')
      addContact({
        variables: {
          "first_name": formData.first_name,
          "last_name" : formData.last_name,
          "phones": phone
        }
      })
      setFormVisible(false)
      setFormData({
        ...formData,
        first_name: "",
        last_name: "",
        phones: [""] as any[]
      })
      setPhone([{}])
    }
  }

  return (
    <Wrapper>
      {formVisible && (
        <FormWrapper>
          <FormInner>
            <FormGroup>
              <FormLabel>
                First name
              </FormLabel>
              <FormInput 
                placeholder='enter first name' 
                type="text" 
                value={formData.first_name}
                onChange={(e) => setFormData({ ...formData, first_name: e.target.value })}
              />
            </FormGroup>
            <FormGroup>
              <FormLabel>
                Last name
              </FormLabel>
              <FormInput 
                placeholder='enter last name' 
                type="text"
                value={formData.last_name}
                onChange={(e) => setFormData({ ...formData, last_name: e.target.value })}
              />
            </FormGroup>
            <FormGroup>
              <FormLabel>
                Phone
              </FormLabel>
              {formData.phones.map((num: any, idx: any) => (
                  <FormInput
                    type="text"
                    key={idx}
                    value={num}
                    onChange={(e) => handlePhone(e, idx)}
                    placeholder="enter phone number"
                  />
                ))}
            </FormGroup>
            <ButtonPhone aria-label='add number' onClick={(e) => handlePhoneCount(e)}>
              Add another number
            </ButtonPhone>
            <Button aria-label='close' onClick={() => handleEndButton("false")}>
              Close
            </Button>
            <Button aria-label='submit' onClick={(e) => handleSubmit(e)}>
              Submit
            </Button>
          </FormInner>
        </FormWrapper>
      )}
      <Button aria-label='add new contact' onClick={() => handleEndButton("true")}>
        Add Contact
      </Button>
    </Wrapper>
  )
}

export default ContactForm;