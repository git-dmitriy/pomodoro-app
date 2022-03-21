import styled from 'styled-components';

const StyledLayout = styled.div`
  width: 100%;
  height: 100vh;
  background-color: #f3f4f6;
  color: #4b5563;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

export const Layout: React.FC = ({ children }) => {
  return <StyledLayout>{children}</StyledLayout>;
};
