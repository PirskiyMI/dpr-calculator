import { FC } from 'react';

import styles from './styles.module.scss';
import { AttackFields } from 'src/features/attack-fields';
import { AttackTypeSelect } from 'src/features/attack-type-select/ui';
import { DamageFields } from 'src/features/damage-fields';
import { SpecialProperties } from 'src/features/special-properties';

export const DrpForm: FC = () => {
   return (
      <form className={styles.form} onSubmit={(e) => e.preventDefault()}>
         <AttackFields />
         <AttackTypeSelect />
         <DamageFields />
         <SpecialProperties />
      </form>
   );
};
