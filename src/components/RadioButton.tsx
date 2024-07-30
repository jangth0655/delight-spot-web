import { cls } from '@/utils/cls';

interface Props {
  checked: boolean;
}

export default function RadioButton({ checked }: Props) {
  return (
    <div
      data-testid="outer-circle"
      className={cls(
        checked ? 'bg-primary-P200' : 'bg-transparent',
        'size-6 border border-slate-S300 rounded-full flex items-center justify-center'
      )}
    >
      {checked && <div data-testid="inner-circle" className="size-2 bg-white rounded-full" />}
    </div>
  );
}
