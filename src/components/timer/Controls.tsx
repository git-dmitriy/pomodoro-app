import {FlexContainer} from '@/components/ui/FlexContainer';
import {Button} from '@/components/ui/Button';
import {FaPlay, FaPause, FaForward, FaUndoAlt} from 'react-icons/fa';
import {useAppSelector} from "@/hooks/useAppSelector";

type P = {
    startHandler: () => void;
    pauseHandler: () => void;
    resetHandler: () => void;
    switchToNextSession: () => void;
};

export const Controls = ({
                             startHandler,
                             pauseHandler,
                             resetHandler,
                             switchToNextSession,
                         }: P) => {
    const {isRunning} = useAppSelector((state) => state.timer);

    return (
        <FlexContainer $alignItems='center' $gap='.375rem'>
            {isRunning ? (
                <Button onClick={pauseHandler}>
                    <FaPause/>
                </Button>
            ) : (
                <Button onClick={startHandler}>
                    <FaPlay/>
                </Button>
            )}
            <Button onClick={switchToNextSession}>
                <FaForward/>
            </Button>
            <Button onClick={resetHandler}>
                <FaUndoAlt/>
            </Button>
        </FlexContainer>
    );
};
