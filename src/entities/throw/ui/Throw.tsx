import { FC, ReactNode, memo } from 'react';

import { useModal } from 'shared/lib';
import { MyButton } from 'shared/ui/controls/my-button';
import { Modal } from 'shared/ui/modal';

import { getPercentage } from '../lib/helpers/get-percentage';
import { Output } from './output/Output';
import styles from './Throw.module.scss';

interface IProps {
   actionMenu: ReactNode;
   controls: {
      damageFields: ReactNode;
      throwFields: ReactNode;
      throwSelect: ReactNode;
      coverSelect: ReactNode;
      checkboxes: ReactNode;
      calculationButton: ReactNode;
   };
   params: {
      probabilityOfMiss: number;
      probabilityOfHit: number;
      probabilityOfCriticalHit: number;
      damagePerRound: number;
   };
}

export const Throw: FC<IProps> = memo(
   ({
      actionMenu,
      controls: {
         damageFields,
         throwFields,
         throwSelect,
         coverSelect,
         checkboxes,
         calculationButton,
      },
      params: { probabilityOfMiss, probabilityOfHit, probabilityOfCriticalHit, damagePerRound },
   }) => {
      const { isModalOpen, toggleIsModalOpen } = useModal();

      const missPercentage = getPercentage(probabilityOfMiss);
      const hitPercentage = getPercentage(probabilityOfHit);
      const criticalHitPercentage = getPercentage(probabilityOfCriticalHit);

      const throwOutputs = (
         <ul className={styles.throw__outputs}>
            <Output title="Вероятность промаха" value={missPercentage} isProbability />
            <Output title="Вероятность попадание" value={hitPercentage} isProbability />
            <Output title="Вероятность крита" value={criticalHitPercentage} isProbability />
            <Output title="Средний урон" value={damagePerRound.toFixed(2)} />
         </ul>
      );

      return (
         <>
            <div className={styles.throw}>
               <div className={styles.throw__wrapper}>
                  <div className={styles.throw__header}>
                     <MyButton uiType="secondary" onClick={toggleIsModalOpen(true)}>
                        Text
                     </MyButton>
                     {actionMenu}
                  </div>
                  <div className={styles.throw__select}>{throwSelect}</div>
                  <div className={styles.throw__main}>
                     <div>{throwFields}</div>
                     <div>{coverSelect}</div>
                  </div>
                  <div className={styles.throw__checkboxes}>{checkboxes}</div>
                  {throwOutputs}
                  {calculationButton}
               </div>
            </div>
            {isModalOpen ? (
               <Modal closeModal={toggleIsModalOpen(false)}>{damageFields}</Modal>
            ) : null}
         </>
      );
   },
);
