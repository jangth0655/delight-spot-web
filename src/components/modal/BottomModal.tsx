'use client';

import { AnimatePresence, Variants, motion } from 'framer-motion';
import { useRef } from 'react';
import { IoChevronBack } from 'react-icons/io5';
import Portal from '../Portal';

interface Props {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  children: React.ReactNode;
}

const initialVariants: Variants = {
  initial: { translateY: '100%' },
  animate: { translateY: '0%' },
  exit: { translateY: '100%' },
};

export default function BottomModal({ isOpen, children, title, onClose }: Props) {
  const childrenRef = useRef<HTMLDivElement | null>(null);
  return (
    <AnimatePresence>
      {isOpen && (
        <Portal>
          <div className="fixed left-0 right-0 bottom-0 top-0 z-50 flex justify-center items-center">
            <div onClick={onClose} className="absolute w-full h-full bg-black opacity-65" />
            <motion.div
              variants={initialVariants}
              initial="initial"
              animate="animate"
              exit="exit"
              transition={{
                ease: 'easeOut',
                duration: 0.3,
              }}
              className="absolute bottom-0 left-0 w-sm md:w-md m-auto right-0"
            >
              <div ref={childrenRef} className="p-4 bg-white rounded-t-lg">
                <div className="flex items-center relative mb-4">
                  <button onClick={onClose}>
                    <IoChevronBack size={20} />
                  </button>
                  <p className="text-h4 leading-h4 absolute left-1/2 -translate-x-1/2">{title}</p>
                </div>

                <div>{children}</div>
              </div>
            </motion.div>
          </div>
        </Portal>
      )}
    </AnimatePresence>
  );
}
