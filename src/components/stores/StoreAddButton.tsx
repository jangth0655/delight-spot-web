'use client';

import { useScrollProgress } from '@/hooks/useScroll';
import Link from 'next/link';
import { motion, AnimatePresence, Variants } from 'framer-motion';
import { IoAdd } from 'react-icons/io5';

const buttonVariants: Variants = {
  notScrolled: {
    width: '100px',
    transition: { duration: 0.3 },
  },
  scrolled: {
    width: '50px',
    transition: { duration: 0.3 },
  },
};

export default function StoreAddButton() {
  const { isScrolledPx } = useScrollProgress({ px: 100 });

  return (
    <div className="fixed left-0 right-4 m-auto flex items-center justify-end bottom-5 w-sm md:w-md">
      <Link href={'/store/create'} className="absolute bottom-0">
        <motion.div
          variants={buttonVariants}
          initial="notScrolled"
          animate={isScrolledPx ? 'scrolled' : 'notScrolled'}
          className="relative h-12 flex justify-center items-center px-4 bg-primary-P200 rounded-full hover:bg-primary-P300 transition-colors"
        >
          <div className="flex items-center">
            <AnimatePresence>
              {isScrolledPx ? (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="absolute flex items-center justify-center right-0 left-0"
                >
                  <IoAdd size={24} color="white" />
                </motion.div>
              ) : (
                <motion.span
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="text-body leading-body text-white font-bold absolute left-0 right-0 flex justify-center items-center"
                >
                  작성하기
                </motion.span>
              )}
            </AnimatePresence>
          </div>
        </motion.div>
      </Link>
    </div>
  );
}
