import { ChangeEvent, FC } from 'react';
import { IOption } from 'src/shared/lib';

import styles from './styles.module.scss';
import { DamageField } from './item';
import { Button } from 'src/shared/ui/button';
import { IDice } from '../types';

interface IProps {
   fieldList: IDice[];
   options: {
      typeOptions: IOption[];
      damageTypeOptions: IOption[];
      damageEfficiencyOptions: IOption[];
   };
   change: {
      onFieldChange: (e: ChangeEvent<HTMLInputElement>) => void;
      onTypeChange: (e: ChangeEvent<HTMLSelectElement>) => void;
      onDamageTypeChange: (e: ChangeEvent<HTMLSelectElement>) => void;
      onDamageEfficiencyChange: (e: ChangeEvent<HTMLSelectElement>) => void;
   };
   createField: () => void;
   removeField: (id: string) => void;
}

export const DamageFieldsUI: FC<IProps> = ({
   fieldList,
   options,
   change,
   createField,
   removeField,
}) => {
   return (
      <div className={styles.fields}>
         <Button type="default" shape="round" onClick={createField}>
            Добавить кость урона
         </Button>
         <ul className={styles.list}>
            {fieldList.map((el) => (
               <li key={el.id} className={styles.list__item}>
                  <DamageField {...el} {...options} {...change} removeField={removeField} />
               </li>
            ))}
         </ul>
      </div>
   );
};
