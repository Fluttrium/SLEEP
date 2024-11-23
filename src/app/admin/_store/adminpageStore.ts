import { create } from 'zustand';
import {Tests} from "@/components/admincomps/TestTable";
import {Category, } from "@prisma/client";

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



interface PostStore {
    isCreatingPost: boolean;
    createdPost: Post | null;
    setIsCreatingPost: (value: boolean) => void;
    setCreatedTestPost: (id: Post | null) => void;
}

export const usePostRedactorStore = create<PostStore>((set) => ({
    isCreatingPost: false,
    createdPost: null,
    setIsCreatingPost: (value) => set({ isCreatingPost: value }),
    setCreatedTestPost: (post) => set({ createdPost: post }),
}));

interface UserStore {
    id: string;
    name: string;
    surname: string;
    password?: string; // Если не нужно хранить пароль, сделайте его необязательным

    // Методы для обновления состояния
    setUser: (user: { id: string; name: string; surname: string; password?: string }) => void;
    clearUser: () => void;
}

export const useUserStore = create<UserStore>((set) => ({
    id: "",
    name: "",
    surname: "",
    password: "",
    setUser: (user) => set({ id: user.id, name: user.name, surname: user.surname, password: user.password }),
    // Очистка данных пользователя
    clearUser: () => set({ id: "", name: "", surname: "", password: "" }),
}));