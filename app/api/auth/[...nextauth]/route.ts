import NextAuth from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';

const SPRING_BOOT_API = process.env.NEXT_PUBLIC_SPRING_BOOT_API || 'http://localhost:8080/api';

const handler = NextAuth({
  secret: process.env.NEXTAUTH_SECRET,
  providers: [
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        username: { label: "Username", type: "text" },
        password: { label: "Password", type: "password" }
      },
      async authorize(credentials) {
        const baseUrl = "http://localhost/api"
        try {
          const response = await fetch(`${SPRING_BOOT_API}/auth/login`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              username: credentials?.username,
              password: credentials?.password,
            }),
          });

          console.log(response);

          if (!response.ok) {
            throw new Error('Invalid credentials');
          }

          const data = await response.json();

          console.log(data);
          
          return {
            id: data.data.id,
            name: data.data.name,
            // email: data.data.email,
            accessToken: data.data.accessToken,
          };
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