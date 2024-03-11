import 'src/shared/lib/styles/index.scss';
import { withProviders } from './providers';

function App() {
   return <div />;
}

const AppWithProviders = withProviders(App);

export default AppWithProviders;
