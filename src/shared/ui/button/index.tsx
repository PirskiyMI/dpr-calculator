import { FC, MouseEvent, ReactNode, memo, useCallback, useRef } from 'react';
import styles from './styles.module.scss';

type ButtonType = 'primary' | 'default' | 'dashed' | 'text';
type ButtonSize = 'large' | 'normal' | 'small';
type ButtonShape = 'default' | 'circle' | 'round';

const getButtonType = (type: ButtonType) => {
   switch (type) {
      case 'primary':
         return styles.button_primary;
      case 'default':
         return styles.button_default;
      case 'dashed':
         return styles.button_dashed;
      case 'text':
         return styles.button_text;
   }
};
const getButtonSize = (size: ButtonSize) => {
   switch (size) {
      case 'large':
         return styles.button_large;
      case 'normal':
         return styles.button_normal;
      case 'small':
         return styles.button_small;
   }
};
const getButtonShape = (shape: ButtonShape) => {
   switch (shape) {
      case 'circle':
         return styles.button_shape_circle;
      case 'round':
         return styles.button_shape_round;
      default:
         return '';
   }
};
const getButtonGhost = (className: string) => `${className} ${styles.button_ghost}`;
const getButtonBlock = (className: string) => `${className} ${styles.button_block}`;

interface Props {
   type: ButtonType;
   children?: ReactNode;
   icon?: ReactNode;
   size?: ButtonSize;
   shape?: ButtonShape;
   className?: string;
   block?: boolean;
   ghost?: boolean;
   disabled?: boolean;
   onClick?: () => void;
}

export const Button: FC<Props> = memo(
   ({
      type,
      children,
      icon,
      shape = 'default',
      size = 'large',
      className,
      block = false,
      ghost = false,
      disabled = false,
      onClick,
   }) => {
      let classes = getButtonType(type);
      classes = `${classes} ${getButtonSize(size)}`;
      if (shape !== 'default') classes = `${classes} ${getButtonShape(shape)}`;
      if (block) classes = getButtonBlock(classes);
      if (ghost) classes = getButtonGhost(classes);
      if (className) classes = `${classes} ${className}`;

      const buttonRef = useRef<HTMLButtonElement>(null);

      const handleClick = useCallback(
         (event: MouseEvent) => {
            if (onClick) onClick();
            const buttonElement = buttonRef.current;
            if (buttonElement) {
               const buttonRect = buttonElement.getBoundingClientRect();
               const offsetX = event.clientX - buttonRect.left;
               const offsetY = event.clientY - buttonRect.top;

               const bubbleElement = document.createElement('div');
               bubbleElement.classList.add(styles.bubble);
               bubbleElement.style.left = `${offsetX}px`;
               bubbleElement.style.top = `${offsetY}px`;

               buttonElement.appendChild(bubbleElement);

               setTimeout(() => {
                  buttonElement.removeChild(bubbleElement);
               }, 600);
            }
         },
         [onClick],
      );

      return (
         <button
            onClick={handleClick}
            disabled={disabled}
            className={`${styles.button} ${classes}`}
            ref={buttonRef}>
            {icon}
            {children}
         </button>
      );
   },
);
