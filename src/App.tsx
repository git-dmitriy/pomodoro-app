import { Layout } from 'components/layout/Layout';
import { TimerContainer } from 'components/timer/TimerContainer';
import { TasksContainer } from 'components/tasks/TasksContainer';

function App() {
  return (
    <Layout>
      <TimerContainer />
      <TasksContainer />
    </Layout>
  );
}

export default App;
