import ContactList from './components/ContactList/ContactList';
import styled from '@emotion/styled'

function App() {
  return (
    <AppWrapper>
      <ContactList />
    </AppWrapper>
  );
}

export default App;

// color codes
// color: #8d8741
// color: #659dbd
// color: #daad86
// color: #bc986a
// color: #fbeec1

const AppWrapper = styled.div`
  width: 100%;
  height: 100vh;
  display: flex;
  justify-content: center;
  padding: 1rem 2rem;
  background-color: rgb(255, 246, 212, 1);
`