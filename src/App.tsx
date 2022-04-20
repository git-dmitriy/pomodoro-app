import { TasksList } from 'components/tasks/tasksList';
import { Layout } from 'components/layout/Layout';
import { TimerContainer } from 'components/timer/TimerContainer';

function App() {
  return (
    <Layout>
      <TimerContainer />
      <TasksList />
    </Layout>
  );
}

export default App;
