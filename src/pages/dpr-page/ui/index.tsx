import { useAppSelector } from 'src/shared/lib';
import { AddThrow, ThrowForm, getThrowList } from 'src/features/throw-form';
import styles from './styles.module.scss';

export const DprPage = () => {
   const throwList = useAppSelector(getThrowList);

   return (
      <div>
         <AddThrow />
         <ul className={styles.list}>
            {throwList.map((el) => (
               <li key={el}>
                  <ThrowForm id={el} />
               </li>
            ))}
         </ul>
      </div>
   );
};
