import {AuthOptions} from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import GoogleProvider from 'next-auth/providers/google';
import {compare, hashSync} from 'bcrypt';
import {prisma} from "../../prisma/prisma-client";
import {User as PrismaUS} from "@prisma/client";


// Расширение типов next-auth
declare module "next-auth" {
    interface User extends PrismaUS {
        id: string;
        role: string;
    }

    interface Session {
        user: User;
    }

    interface JWT {
        id: string;
        role: string;
    }
}

// Опции аутентификации для NextAuth
export const authOptions: AuthOptions = {
    providers: [
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID || '',
            clientSecret: process.env.GOOGLE_CLIENT_SECRET || '',
        }),
        CredentialsProvider({
            name: 'Credentials',
            credentials: {
                email: {label: 'Email', type: 'text'},
                password: {label: 'Password', type: 'password'},
            },
            async authorize(credentials) {
                if (!credentials) {
                    return null;
                }

                const user = await prisma.user.findFirst({
                    where: {email: credentials.email},
                });

                if (!user || !(await compare(credentials.password, user.password!))) {
                    return null;
                }

                return {
                    id: user.id,
                    email: user.email,
                    name: user.name,
                    surname: user.surname,
                    phone: user.phone,
                    role: user.role,
                } as PrismaUS;
            },
        }),
    ],
    secret: process.env.NEXTAUTH_SECRET,
    session: {
        strategy: 'jwt',
    },
    callbacks: {
        async signIn({user, account}) {
            if (account?.provider === 'credentials') {
                return true;
            }

            const existingUser = await prisma.user.findFirst({
                where: {email: user.email},
            });

            if (!existingUser) {
                // Создаем нового пользователя
                await prisma.user.create({
                    data: {
                        email: user.email,
                        name: user.name || 'User #' + user.id,
                        password: hashSync(user.id.toString(), 10),
                        verified: true,
                        provider: account?.provider,
                        providerId: account?.providerAccountId,
                    },
                });
            }

            return true;
        },

        async jwt({token, user}) {
            // При первом входе (после успешной аутентификации) добавляем id пользователя в JWT
            if (user) {
                token.id = user.id; // Добавляем id пользователя
                token.role = user.role; // Добавляем роль пользователя
            }
            return token;
        },

        async session({session, token}) {
            // Добавляем id и роль пользователя в сессию
            if (session?.user) {
                session.user.id = token.id as string; // Берем id из токена
                session.user.role = token.role as string; // Берем роль из токена
            }
            return session;
        },
    },
};
