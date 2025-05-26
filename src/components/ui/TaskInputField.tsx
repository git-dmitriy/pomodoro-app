import styled from 'styled-components';
import {FaPlus} from 'react-icons/fa';
import {Button} from '@/components/ui/Button';

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
        margin-inline-start: 5px;
    }
`;

const Input = styled.input`
    border-radius: 1.25rem;
    font-size: 1.3rem;
    padding-block: 5px;
    padding-inline: 10px;
    background-color: rgba(0, 0, 0, 0.2);
    border: none;
    color: white;
    inline-size: 12.5rem;

    @media ${({theme}) => theme.media.sm} {
        inline-size: 15.625rem;
    }

    @media ${({theme}) => theme.media.xl} {
        inline-size: 18.75rem;
    }
`;

export const TaskInputField = ({label, value, onChange}: P) => {
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
                    <FaPlus/>
                </Button>
            ) : (
                <Button disabled>
                    <FaPlus/>
                </Button>
            )}
        </FieldGroup>
    );
};
