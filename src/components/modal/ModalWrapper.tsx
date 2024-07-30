import { PropsWithChildren } from 'react';
import Portal from '../Portal';

export default function ModalWrapper({ children }: PropsWithChildren) {
  return (
    <Portal>
      <div className="fixed left-0 right-0 bottom-0 top-0 bg-black bg-opacity-65 z-50 flex justify-center items-center">
        <div className="min-h-[20rem] min-w-[17rem] bg-slate-S600 shadow-lg rounded-lg flex flex-col items-center justify-center *:text-slate-S200 p-6 gap-6">
          {children}
        </div>
      </div>
    </Portal>
  );
}
