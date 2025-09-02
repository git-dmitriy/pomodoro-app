import styled from 'styled-components';
import {GlobalStyles} from '@/components/ui/GlobalStyles';
import {useAppSelector} from "@/hooks/useAppSelector";
import {useSelector} from "react-redux";
import {RootState} from "@/store";
import {Toaster} from "react-hot-toast";

const StyledLayout = styled.main<{ $taskShown: boolean }>`
    inline-size: 86vw;
    block-size: 86vh;
    justify-content: center;
    display: grid;
    align-content: center;
    align-items: center;
    justify-items: center;
    grid-template-columns: ${(props) => props.$taskShown ? 'repeat(2, 1fr)' : '1fr'};

    @supports (block-size: 100dvh) {
        block-size: 86dvh;
        inline-size: 86dvw;
    }
`;

type Props = {
    children?: React.ReactNode
};

export const Layout: React.FC<Props> = ({children}) => {
    const {isRunning, mode} = useAppSelector((state) => state.timer);
    const isTasksShown = useSelector((state: RootState) => state.settings.config.showTasks);
    const backgroundColor = isRunning ? mode : 'standby';

    return (
        <StyledLayout $taskShown={isTasksShown}>
            <GlobalStyles $bg={backgroundColor}/>
            {children}
            <Toaster position="top-right"/>
        </StyledLayout>
    );
};
