import { FC, useMemo } from 'react';
import { Select } from 'src/shared/ui/controls/select';
import { attackTypeActions, throwType } from '../model';
import { useAppDispatch, useAppSelector } from 'src/shared/lib';
import { attackTypeSelector } from '../model/selectors';

export const AttackTypeSelect: FC = () => {
   const attackType = useAppSelector(attackTypeSelector);
   const { setThrowType } = attackTypeActions;
   const dispatch = useAppDispatch();

   const selectList: { title: string; value: throwType }[] = useMemo(() => {
      return [
         { title: 'Помеха', value: 'disadvantage' },
         { title: 'Обычный', value: 'default' },
         { title: 'Преимущество', value: 'advantage' },
      ];
   }, []);

   const setAttackType = (value: string) => {
      dispatch(setThrowType(value as throwType));
   };

   return <Select items={selectList} currentValue={attackType} onChange={setAttackType} />;
};
