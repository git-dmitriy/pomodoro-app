import { Layout } from 'components/layout/Layout';
import { TimerContainer } from 'components/timer/TimerContainer';
import { TasksContainer } from 'components/tasks/TasksContainer';
import { ThemeProvider } from 'styled-components';
import { baseTheme } from 'theme';

function App() {
  return (
    <ThemeProvider theme={baseTheme}>
      <Layout>
        <TimerContainer />
        <TasksContainer />
      </Layout>
    </ThemeProvider>
  );
}

export default App;
