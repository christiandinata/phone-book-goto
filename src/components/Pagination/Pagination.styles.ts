import styled from '@emotion/styled'
import { BsChevronLeft } from 'react-icons/bs'
import { BsChevronRight } from 'react-icons/bs'

export const PageWrapper = styled.div`
  width: 100%;
  display: flex;
  justify-content:  center;
  align-items: center;
  flex-direction: column;
  padding-right: 1rem;

  select{
    outline: none;
    border: 1px solid #000;
    border-radius: 4px;
  }
`

export const Inner = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;

  p{
    margin: 0.25rem;
  }
`

export const Button = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  border: none;
  padding: 0.5rem;
  border-radius: 50%;
  color: #000;
  background-color: #fff;
  margin: 0 0.5rem;
  cursor: pointer;
  transition: 0.2s all ease-in;

  &:hover{
    color: #fff;
    background-color: #000;
  }
`

export const Left = styled(BsChevronLeft)``

export const Right = styled(BsChevronRight)``

