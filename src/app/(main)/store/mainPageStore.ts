import {create} from 'zustand';

interface StoreState {
    activeId: number | null;
    setActiveId: (id: number) => void;
}
export const useStore = create<StoreState>((set) => ({
    activeId: null,
    setActiveId: (id) => set({activeId: id}),
}));
