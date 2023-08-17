import styled from '@emotion/styled'


export const Wrapper = styled.div`
  display: flex;
  width: 100%;
  flex: 1;
  margin-bottom: 0.5rem;
  /* border-radius: 40px; */
`

export const FormInput = styled.input`
  display: flex;
  width: 100%;
  flex: 1;
  padding: 0.5rem;
  outline: none;
  border: none;
  border-radius: 10px;
  font-size: 1rem;

  ::placeholder {
    color: rgba(0, 0, 0, 0.25)
  }

`