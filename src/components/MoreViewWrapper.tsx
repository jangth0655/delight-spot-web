import { AnimatePresence, motion, Variants } from 'framer-motion';

interface Props {
  isOpen: boolean;
  children: React.ReactNode;
  top: string | number;
  right: string | number;
  isAnimate?: boolean;
}

const variants: Variants = {
  initial: {
    translateY: '-100%',
    opacity: 0,
  },
  animate: {
    translateY: '0',
    opacity: 1,
  },
  exit: {
    translateY: '-100%',
    opacity: 0,
  },
};

export default function MoreViewWrapper({ isOpen, children, right, top, isAnimate = true }: Props) {
  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          variants={isAnimate ? variants : undefined}
          initial="initial"
          animate="animate"
          exit="exit"
          transition={{
            ease: 'easeOut',
            duration: 0.3,
          }}
          style={{
            top,
            right,
          }}
          className="absolute min-w-[172px] bg-white shadow-md rounded-lg"
        >
          {children}
        </motion.div>
      )}
    </AnimatePresence>
  );
}
