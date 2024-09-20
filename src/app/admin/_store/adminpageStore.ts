import create from 'zustand';

interface DashboardState {
    section: string;
    setSection: (section: string) => void;
}

export const useDashboardStore = create<DashboardState>((set) => ({
    section: 'requests', 
    setSection: (section) => set({ section }),
}));