import { FC } from 'react';

import { IOption } from 'shared/lib';
import { MyButton } from 'shared/ui/controls/my-button';
import { IDice } from 'entities/damage';

import { DamageField, IChangeActions } from './item';

import styles from './styles.module.scss';

interface IProps {
   fieldList: IDice[];
   options: {
      typeOptions: IOption[];
      damageTypeOptions: IOption[];
      damageEfficiencyOptions: IOption[];
   };
   change: IChangeActions;
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
         <MyButton onClick={createField} disabled={fieldList.length >= 3} className={styles.button}>
            Добавить кость урона
         </MyButton>
         <ul className={styles.list}>
            {fieldList.map((el) => (
               <li key={el.id} className={styles.list__item}>
                  <DamageField
                     {...el}
                     {...options}
                     changeActions={{ ...change }}
                     removeField={removeField}
                  />
               </li>
            ))}
         </ul>
      </div>
   );
};
