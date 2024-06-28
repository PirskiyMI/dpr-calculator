import { FC, memo } from 'react';

import { MySelect } from 'shared/ui/controls/my-select';
import { IPropsId, useAppDispatch, useAppSelector } from 'shared/lib';
import { attackTypeActions, getThrowTypeSelector, TThrow } from 'entities/attack';

import { selectorList } from '../constants/selectorList';

export const ThrowTypeSelector: FC<IPropsId> = memo(({ id }) => {
   const throwType = useAppSelector((state) => getThrowTypeSelector(state, id));
   const dispatch = useAppDispatch();

   const { setThrowType } = attackTypeActions;

   const setAttackType = (value: string) => {
      dispatch(setThrowType({ id, TThrow: value as TThrow }));
   };

   return <MySelect items={selectorList} currentValue={throwType} onChange={setAttackType} />;
});
