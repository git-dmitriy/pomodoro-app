import styled from 'styled-components';
import { FaPlus } from 'react-icons/fa';
import { Button } from 'components/ui/Button';

type P = {
  label?: string;
  value: string;
  onChange: (e: React.FormEvent<HTMLInputElement>) => void;
};

const Label = styled.label`
  position: absolute;
  width: 1px;
  height: 1px;
  margin: -1px;
  border: 0;
  padding: 0;
  white-space: nowrap;
  clip-path: inset(100%);
  clip: rect(0 0 0 0);
  overflow: hidden;
`;

const FieldGroup = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;

  & > * + * {
    margin-left: 5px;
  }
`;

const Input = styled.input`
  border-radius: 20px;
  font-size: inherit;
  padding: 5px 10px;
  background-color: rgba(0, 0, 0, 0.2);
  border: none;
  color: white;
  width: 200px;

  @media (min-width: 640px) {
    width: 250px;
  }

  @media (min-width: 1280px) {
    width: 300px;
  }
`;

export const TaskInputField = ({ label, value, onChange }: P) => {
  return (
    <FieldGroup>
      {label && <Label>{label}</Label>}
      <Input
        type='text'
        id='task'
        value={value}
        onChange={onChange}
        autoComplete='off'
      />
      {value.trim().length !== 0 ? (
        <Button>
          <FaPlus />
        </Button>
      ) : (
        <Button disabled>
          <FaPlus />
        </Button>
      )}
    </FieldGroup>
  );
};
