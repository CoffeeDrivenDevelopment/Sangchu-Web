import { Container as MapDiv, Marker, NaverMap, useNavermaps } from 'react-naver-maps';
import markerImg from '../../assets/images/marker.png';
import { useEffect, useRef } from 'react';

type MyMapProps = {
  lat: number;
  lng: number;
};
function MyMap({ lat, lng }: MyMapProps) {
  const navermaps = useNavermaps();
  const mapRef = useRef<naver.maps.Map | null>(null);
  useEffect(() => {
    if (mapRef.current) {
      const center = new navermaps.LatLng(lat, lng);
      mapRef.current.setCenter(center);
    }
  }, [lat, lng, navermaps]);
  return (
    <MapDiv
      style={{
        width: '100%',
        height: '70vh',
        position: 'relative',
      }}
    >
      <NaverMap
        ref={mapRef}
        defaultCenter={new navermaps.LatLng(lat, lng)}
        defaultMapTypeId={navermaps.MapTypeId.NORMAL}
        defaultZoom={16}
      >
        <Marker
          position={new navermaps.LatLng(lat, lng)}
          icon={{
            content: `
              <div style="text-align: center; position: relative;">
                <img src="${markerImg}" alt="marker" style="width: 32px; height: 32px;"/>
              </div>
            `,
          }}
        />
      </NaverMap>
    </MapDiv>
  );
}

export default MyMap;
