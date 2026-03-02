import styled from "styled-components";
import {Button} from "@/components/ui/Button";
import {useDispatch, useSelector} from "react-redux";
import {RootState} from "@/store";
import {openTasks, closeTasks} from "@/features/settings/settingsSlice";

const CustomButton = styled(Button)`
    border-radius: var(--unit-2);
    font-size: 1rem;
`

export const ShowTasksBtn = () => {

    const isTaskShown = useSelector((state: RootState) => state.settings.config.showTasks);
    const dispatch = useDispatch();

    return (

        <>
            {isTaskShown ? (
                <CustomButton onClick={() => dispatch(closeTasks())}>
                    Скрыть задачи
                </CustomButton>
            ) : (
                <CustomButton onClick={() => dispatch(openTasks())}>
                    Показать задачи
                </CustomButton>
            )}
        </>
    )
}