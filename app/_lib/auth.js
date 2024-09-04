import NextAuth from "next-auth";
import Google from "next-auth/providers/google";
import { createGuest, getGuest } from "./data-service";

const authConfig = {
  providers: [
    Google({
      clientId: process.env.AUTH_GOOGLE_ID,
      clientSecret: process.env.AUTH_GOOGLE_SECRET,
    }),
  ],
  // == Sec 36 Lec 5  will check uathorization
  callbacks: {
    authorized({ auth, request }) {
      return !!auth?.user;
    },

    // == Sec 36 Lec 9
    // this signIn will run before the actual signup process happen.
    async signIn({ user, account, profile }) {
      try {
        const existingGuest = await getGuest(user.email);

        if (!existingGuest)
          await createGuest({ email: user.email, fullName: user.name });

        return true;
      } catch {
        return false;
      }
    },
    // == Sec 36 Lec 9
    // -- it will run after the signin callback and also each time the session is checked out
    async session({ session, user }) {
      const guest = await getGuest(session.user.email);
      session.user.guestId = guest.id;
      return session;
    },
  },

  // == Sec 36 Lec 6 when the autnenticaon happen user go to this login custom page instead go to provider signin page
  pages: {
    signIn: "/login",
  },
};

export const {
  auth,
  signIn,
  signOut,
  handlers: { GET, POST },
} = NextAuth(authConfig);
