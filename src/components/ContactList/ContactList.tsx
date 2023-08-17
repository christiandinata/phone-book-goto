import React, {useContext, useEffect, useState} from 'react'
import { ContactContext } from '../../context/ContactContext';
import { ContactContextType } from '../../types/ContactType'
import ContactCard from '../ContactCard/ContactCard';
import ContactForm from '../ContactForm/ContactForm';
import FavoriteCard from '../FavoriteCard/FavoriteCard';
import Pagination from '../Pagination/Pagination';
import SearchCard from '../SearchCard/SearchCard';
import SearchForm from '../SearchForm/SearchForm';

// import components from emotion styling page
import { ContactCardWrapper, Desc, Divider, FavoriteWrapper, Outer, SearchCardWrapper, SearchWrapper, Title, Wrapper } from './ContactList.styles';

const ContactList: React.FC = () => {
  // import needed values from react.context
  const {contacts, totalContacts, setFavoriteId} = useContext(ContactContext) as ContactContextType;

  const [fav, setFav] = useState([])
  const [namePhone, setNamePhone] = useState("")

  // handle form input value changes
  const handleChange = (event: any) => {
    setNamePhone(event.target.value)
  }

  // trigger localStorage functionality when event is listened
  useEffect(() => {
    const onFavorite = () => {
      const favorite = JSON.parse(localStorage.getItem('favorite2') || '{}');
      const number = favorite.map((item: any) => item.id)
      setFavoriteId(number)
      setFav(favorite)
    }
    window.addEventListener('favorite', onFavorite)
  }, [])

  // trigger localStorage on page load (componentDidMount)
  useEffect(() => {
    if (localStorage.getItem('favorite2') !== null){
      const favorite = JSON.parse(localStorage.getItem('favorite2') || '{}');
      const number = favorite.map((item: any) => item.id)
      setFavoriteId(number)
      setFav(favorite)
    }
  }, [])
  
  return (
    <Outer>
      <Title>PHONE-BOOK</Title>
      <Wrapper>
        <SearchWrapper>
          <SearchForm 
            namePhone={namePhone}
            handleChange={handleChange}
          />
        </SearchWrapper>
        {namePhone.length === 0 ? 
          <>
            {fav.length !== 0 && (
            <>
              <Desc>Favorite</Desc>
              <FavoriteWrapper className='apolo'>
                <FavoriteCard />
              </FavoriteWrapper>
              <Divider />
            </>
          )}
          
            <Desc>Regular</Desc>
            <ContactCardWrapper>
              <ContactCard />
            </ContactCardWrapper>
            <Pagination />
          </>
        :
          <>
            <SearchCardWrapper>
              <SearchCard 
                namePhone={namePhone}
                setNamePhone={setNamePhone}
                handleChange={handleChange}
              />
            </SearchCardWrapper>
          </>
        }
        <ContactForm/>
      </Wrapper>
    </Outer>
  )
}

export default ContactList;