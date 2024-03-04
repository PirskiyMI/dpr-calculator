import { FC, useState } from 'react';

import styles from './styles.module.scss';
import { AttackFields } from 'src/features/attack-fields';
import { AttackTypeSelect } from 'src/features/attack-type-select/ui';
import { DamageFields } from 'src/features/damage-fields';
import { SpecialProperties } from 'src/features/special-properties';
import { Button } from 'src/shared/ui/button';
import { useAppSelector } from 'src/shared/lib';
import { attackSelector } from 'src/features/attack-fields/model/selectors';
import { damageSelector } from 'src/features/damage-fields/model/selectors';
import { IAttackIndicators, getAttackDetails } from '../getAttackDetails';
import { attackTypeSelector } from 'src/features/attack-type-select/model/selectors';
import { specialPropertiesSelector } from 'src/features/special-properties/model/selectors';

export const DrpForm: FC = () => {
   const damage = useAppSelector(damageSelector);
   const modifiers = useAppSelector(specialPropertiesSelector);
   const { attack, protection } = useAppSelector(attackSelector);
   const attackType = useAppSelector(attackTypeSelector);

   const [attackIndicators, setAttackIndicators] = useState<IAttackIndicators>({
      probabilityOfMiss: 0,
      probabilityOfHit: 0,
      probabilityOfCriticalHit: 0,
      damagePerRound: 0,
   });

   const { probabilityOfMiss, probabilityOfHit, probabilityOfCriticalHit, damagePerRound } =
      attackIndicators;

   const handleCalculation = () => {
      const indicators = getAttackDetails({
         type: attackType,
         attackBonus: attack,
         defendBonus: protection,
         averageDamage: damage,
         criticalHitValues: '19-20',
         modifiers,
      });
      setAttackIndicators(indicators);
   };

   return (
      <form className={styles.form} onSubmit={(e) => e.preventDefault()}>
         <AttackFields />
         <AttackTypeSelect />
         <DamageFields />
         <SpecialProperties />

         <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
            <div>Промах: {(probabilityOfMiss * 100).toFixed(2)}%</div>
            <div>Попадание: {(probabilityOfHit * 100).toFixed(2)}%</div>
            <div>Критическое попадание: {(probabilityOfCriticalHit * 100).toFixed(2)}%</div>
            <div>Средний урон: {damagePerRound.toFixed(2)}</div>
         </div>

         <Button type="primary" shape="round" onClick={handleCalculation}>
            Посчитать
         </Button>
      </form>
   );
};
