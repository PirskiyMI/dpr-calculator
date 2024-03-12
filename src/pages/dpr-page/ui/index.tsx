import { useAppSelector } from 'src/shared/lib';
import { AddThrow } from 'src/widgets/add-throw';
import { getThrowsId } from 'src/widgets/add-throw/model/selectors';
import { DrpForm } from 'src/widgets/dpr-form';
import styles from './styles.module.scss';

export const DprPage = () => {
   const throwList = useAppSelector(getThrowsId);

   return (
      <div>
         <AddThrow />
         <ul className={styles.list}>
            {throwList.map((el) => (
               <li key={el}>
                  <DrpForm id={el} />
               </li>
            ))}
         </ul>
      </div>
   );
};
