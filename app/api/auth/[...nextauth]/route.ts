import NextAuth from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import { mockAuthService } from '@/lib/mockData';

const handler = NextAuth({
  providers: [
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        username: { label: "Username", type: "text" },
        password: { label: "Password", type: "password" }
      },
      async authorize(credentials) {
        try {
          const result = await mockAuthService.login(
            credentials?.username || '',
            credentials?.password || ''
          );
          
          if (result) {
            return {
              id: result.user.id,
              name: result.user.name,
              email: result.user.email,
              accessToken: result.accessToken,
            };
          }
          return null;
        } catch (error) {
          console.error('Authentication error:', error);
          return null;
        }
      }
    })
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.accessToken = user.accessToken;
        token.id = user.id;
      }
      return token;
    },
    async session({ session, token }) {
      if (session.user) {
        session.user.id = token.id as string;
        session.accessToken = token.accessToken as string;
      }
      return session;
    }
  },
  pages: {
    signIn: '/login',
  },
  session: {
    strategy: 'jwt',
  },
});

export { handler as GET, handler as POST }; 