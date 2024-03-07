import 'src/shared/lib/styles/index.scss';
import { withProviders } from './providers';
import { DrpForm } from 'src/widgets/dpr-form';

function App() {
   return <DrpForm />;
}

const AppWithProviders = withProviders(App);

export default AppWithProviders;
