import Script from 'next/script';

export default function StoreDetailLayout({ children }: { children: React.ReactNode }) {
  return (
    <section>
      <Script
        id="naver-map-script"
        type="text/javascript"
        src={`https://oapi.map.naver.com/openapi/v3/maps.js?ncpClientId=${process.env
          .NEXT_PUBLIC_NMAP_KEY!}&submodules=geocoder`}
      />
      {children}
    </section>
  );
}
