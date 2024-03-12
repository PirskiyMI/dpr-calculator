import 'src/shared/lib/styles/index.scss';
import { withProviders } from './providers';
import { CalculatorPage } from 'src/pages/dpr-page';

function App() {
   return <CalculatorPage />;
}

const AppWithProviders = withProviders(App);

export default AppWithProviders;
