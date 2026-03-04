import {Provider} from "react-redux";
import {store} from "@/store";
import {ThemeProvider} from "styled-components";
import {baseTheme} from "@/config/baseTheme";
import {TimerContainer} from "@/components/timer/TimerContainer";
import {TasksContainer} from "@/components/tasks/TasksContainer";
import {Layout} from "@/components/Layout";
import {StorageSync} from "@/components/StorageSync";

function App() {
    return (
        <Provider store={store}>
            <StorageSync/>
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
