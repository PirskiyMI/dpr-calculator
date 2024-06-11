import { useState } from 'react';

export const useModal = () => {
   const [isModalOpen, setIsModalOpen] = useState(false);

   const toggleIsModalOpen = (isOpen: boolean) => () => setIsModalOpen(isOpen);

   return { isModalOpen, toggleIsModalOpen };
};
