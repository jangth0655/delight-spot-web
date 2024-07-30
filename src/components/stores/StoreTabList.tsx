'use client';

import { motion } from 'framer-motion';

interface Props {
  tabList: readonly { title: string; key: string }[];
  onTabClick: (tabKey: string) => void;
  selectedTabKey: string;
  type: string;
}

export default function StoreTabList({ onTabClick, tabList, selectedTabKey, type }: Props) {
  return (
    <ul className="flex items-center gap-2 border-b">
      {tabList.map((tab) => (
        <li
          data-testid="storeList-tab"
          className="p-4 relative cursor-pointer"
          key={tab.key}
          onClick={() => onTabClick(tab.key)}
        >
          <p className={tab.key === selectedTabKey ? 'font-bold' : 'text-slate-S400'}>{tab.title}</p>
          {tab.key === selectedTabKey && (
            <motion.div layoutId={type} className="border absolute w-full border-primary-P300 bottom-0 left-0" />
          )}
        </li>
      ))}
    </ul>
  );
}
