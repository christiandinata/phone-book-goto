import styled from '@emotion/styled'
import { BsHeartFill } from 'react-icons/bs'

export const FavWrapper = styled.div`
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

export const FavFavorite = styled(BsHeartFill)`
  font-size: 1.25rem;
  cursor: pointer;
  color: #000;
  transition: 0.2s all ease-in;
`