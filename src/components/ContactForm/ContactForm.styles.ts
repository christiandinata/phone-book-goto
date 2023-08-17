import styled from '@emotion/styled'

export const Wrapper = styled.div`
  width: 100%;
  display: flex;
  justify-content: center ;
  align-items:center ;
  flex: 1;
  padding-right: 1rem;
  margin-top: 0.5rem;
`

export const FormWrapper = styled.form`
  display: flex;
  position: fixed;
  top: 0;
  left: 0;
  justify-content: center;
  align-items: center;
  z-index: 10;
  width: 100%;
  height: 100%;
  padding: 0 1rem;
  background-color: rgba(0,0,0,0.5);
  backdrop-filter: blur(4px);
  -webkit-backdrop-filter: blur(4px) ;
`

export const FormInner = styled.div`
  background-color: #659dbd;
  display: flex;
  flex-direction: column ;
  padding: 1rem;
  border-radius: 0.5rem;
  width: 100%;
  max-width: 450px;
  overflow: auto;
  max-height: calc(100vh - 4rem);

  h4{
    color: #fff;
    margin-bottom: 4px;
  }
`

export const FormGroup = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: 1rem;
`

export const FormLabel = styled.label`
  color: #fff;
  margin-bottom: 4px;
`

export const FormInput = styled.input`
  display: flex;
  flex: 0.6;
  padding: 0.5rem;
  outline: none;
  border: none;
  border-radius: 5px;
  margin-bottom: 0.35rem;

  ::placeholder {
    color: rgba(0, 0, 0, 0.25)
  }
`

export const ButtonPhone = styled.button`
  text-align: center;
  align-items: center;
  width: 144px;
  justify-content: center;
  display: flex;
  outline: none;
  border: none;
  border-radius: 5px;
  background-color: #fff ;
  color: #bc986a;
  padding: 0.25rem 0.5rem;
  cursor: pointer;
  transition: 0.2s all ease-in;

  &:hover{
    background-color: #bc986a;
    color: #fff;
  }
`

export const Button = styled.button`
  text-align: center;
  display: flex;
  outline: none;
  border: none;
  border-radius: 5px;
  background-color: #fff ;
  color: #000;
  padding: 0.25rem 0.5rem;
  place-self: center ;
  cursor: pointer;
  transition: 0.2s all ease-in;
  margin: 0.3rem;

  &:hover{
    background-color: #bc986a;
    color: #fff;
  }
`