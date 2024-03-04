import { useAppSelector } from 'src/shared/lib';

import styles from './styles.module.scss';
import { dicesSelector } from '../model/selectors';
import { DamageField } from './item';

export const DamageFields = () => {
   const dices = useAppSelector(dicesSelector);

   return (
      <div className={styles.fields}>
         {dices.map((el) => (
            <DamageField key={el.id} {...el} />
         ))}
      </div>
   );
};
