import styled from 'styled-components';

const Input = styled.input`
    inline-size: 6.25rem;
    padding-block: .5rem;
    color: inherit;
    border: none;
    background-color: rgba(0, 0, 0, 0.2);
    border-radius: .625rem;
    text-align: center;
    font-size: 1.2rem;
`;

const Container = styled.div`
    display: grid;
    gap: var(--unit-3);
    justify-items: center;
    margin: var(--unit-1);
    border-radius: 1.25rem;
    padding: var(--unit-2);
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
            <label htmlFor={id}>{label}</label>
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
