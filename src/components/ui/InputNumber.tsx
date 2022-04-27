import styled from 'styled-components';

export const Input = styled.input`
  width: 100px;
  color: inherit;
  border: none;
  background-color: transparent;
  background-color: rgba(0, 0, 0, 0.2);
  border-radius: 10px;
  text-align: center;
  font-size: 1.2em;
`;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 2px;
  border-radius: 20px;
  padding: 5px;
`;

type P = {
  id: string;
  name: string;
  min: number;
  max: number;
  step: number;
  value: number;
  label: string;
  onChangeHandler: (e: React.ChangeEvent<HTMLInputElement>) => void;
};

export const InputNumber = ({
  id,
  name,
  min,
  max,
  step,
  value,
  label,
  onChangeHandler,
}: P) => {
  return (
    <Container>
      <label htmlFor={id}>{label}:</label>
      <Input
        id={id}
        name={name}
        min={min}
        max={max}
        step={step}
        type='number'
        value={value}
        onChange={onChangeHandler}
      />
    </Container>
  );
};
