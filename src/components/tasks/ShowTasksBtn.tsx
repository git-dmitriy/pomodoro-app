import styled from "styled-components";
import {Button} from "@/components/ui/Button.ts";
import {useDispatch, useSelector} from "react-redux";
import {RootState} from "@/store";
import {hideTasks, showTasks} from "@/features/settings/settingsSlice.ts";

const CustomButton = styled(Button)`
    border-radius: var(--unit-2);
    font-size: 1rem;
`

export const ShowTasksBtn = () => {

    const isTaskShown = useSelector((state: RootState) => state.settings.showTasks);
    const dispatch = useDispatch();

    return (

        <>
            {isTaskShown ? (
                <CustomButton onClick={() => dispatch(hideTasks())}>
                    Скрыть задачи
                </CustomButton>
            ) : (
                <CustomButton onClick={() => dispatch(showTasks())}>
                    Показать задачи
                </CustomButton>
            )}
        </>
    )
}