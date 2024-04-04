type addressProps = {
    lat: string | null;
    lng: string | null;
    addressName: string | null;
  };
  
  type DaumPostcodeData = {
    address: string;
    addressType: 'R' | 'J';
    bname: string;
    buildingName: string;
  };