import { Button } from 'src/shared/ui/button';
import 'src/shared/lib/styles/index.scss';
import { withProviders } from './providers';
import { Checkbox } from 'src/shared/ui/controls/checkbox';
import { useCheckbox } from 'src/shared/lib/hooks/use-checkbox';
import { Field } from 'src/shared/ui/controls/field';
import { useInputNumber } from 'src/shared/lib/hooks/use-input-number';

function App() {
   const { checked, onChange } = useCheckbox();
   const { value, onChange: onFieldChange, increment, decrement } = useInputNumber();

   return (
      <div className="container">
         <Button type="primary" size="large" shape="round">
            Button
         </Button>
         <br />
         <br />
         <Checkbox checked={checked} onChange={onChange} />
         <br />
         <Field value={value} controls={{ increment, decrement }} onChange={onFieldChange} />
      </div>
   );
}

const AppWithProviders = withProviders(App);

export default AppWithProviders;
