import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';

type AddressProps = {
  address: {
    lat: number | null;
    lng: number | null;
    addressName: string | null;
  } | null;
  setAddress: (lat: number | null, lng: number | null, addressName: string | null) => void;
};

const storage = createJSONStorage(() => localStorage);
const useAddressStore = create<AddressProps>()(
  persist(
    (set) => ({
      address: null,
      setAddress: (lat, lng, addressName) => set({ address: { lat, lng, addressName } }),
    }),
    {
      name: 'address-store',
      storage,
    },
  ),
);

export default useAddressStore;
