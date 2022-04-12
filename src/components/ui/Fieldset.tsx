import styled from 'styled-components';

export const StyledFieldset = styled.fieldset`
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
  border: none;
`;

const Legend = styled.legend`
  color: inherit;
  text-align: center;
  font-size: 30px;
`;

type P = {
  children: React.ReactNode;
  legend?: string;
};

export const Fieldset = ({ children, legend }: P) => {
  return (
    <>
      <StyledFieldset>
        {legend && <Legend>{legend}</Legend>}
        {children}
      </StyledFieldset>
    </>
  );
};
