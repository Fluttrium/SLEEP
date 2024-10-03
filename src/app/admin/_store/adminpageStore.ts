import { create } from 'zustand';
import {Tests} from "@/components/admincomps/TestTable";



interface DashboardState {
    section: string;
    setSection: (section: string) => void;
}

export const useDashboardStore = create<DashboardState>((set) => ({
    section: 'requests', 
    setSection: (section) => set({ section }),
}));

interface TestStore {
    isCreating: boolean;
    createdTestId: Tests | null;
    setIsCreating: (value: boolean) => void;
    setCreatedTestId: (id: Tests| null) => void;
}

export const useTestRedactorStore = create<TestStore>((set) => ({
    isCreating: false,
    createdTestId: null,
    setIsCreating: (value) => set({ isCreating: value }),
    setCreatedTestId: (test) => set({ createdTestId: test }),
}));