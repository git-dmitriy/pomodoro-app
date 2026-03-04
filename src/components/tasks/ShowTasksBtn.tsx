import { BiTask } from "react-icons/bi";
import { BiTaskX } from "react-icons/bi";
import styled from "styled-components";
import {Button} from "@/components/ui/Button";
import {useDispatch, useSelector} from "react-redux";
import {RootState} from "@/store";
import {openTasks, closeTasks} from "@/features/settings/settingsSlice";

const CustomButton = styled(Button)`
    border-radius: var(--unit-2);
    font-size: 1rem;
    display: flex;
    gap: var(--unit-1);
    align-items: center;

    @media (max-width: 480px) {
        & span {
            display: none;
        }
    }
`

export const ShowTasksBtn = () => {

    const isTaskShown = useSelector((state: RootState) => state.settings.config.showTasks);
    const dispatch = useDispatch();

    return (
        <>
            {isTaskShown ? (
                <CustomButton onClick={() => dispatch(closeTasks())}>
                    <BiTaskX />
                    <span>Скрыть задачи</span>
                </CustomButton>
            ) : (
                <CustomButton onClick={() => dispatch(openTasks())}>
                    <BiTask />
                    <span>Показать задачи</span>
                </CustomButton>
            )}
        </>
    )
}