import { Button } from 'src/shared/ui/button';
import 'src/shared/lib/styles/index.scss';
import { withProviders } from './providers';
import { Checkbox } from 'src/shared/ui/controls/checkbox';
import { useCheckbox } from 'src/shared/lib/hooks/use-checkbox';
import { Field } from 'src/shared/ui/controls/field';
import { useInputNumber } from 'src/shared/lib/hooks/use-input-number';
import { Select } from 'src/shared/ui/controls/select';
import { useSelect } from 'src/shared/lib/hooks/use-select';

function App() {
   const { checked, onChange } = useCheckbox();
   const { value, onChange: onFieldChange, increment, decrement } = useInputNumber();
   const { selectedValue, onChange: onSelectChange } = useSelect('Обычный');

   return (
      <div className="container">
         <Button type="primary" size="normal" shape="round">
            Button
         </Button>
         <br />
         <br />
         <Checkbox checked={checked} onChange={onChange} />
         <br />
         <Field value={value} controls={{ increment, decrement }} onChange={onFieldChange} />
         <br />
         <div style={{ display: 'flex' }}>
            <Select
               items={['Преимущество', 'Обычный', 'Помеха']}
               currentValue={selectedValue}
               onChange={onSelectChange}
            />
         </div>
      </div>
   );
}

const AppWithProviders = withProviders(App);

export default AppWithProviders;
