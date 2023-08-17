import styled from '@emotion/styled'

export const Outer = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
  width: 100%;
  justify-content: center ;
  align-items: center ;
`

export const Title = styled.p`
  font-size: 1.5rem;
  font-weight: 700;
  text-align: center;
  color: rgb(82, 37, 0);
  text-shadow: 2px 2px #000;
  letter-spacing: 4px;
  margin-bottom: 0.25rem;
`

export const Wrapper = styled.div`
  width: 480px;
  height: 95%;
  background-color: rgb(77, 42, 0, 0.2);
  border-radius: 20px;
  display: flex;
  justify-content: flex-start;
  align-items: flex-start;
  flex-direction: column;
  padding: 1rem 0 1rem 1rem;

  
  @media screen and (max-width: 768px) {
		width: 80%;
	} 
`

export const Desc = styled.p`
  font-size: 0.75rem;
  font-weight:700;
  text-transform: uppercase ;
`

export const SearchWrapper = styled.div`
  width: 100%;
  height: fit-content;
  max-height: 72px;
  padding-right: 1rem;
`

export const FavoriteWrapper = styled.div`
  width: 100%;
  height: fit-content;
  max-height: 30%;
  overflow-y:auto;
  margin-bottom: 1rem;
  padding-right: 1rem;
`

export const Divider = styled.div`
  width: 60%;
  display: flex;
  place-self: center ;
  background-color: #000 ;
  height: 2px;
  margin-bottom: 1rem;
  margin-left: -1rem;
`

export const ContactCardWrapper = styled.div`
  width: 100%;
  height: 50%;
  overflow-y: auto;
  margin-bottom: 1rem;
  padding-right: 1rem;
`

export const SearchCardWrapper = styled.div`
  width: 100%;
  height: 95%;
  overflow-y: auto;
  margin-bottom: 1rem;
  padding-right: 1rem;
`