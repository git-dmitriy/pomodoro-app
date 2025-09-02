import {TaskItem as TaskItemType} from '@/features/tasks/types';
import {useRef, useState, useEffect, KeyboardEvent, ChangeEvent} from 'react';
import {removeTask, updateTask} from '@/features/tasks/tasksSlice';
import {Button} from '@/components/ui/Button';
import {AiFillDelete} from 'react-icons/ai';
import {Checkbox} from '@/components/ui/Checkbox';
import {TaskItem} from '@/components/ui/TaskItem';
import {TextArea} from '@/components/ui/TextArea';
import {TextBlock} from '@/components/ui/TextBlock';
import {useAppDispatch} from "@/hooks/useAppDispatch";

export const TaskListItem = (task: TaskItemType) => {
    const [content, setContent] = useState(task.content);
    const textInputRef = useRef<HTMLTextAreaElement>(null);
    const [isEdit, setIsEdit] = useState(false);
    const dispatch = useAppDispatch();

    const onSaveHandler = (e: KeyboardEvent<HTMLTextAreaElement>) => {
        if (e.key === 'Enter' || e.key === 'Escape') {
            e.preventDefault();
            if (content.trim() !== task.content) {
                dispatch(
                    updateTask({
                        id: task.id,
                        content: content.trim(),
                        isComplete: task.isComplete,
                    })
                );
            }
            textInputRef.current?.blur();
        }
    };

    useEffect(() => {
        textInputRef.current?.focus();
    }, [setIsEdit]);

    const onBlurHandler = () => {
        if (content.trim() !== task.content) {
            dispatch(
                updateTask({
                    id: task.id,
                    content: content.trim(),
                    isComplete: task.isComplete,
                })
            );
        }
        setContent(content.trim());
        setIsEdit(false);
    };

    const onRemoveHandler = () => {
        dispatch(removeTask({id: task.id}));
    };

    const onCompleteHandler = () => {
        dispatch(
            updateTask({
                id: task.id,
                content: content.trim(),
                isComplete: !task.isComplete,
            })
        );
    };

    const onChangeHandler = (e: ChangeEvent<HTMLTextAreaElement>) => {
        e.preventDefault();
        if (!task.isComplete) {
            setContent(e.target.value);
        }
    };
    const onEditHandler = () => {
        setIsEdit(true);
        textInputRef.current?.focus();
    };

    return (
        <TaskItem $isChecked={task.isComplete}>
            <Checkbox
                $isChecked={task.isComplete}
                onClickHandler={onCompleteHandler}
            />

            {isEdit && !task.isComplete ? (
                <TextArea
                    refElement={textInputRef}
                    content={content}
                    onChangeHandler={onChangeHandler}
                    onBlurHandler={onBlurHandler}
                    onKeyUpHandler={onSaveHandler}
                />
            ) : (
                <TextBlock onClickHandler={onEditHandler}>{content}</TextBlock>
            )}

            <Button onClick={onRemoveHandler}>
                <AiFillDelete/>
            </Button>
        </TaskItem>
    );
};
