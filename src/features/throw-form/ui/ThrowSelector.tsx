import { FC, memo } from 'react';

import { MySelect } from 'shared/ui/controls/my-select';
import { useAppDispatch, useAppSelector } from 'shared/lib';
import { attackTypeActions, throwType, getThrowTypeSelector } from 'entities/throw';

interface IProps {
   id: string;
}

const selectList = [
   { title: 'Помеха', value: 'disadvantage' },
   { title: 'Обычный', value: 'default' },
   { title: 'Преимущество', value: 'advantage' },
];

export const ThrowSelector: FC<IProps> = memo(({ id }) => {
   const attackType = useAppSelector((state) => getThrowTypeSelector(state, id));
   const { setThrowType } = attackTypeActions;
   const dispatch = useAppDispatch();

   const setAttackType = (value: string) => {
      dispatch(setThrowType({ id, throwType: value as throwType }));
   };

   return <MySelect items={selectList} currentValue={attackType} onChange={setAttackType} />;
});
