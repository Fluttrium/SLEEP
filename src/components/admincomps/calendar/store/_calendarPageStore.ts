import { create } from "zustand";

interface CalendarPageStateStoreInterface {
    currentSection: string;
    setCurrentSection: (section: string) => void;
}

export const useCalendarPageStateStore = create<CalendarPageStateStoreInterface>((set) => ({
    currentSection: "default",
    setCurrentSection: (section) => set({ currentSection: section }),
}));