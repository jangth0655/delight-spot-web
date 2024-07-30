import Button from '../Button';

import { IoAlertCircleOutline, IoCloseCircleOutline, IoCheckmarkCircleOutline } from 'react-icons/io5';
import ModalWrapper from './ModalWrapper';
import { useRouter } from 'next/navigation';

interface Props {
  type: 'confirm' | 'warning' | 'error';
  title?: string;
  description?: string;
  isOpen: boolean;
  close: () => void;
  backUrl?: string;
}

export default function AlertModal({ isOpen, type, title, description, close, backUrl }: Props) {
  const router = useRouter();
  const typeMap = {
    confirm: {
      icon: <IoCheckmarkCircleOutline aria-label="confirm-icon" size={40} color="#5CFF63" />,
    },
    warning: {
      icon: <IoAlertCircleOutline aria-label="warning-icon" size={40} color="#FFBD53" />,
    },
    error: {
      icon: <IoCloseCircleOutline aria-label="error-icon" size={40} color="#FF5F5F" />,
    },
  };

  const selectedType = typeMap[type];

  const onClose = () => {
    if (backUrl) {
      router.replace(backUrl);
    }
    close();
  };

  return (
    isOpen && (
      <ModalWrapper>
        <div className="flex flex-col gap-4 *:text-center">
          <div className="flex justify-center items-center">{selectedType.icon}</div>
          <h1 className="font-bold text-subtitle leading-subtitle">{title || '서비스 장애가 발생하였습니다.'}</h1>
          {description && <p className="text-body leading-body">{description}</p>}
        </div>
        <Button onClick={onClose} title="확인" size="lg" />
      </ModalWrapper>
    )
  );
}
