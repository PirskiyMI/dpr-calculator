import { AppRouter } from './router';
import { withProviders } from './providers';

import './styles/global.scss';

function App() {
   return <AppRouter />;
}

const AppWithProviders = withProviders(App);

export default AppWithProviders;
