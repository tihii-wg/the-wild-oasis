import styled from "styled-components";

const StyledApp = styled.div`
  background-color: red;
  padding: 20px;
`;
const H1 = styled.h1`
  font-size: 30px;
  font-weight: 600;
`;
const Button = styled.button`
  font-size: 1.4rem;
  padding: 1.2rem 1.6rem;
  font-weight: 500;
  border: none;
  border-radius: 7px;
  background-color: purple;
  color: white;
`;

function App() {
  return (
    <StyledApp>
      <H1>Heloo the wild oasis</H1>
      <Button onClick={() => alert("ytllo")}>Check in</Button>
      <Button>Check out</Button>
    </StyledApp>
  );
}

export default App;
