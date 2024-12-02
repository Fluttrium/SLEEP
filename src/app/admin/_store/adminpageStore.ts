import { create } from "zustand";
import { Tests } from "@/components/admincomps/TestTable";
import { Category } from "@prisma/client";

// Интерфейс для постов
interface Post {
    id: number;
    createdAt: Date;
    updatedAt: Date;
    title: string;
    body: string;
    published: boolean;
    authorId: number;
    categories: Category[];
}

// Стор для управления секциями дашборда
interface DashboardState {
    section: string;
    setSection: (section: string) => void;
}

export const useDashboardStore = create<DashboardState>((set) => ({
    section: "requests",
    setSection: (section) => set({ section }),
}));

// Стор для редактирования тестов
interface TestStore {
    isCreating: boolean;
    createdTestId: Tests | null;
    setIsCreating: (value: boolean) => void;
    setCreatedTestId: (id: Tests | null) => void;
}

export const useTestRedactorStore = create<TestStore>((set) => ({
    isCreating: false,
    createdTestId: null,
    setIsCreating: (value) => set({ isCreating: value }),
    setCreatedTestId: (test) => set({ createdTestId: test }),
}));

// Стор для редактирования постов
interface PostStore {
    isCreatingPost: boolean;
    createdPost: Post | null;
    setIsCreatingPost: (value: boolean) => void;
    setCreatedPost: (post: Post | null) => void;
}

export const usePostRedactorStore = create<PostStore>((set, get) => ({
    isCreatingPost: false,
    createdPost: null,
    setIsCreatingPost: (value) => set({ isCreatingPost: value }),
    setCreatedPost: (post) => set({ createdPost: post }),
    isPostCreated: () => Boolean(get().createdPost), // Производное состояние
}));

// Стор для управления данными пользователя
interface UserStore {
    id: string;
    name: string;
    surname: string;
    nick: string;
    setUser: (user: { id: string; name: string; surname: string; nick?: string }) => void;
    setName: (name: string) => void;
    setNick: (nick: string) => void;
    setSurname: (surname: string) => void;
    clearUser: () => void;
}

export const useUserStore = create<UserStore>((set) => ({
    id: "",
    name: "",
    surname: "",
    nick: "",
    setUser: (user) =>
        set({
            id: user.id,
            name: user.name,
            surname: user.surname,
            nick: user.nick || "",
        }),
    setName: (name) => set({ name }),
    setNick: (nick) => set({ nick }),
    setSurname: (surname) => set({ surname }),
    clearUser: () => set({ id: "", name: "", surname: "", nick: "" }),
}));
