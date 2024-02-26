import { Button } from 'src/shared/ui/button';
import 'src/shared/lib/styles/index.scss';
import { withProviders } from './providers';

function App() {
   return (
      <div className="container">
         <Button type="primary" size="large" shape="round">
            Button
         </Button>
      </div>
   );
}

const AppWithProviders = withProviders(App);

export default AppWithProviders;
