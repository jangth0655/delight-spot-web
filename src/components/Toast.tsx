'use client';

import { ReactElement, useEffect } from 'react';
import { motion, AnimatePresence, Variants } from 'framer-motion';
import { HiCheckCircle, HiMiniInformationCircle, HiMiniShieldExclamation, HiMiniXCircle } from 'react-icons/hi2';

import { cls } from '@/utils/cls';
import { ToastType, useToastStore } from '@/store/useToastStore';
import Portal from './Portal';

type Props = {
  isShowing: boolean | null;
  hasNavbar?: boolean;
  isClearOnPathChange?: boolean;
};

export default function Toast({ isShowing, hasNavbar = false, isClearOnPathChange = false }: Props) {
  const { toasts, removeToast, clearToast } = useToastStore();

  useEffect(() => {
    if (isShowing && toasts.length > 0) {
      const timer = setTimeout(() => {
        removeToast(toasts[0].id);
      }, 1500);

      return () => clearTimeout(timer);
    }
  }, [isShowing, removeToast, toasts]);

  useEffect(() => {
    if (isClearOnPathChange) {
      clearToast();
    }
  }, [clearToast, isClearOnPathChange]);

  return (
    <Portal>
      <div
        className={cls(
          hasNavbar ? 'bottom-[4.125rem]' : 'bottom-2.5',
          'fixed right-0 left-0 px-4 w-sm md:w-md m-auto z-40'
        )}
      >
        {toasts.map((toast) => {
          const style = styleMap[toast.type];
          return (
            <AnimatePresence key={toast.id}>
              <motion.div
                variants={toastVariants}
                initial="initial"
                animate="visible"
                exit="exit"
                transition={{
                  ease: 'easeOut',
                  duration: 0.3,
                }}
              >
                <div
                  style={{
                    boxShadow: '0px 0px 1px 0px rgba(17, 17, 17, 0.30), 0px 8px 12px 0px rgba(17, 17, 17, 0.15)',
                  }}
                  className={`w-full mt-4 p-4 rounded-md flex items-center space-x-4 bg-slate-S800`}
                >
                  {style.icon && <div>{style.icon}</div>}
                  <p className="text-body-md font-regular leading-body-md tracking-body-md text-slate-S100">
                    {toast.message}
                  </p>
                </div>
              </motion.div>
            </AnimatePresence>
          );
        })}
      </div>
    </Portal>
  );
}

type StyleMap = {
  icon?: ReactElement;
};

const styleMap: Record<ToastType, StyleMap> = {
  base: {},
  success: { icon: <HiCheckCircle size={18} color="#00A007" /> },
  info: { icon: <HiMiniInformationCircle size={18} color="#2D47DB" /> },
  error: { icon: <HiMiniXCircle size={18} color="#FF5F5F" /> },
  warn: { icon: <HiMiniShieldExclamation size={18} color="#FFBD53" /> },
};

const toastVariants: Variants = {
  initial: {
    opacity: 0,
  },
  visible: {
    opacity: 1,
  },
  exit: {
    opacity: 0,
  },
};
