import { Button } from 'src/shared/ui/button';
import 'src/shared/lib/styles/index.scss';
import { withProviders } from './providers';
import { Checkbox } from 'src/shared/ui/controls/checkbox';
import { useCheckbox } from 'src/shared/lib/hooks/use-checkbox';

function App() {
   const { checked, onChange } = useCheckbox();

   return (
      <div className="container">
         <Button type="primary" size="large" shape="round">
            Button
         </Button>
         <br />
         <br />
         <Checkbox checked={checked} onChange={onChange} />
      </div>
   );
}

const AppWithProviders = withProviders(App);

export default AppWithProviders;
