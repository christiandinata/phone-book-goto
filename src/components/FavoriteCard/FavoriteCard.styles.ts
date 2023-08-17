import styled from '@emotion/styled'
import { BsHeartFill } from 'react-icons/bs'
import { FiEdit2 } from 'react-icons/fi'
import { AiOutlineCloseCircle } from 'react-icons/ai'

export const Wrapper = styled.div`
  width: 100%;
  background-color: #bc986a;
  padding: 0.5rem;
  margin-bottom: 0.5rem;
  display: flex;
  flex: 1;
  justify-content: space-between;
  align-items: flex-start;
  color: #fff;
  border-radius: 10px;
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

export const Favorite = styled(BsHeartFill)`
  font-size: 1.25rem;
  cursor: pointer;
  color: #000;
  transition: 0.2s all ease-in;
`

export const Edit = styled(FiEdit2)`
  margin-left: 1rem;
  font-size: 1.25rem;
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