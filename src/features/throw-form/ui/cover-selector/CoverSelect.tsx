import { ChangeEvent, FC, useCallback, useMemo } from 'react';

import { IOption, useAppDispatch, useAppSelector } from 'src/shared/lib';
import { Dropdown } from 'src/shared/ui/controls/dropdown';
import {
   Cover,
   CoverOnRu,
   getSpecialPropertiesSelector,
   specialPropertiesActions,
} from 'src/entities/throw';

import styles from './CoverSelect.module.scss';

interface IProps {
   id: string;
}

export const CoverSelector: FC<IProps> = ({ id }) => {
   const { setCover } = specialPropertiesActions;
   const { cover } = useAppSelector((state) => getSpecialPropertiesSelector(state, id));
   const dispatch = useAppDispatch();

   const coverOptions = useMemo(() => {
      const options: IOption[] = [];
      for (const key in Cover) {
         options.push({ title: CoverOnRu[key as keyof typeof CoverOnRu], value: key });
      }
      return options;
   }, []);

   const onCoverChange = useCallback(
      (e: ChangeEvent<HTMLSelectElement>) => {
         const cover = e.target.value as keyof typeof Cover;
         dispatch(setCover({ id, cover }));
      },
      [dispatch, id, setCover],
   );

   return (
      <div className={styles.cover}>
         <span>Укрытие</span>
         <Dropdown
            name={id}
            defaultValue={cover.toUpperCase()}
            options={coverOptions}
            onChange={onCoverChange}
         />
      </div>
   );
};
