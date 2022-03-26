import { TasksList } from 'components/tasks/tasksList';
import { Layout } from 'components/layout/Layout';
import { TimerContainer } from 'components/timer/TimerContainer';
import { GlobalStyles } from 'components/ui/GlobalStyles';

function App() {
  return (
    <Layout>
      <TimerContainer />
      <TasksList />
      <GlobalStyles />
    </Layout>
  );
}

export default App;
