'use client';

import { useAddressToCoordinate } from '@/hooks/useMap';
import { useEffect, useRef } from 'react';

interface Props {
  address?: string;
}

export default function Map({ address }: Props) {
  const mapRef = useRef<HTMLDivElement>(null);
  const { x, y } = useAddressToCoordinate({
    address,
  });

  const isValidCoordinate = x && y;

  useEffect(() => {
    if (mapRef.current && isValidCoordinate) {
      const location = new naver.maps.LatLng(y, x);
      const mapOptions = {
        center: location,
        zoom: 16,
      };

      const map = new naver.maps.Map(mapRef.current, mapOptions);
      new naver.maps.Marker({
        position: location,
        map,
      });
    }
  }, [isValidCoordinate, x, y]);

  return <div ref={mapRef} className="h-[12rem] w-full"></div>;
}
