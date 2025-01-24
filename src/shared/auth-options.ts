import { AuthOptions } from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import GoogleProvider from 'next-auth/providers/google';
import { compare, hashSync } from 'bcrypt';
import { prisma } from '../../prisma/prisma-client';
import YandexProvider from 'next-auth/providers/yandex';
import { Role } from '@prisma/client';

// Опции аутентификации для NextAuth
export const authOptions: AuthOptions = {
    providers: [
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID || '',
            clientSecret: process.env.GOOGLE_CLIENT_SECRET || '',
        }),

        YandexProvider({
            clientId: process.env.YANDEX_CLIENT_ID || '',
            clientSecret: process.env.YANDEX_CLIENT_SECRET || '',
            authorization: {
                params: { redirect_uri: 'https://asleep.online' },
            },
        }),

        CredentialsProvider({
            name: 'Credentials',
            credentials: {
                email: { label: 'Email', type: 'text' },
                password: { label: 'Password', type: 'password' },
            },
            async authorize(credentials) {
                try {
                    if (!credentials) return null;

                    const user = await prisma.user.findFirst({
                        where: { email: credentials.email },
                    });

                    if (!user || !(await compare(credentials.password, user.password!))) {
                        return null;
                    }

                    return {
                        id: user.id,
                        email: user.email!,
                        name: user.name!,
                        surname: user.surname,
                        phone: user.phone,
                        role: user.role,
                    };
                } catch (error) {
                    console.error('Ошибка авторизации через CredentialsProvider:', error);
                    return null;
                }
            },
        }),
    ],
    secret: process.env.NEXTAUTH_SECRET,
    session: {
        strategy: 'jwt',
    },
    callbacks: {
        async signIn({ user, account }) {
            try {
                if (account?.provider === 'credentials') return true;

                const existingUser = await prisma.user.findFirst({
                    where: { email: user.email },
                });

                if (!existingUser) {
                    await prisma.user.create({
                        data: {
                            email: user.email,
                            name: user.name || user.email.split('@')[0],
                            password: hashSync(user.id.toString(), 10),
                            verified: true,
                            provider: account?.provider,
                            providerId: account?.providerAccountId,
                            registrationDate: new Date(),
                        },
                    });
                }

                return true;
            } catch (error) {
                console.error('Ошибка во время signIn:', error);
                return false;
            }
        },

        async jwt({ token, user }) {
            if (user) {
                token.id = user.id;
                token.role = user.role || 'USER';
            }
            return token;
        },

        async session({ session, token }) {
            if (session?.user) {
                session.user.id = token.id as string;
                session.user.role = token.role as Role;
            }
            return session;
        },
    },
};

// Расширение типов NextAuth
import { DefaultSession, DefaultUser } from 'next-auth';
import { JWT, DefaultJWT } from 'next-auth/jwt';

declare module 'next-auth' {
    interface Session {
        user: {
            id: string;
            role: Role;
            name: string;
            email: string;
        };
    }

    interface User extends DefaultUser {
        id: string;
        role: Role;
        name: string;
        email: string;
    }
}

declare module 'next-auth/jwt' {
    interface JWT extends DefaultJWT {
        id: string;
        role: Role;
    }
}
