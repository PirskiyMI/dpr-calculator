import { FC } from 'react';

import { IOption } from 'shared/lib';
import { IDice } from 'entities/damage';

import { DamageField, IChangeActions } from './DamageField';

import styles from './DamageForm.module.scss';

interface IProps {
   fieldList: IDice[];
   options: {
      typeOptions: IOption[];
      damageTypeOptions: IOption[];
      damageEfficiencyOptions: IOption[];
   };
   change: IChangeActions;
   removeField: (id: string) => void;
}

export const DamageForm: FC<IProps> = ({ fieldList, options, change, removeField }) => {
   return (
      <div className={styles.damageForm}>
         <ul className={styles.damageForm__list}>
            {fieldList.map((el) => (
               <li key={el.id} className={styles.damageForm__item}>
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
