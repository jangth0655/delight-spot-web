'use client';

import { useAddressToCoordinate } from '@/hooks/useMap';
import { useEffect, useRef, useState } from 'react';

interface Props {
  address?: string;
}

export default function Map({ address }: Props) {
  const mapRef = useRef<HTMLDivElement>(null);
  const { x, y } = useAddressToCoordinate({
    address,
  });
  const [isNaverMapLoaded, setIsNaverMapLoaded] = useState(false);

  const isValidCoordinate = x && y;

  useEffect(() => {
    const handleScriptLoad = () => {
      if (window.naver && window.naver.maps) {
        setIsNaverMapLoaded(true);
      }
    };

    if (window.naver && window.naver.maps) {
      handleScriptLoad();
    } else {
      const script = document.getElementById('naver-map-script');
      if (script) {
        script.addEventListener('load', handleScriptLoad);
        return () => {
          script.removeEventListener('load', handleScriptLoad);
        };
      }
    }
  }, []);

  useEffect(() => {
    if (mapRef.current && isValidCoordinate && isNaverMapLoaded) {
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
  }, [isNaverMapLoaded, isValidCoordinate, x, y]);

  return <div ref={mapRef} className="h-[12rem] w-full"></div>;
}
