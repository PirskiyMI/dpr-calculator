import { FC, ReactNode } from 'react';

import { getPercentage } from 'shared/lib/helpers';

import styles from './DetailedThrow.module.scss';

export interface ICalculation {
   armorClass: number;
   probabilityOfMiss: number;
   probabilityOfHit: number;
   probabilityOfCriticalHit: number;
   damagePerRound: number;
}

interface IProps {
   fields: ReactNode;
   calculations: ICalculation[];
}

export const DetailedThrow: FC<IProps> = ({ fields, calculations }) => {
   const output = (
      <table className={styles.table}>
         <thead>
            <tr>
               <td>Класс брони</td>
               <td>Вероятность промаха</td>
               <td>Вероятность попадания</td>
               <td>Вероятность критического попадания</td>
               <td>Средний урон в раунд</td>
            </tr>
         </thead>
         <tbody>
            {calculations.map(
               ({
                  armorClass,
                  damagePerRound,
                  probabilityOfCriticalHit,
                  probabilityOfHit,
                  probabilityOfMiss,
               }) => {
                  const percentageOfMiss = getPercentage(probabilityOfMiss);
                  const percentageOfHit = getPercentage(probabilityOfHit);
                  const percentageOfCriticalHit = getPercentage(probabilityOfCriticalHit);

                  return (
                     <tr key={armorClass}>
                        <td>{armorClass}</td>
                        <td>{percentageOfMiss}</td>
                        <td>{percentageOfHit}</td>
                        <td>{percentageOfCriticalHit}</td>
                        <td>{damagePerRound.toFixed(2)}</td>
                     </tr>
                  );
               },
            )}
         </tbody>
      </table>
   );

   return (
      <div className={styles.throw}>
         <div>{fields}</div>
         <div>{output}</div>
      </div>
   );
};
