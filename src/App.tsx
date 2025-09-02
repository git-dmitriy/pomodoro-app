import {Provider} from "react-redux";
import {store} from "@/store";
import {ThemeProvider} from "styled-components";
import {baseTheme} from "@/config/baseTheme.ts";
import {TimerContainer} from "@/components/timer/TimerContainer.tsx";
import {TasksContainer} from "@/components/tasks/TasksContainer.tsx";
import {Layout} from "@/components/Layout";

function App() {


    return (
        <Provider store={store}>
            <ThemeProvider theme={baseTheme}>
                <Layout>
                    <TimerContainer/>
                    <TasksContainer/>
                </Layout>
            </ThemeProvider>
        </Provider>
    );
}

export default App;
