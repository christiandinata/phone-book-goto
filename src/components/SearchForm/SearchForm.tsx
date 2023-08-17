import { FormInput, Wrapper } from "./SearchForm.styles"

type SearchFormProps = {
  namePhone: string,
  handleChange: (event: any) => void,
}

const SearchForm: React.FC<SearchFormProps> = ({namePhone, handleChange}) => {
  return (
    <Wrapper>
      <FormInput 
        placeholder="enter name or phone number" 
        autoComplete="off"
        name="name-phone" 
        value={namePhone} 
        onChange={(event) => handleChange(event)}
      />
    </Wrapper>
  )
}

export default SearchForm