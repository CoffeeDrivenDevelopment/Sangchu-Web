import { Container as MapDiv, Marker, NaverMap, useNavermaps } from 'react-naver-maps';
import { useLocation } from 'react-router-dom';
import markerImg from '../../assets/images/marker.png';
import Header from '../../components/common/Header';

function OfflineMap() {
  const location = useLocation();
  const lat = location.state.lat;
  const lng = location.state.lng;
  const name = location.state.name;
  const navermaps = useNavermaps();
  return (
    <MapDiv
      style={{
        width: '100%',
        height: '100vh',
        position: 'relative',
      }}
    >
      <Header name={location.state.name} />
      <NaverMap
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
                <div style="
                  position: absolute;
                  font-family: NanumSquareRoundEB;
                  top: -26px;
                  left: 50%;
                  transform: translateX(-50%);
                  background-color: white;
                  color: black; 
                  padding: 3px 8px;
                  border: 1px solid black; 
                  border-radius: 10px; 
                  font-size: 13px;
                  white-space: nowrap;
                ">
                  ${name}
                </div>
              </div>
            `,
          }}
        />
      </NaverMap>
    </MapDiv>
  );
}

export default OfflineMap;
