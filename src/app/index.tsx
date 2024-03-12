import 'src/shared/lib/styles/index.scss';
import { withProviders } from './providers';
import { DprPage } from 'src/pages/dpr-page';

function App() {
   return <DprPage />;
}

const AppWithProviders = withProviders(App);

export default AppWithProviders;
