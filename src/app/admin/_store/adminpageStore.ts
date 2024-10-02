import { create } from 'zustand';


interface DashboardState {
    section: string;
    setSection: (section: string) => void;
}

export const useDashboardStore = create<DashboardState>((set) => ({
    section: 'requests', 
    setSection: (section) => set({ section }),
}));

interface TestRedactorState {
    isOpen: boolean;
    testId: string | null; // или другой тип, если необходимо
    setOpen: (open: boolean) => void;
    setTestId: (id: string | null) => void;
}

export const useTestRedactorStore = create<TestRedactorState>((set) => ({
    isOpen: false,
    testId: null,
    setOpen: (open) => set({ isOpen: open }),
    setTestId: (id) => set({ testId: id }),
}));