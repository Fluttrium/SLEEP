import {create} from 'zustand';

import {persist} from "zustand/middleware";

interface StoreState {
    activeId: number | null;
    setActiveId: (id: number) => void;
}





export const useStore = create<StoreState>((set) => ({
    activeId: null,
    setActiveId: (id) => set({activeId: id}),
}));


