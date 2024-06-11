import { CalculatorPage } from 'src/pages/dpr-page';

import { withProviders } from './providers';
import './styles/global.scss';

function App() {
   return <CalculatorPage />;
}

const AppWithProviders = withProviders(App);

export default AppWithProviders;
