'use client';

import { cls } from '@/utils/cls';
import Image from 'next/image';
import { useEffect, useState } from 'react';
import { PanInfo, motion } from 'framer-motion';
import LoadingSpinner from '../LoadingSpinner';

interface Props {
  images: string[];
}

export default function ImageSlider({ images }: Props) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isImageLoaded, setIsImageLoaded] = useState(false);

  const handleDragImage = (event: MouseEvent | TouchEvent | PointerEvent, { offset }: PanInfo) => {
    if (!isImageLoaded) return;
    if (offset.x > 50 && currentIndex > 0) {
      setCurrentIndex((prev) => prev - 1);
    } else if (offset.x < -50 && currentIndex < images.length - 1) {
      setCurrentIndex((prev) => prev + 1);
    }
  };

  useEffect(() => {
    setIsImageLoaded(false);
  }, [currentIndex]);

  return (
    <div className="absolute w-full h-full">
      <Image
        src={images[currentIndex]}
        alt="slider_image"
        fill
        onLoad={() => {
          setIsImageLoaded(true);
        }}
        className="object-cover"
        placeholder="blur"
        blurDataURL="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mMsqgcAAWkA844c0PgAAAAASUVORK5CYII="
      />
      {!isImageLoaded && (
        <div className="border-2 absolute w-full h-full flex justify-center items-center">
          <LoadingSpinner pathColor="#111" />
        </div>
      )}
      <motion.div
        drag="x"
        dragConstraints={{ left: 0, right: 0 }}
        dragElastic={1}
        onDragEnd={(event, info) => handleDragImage(event, info)}
        key={currentIndex}
        className="absolute w-full h-full cursor-pointer"
      />
      <div className="absolute w-full bottom-2 flex items-center justify-center gap-2">
        {images.map((_, index) => (
          <div
            key={index}
            className={cls(currentIndex === index ? 'bg-slate-S100' : 'bg-slate-S400', 'size-3 rounded-full')}
          />
        ))}
      </div>
    </div>
  );
}
