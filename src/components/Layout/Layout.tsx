import styled from 'styled-components';
import {GlobalStyles} from '@/components/ui/GlobalStyles';
import {useAppSelector} from "@/hooks/useAppSelector";
import {useSelector} from "react-redux";
import {RootState} from "@/store";
import {Toaster} from "react-hot-toast";

const StyledLayout = styled.main<{ $taskShown: boolean }>`
    //inline-size: 96vw;
    inline-size: 100vw;
    justify-content: center;
    display: grid;
    align-content: center;
    align-items: center;
    justify-items: center;
    grid-template-columns: ${(props) => props.$taskShown ? 'repeat(auto-fit, minmax(28rem, 1fr))' : '1fr'};

    @media (max-width: 600px) {
        display: block;
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
