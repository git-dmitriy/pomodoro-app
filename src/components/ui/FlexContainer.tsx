import styled from 'styled-components';

type P = {
  direction?: 'row' | 'col';
  alignItems?: 'lex-start' | 'flex-end' | 'center' | 'stretch' | 'baseline';
  justifyContent?:
    | 'flex-start'
    | 'flex-end'
    | 'center'
    | 'space-between'
    | 'space-around';
  padding?: string;
  margin?: string;
};

export const FlexContainer = styled.div<P>`
  display: flex;
  flex-direction: ${({ direction }) => direction || 'row'};
  justify-content: ${({ justifyContent }) => justifyContent || 'center'};
  margin: ${({ margin }) => (margin || 0) + 'px'};
  padding: ${({ padding }) => (padding || 0) + 'px'};
`;
