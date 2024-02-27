import 'src/shared/lib/styles/index.scss';
import { withProviders } from './providers';
import { DrpForm } from 'src/widgets/dpr-form';

function App() {
   

   return (
      <div className="container">
         <DrpForm />
      </div>
   );
}

const AppWithProviders = withProviders(App);

export default AppWithProviders;
