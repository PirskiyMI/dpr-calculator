import { FC, ButtonHTMLAttributes, ReactNode, memo } from 'react';
import styles from './styles.module.scss';

type ButtonType = 'primary' | 'secondary';

interface Props
   extends Pick<ButtonHTMLAttributes<HTMLButtonElement>, 'onClick' | 'disabled' | 'type'> {
   uiType?: ButtonType;
   children?: ReactNode;
   icon?: ReactNode;
   className?: string;
}

export const MyButton: FC<Props> = memo(
   ({ uiType = 'primary', children, icon, className, ...props }) => {
      let classes =
         uiType === 'primary'
            ? `${styles.button} ${styles.button_primary}`
            : `${styles.button} ${styles.button_secondary}`;
      classes = className ? `${classes} ${className}` : classes;

      return (
         <button {...props} className={classes}>
            {icon}
            {children}
         </button>
      );
   },
);
