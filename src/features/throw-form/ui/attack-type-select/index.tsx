import { FC, memo, useMemo } from 'react';
import { Select } from 'src/shared/ui/controls/select';
import { useAppDispatch, useAppSelector } from 'src/shared/lib';
import { attackTypeActions, throwType, getThrowTypeSelector } from 'src/entities/throw';

interface IProps {
   id: string;
}

export const AttackTypeSelect: FC<IProps> = memo(({ id }) => {
   const attackType = useAppSelector((state) => getThrowTypeSelector(state, id));
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
      dispatch(setThrowType({ id, throwType: value as throwType }));
   };

   return <Select items={selectList} currentValue={attackType} onChange={setAttackType} />;
});
