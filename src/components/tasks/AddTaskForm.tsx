import {createTask} from '@/features/tasks/tasksSlice';
import {useState, FormEvent} from 'react';
import {nanoid} from '@reduxjs/toolkit';
import {TaskInputField} from '@/components/ui/TaskInputField';
import {useAppDispatch} from "@/hooks/useAppDispatch";


export const AddTaskForm = () => {
    const [content, setTask] = useState('');
    const isComplete = false;
    const dispatch = useAppDispatch();

    const onChangeHandler = (e: FormEvent<HTMLInputElement>) => {
        setTask(e.currentTarget.value);
    };

    const onSubmitHandler = (e: FormEvent) => {
        e.preventDefault();
        if (content.trim().length !== 0) {
            dispatch(
                createTask({id: nanoid(), content: content.trim(), isComplete})
            );
            setTask('');
        }
        setTask('');
    };
    return (
        <form onSubmit={onSubmitHandler}>
            <TaskInputField value={content} onChange={onChangeHandler}/>
        </form>
    );
};
