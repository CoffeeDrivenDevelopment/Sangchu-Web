import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';

type Target = {
  id: number | null;
  targetPrice: number | null;
};
type TargetProps = {
  targets: Target[];
  addTarget: (id: number | null, targetPrice: number | null) => void;
};

const storage = createJSONStorage(() => localStorage);
const useTargetPriceStore = create<TargetProps>()(
  persist(
    (set) => ({
      targets: [],
      addTarget: (id, targetPrice) =>
        set((state) => ({
          targets: [...state.targets, { id, targetPrice }],
        })),
    }),
    {
      name: 'targetPrice-store',
      storage,
    },
  ),
);

export default useTargetPriceStore;
