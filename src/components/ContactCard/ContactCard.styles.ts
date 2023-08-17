import styled from '@emotion/styled'
import { BsHeart } from 'react-icons/bs'
import { FiEdit2 } from 'react-icons/fi'
import { AiOutlineCloseCircle } from 'react-icons/ai'

export const Wrapper = styled.div`
  width: 100%;
  background: rgba(87, 68, 6, 0.2);
  border-radius: 16px;
  backdrop-filter: blur(5px);
  -webkit-backdrop-filter: blur(5px);
  border: 1px solid rgba(255, 255, 255, 0.3);
  padding: 0.5rem;
  margin-bottom: 0.5rem;
  display: flex;
  flex: 1;
  justify-content: space-between;
  align-items: flex-start;
  color: #fff;
  border-radius: 10px;
`

export const ContactDetail = styled.div`
  border: 2px solid #000;
  width: fit-content;
  background-color: #fff;
  padding: 0.5rem;
  border-radius: 10px;
  margin-top: 2px;
  margin-bottom: 1rem;

  p{
    font-weight: 500;
  }
`

export const Left = styled.div``

export const Right = styled.div`
  display: flex;
  place-self: center;
  align-items: flex-end;
`

export const Name = styled.div`
  display: flex;
  font-weight: 700;
`


export const PhoneNumber = styled.div`
  display: flex;
  font-size: 0.75rem;
  flex-direction: column ;
`

export const PhoneInner = styled.div`
  display: flex;
`

export const Favorite = styled(BsHeart)`
  font-size: 1.25rem;
  cursor: pointer;
  transition: 0.2s all ease-in;

  &:hover{
    color: #000;
  }
`

export const Edit = styled(FiEdit2)`
  margin-left: 1rem;
  font-size: 0.8rem;
  cursor: pointer;
  transition: 0.2s all ease-in;

  &:hover{
    filter: invert(1);
  }
`

export const Delete = styled(AiOutlineCloseCircle)`
  margin-left: 1rem;
  font-size: 1.5rem;
  cursor: pointer;
  transition: 0.2s all ease-in;

  &:hover{
    filter: invert(1);
  }
`