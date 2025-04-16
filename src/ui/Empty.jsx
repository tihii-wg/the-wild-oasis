import styled from "styled-components";

const StyledEmpty = styled.p`
  text-align: center;
  margin: 30px 0;
  color: var(--color-grey-600);
  font-weight: 600;
`;

function Empty({ resource }) {
  return <StyledEmpty>No {resource} could be found.</StyledEmpty>;
}

export default Empty;
