import NextAuth from "next-auth"
import CredentialsProvider from "next-auth/providers/credentials"

export default NextAuth({
  providers: [
    CredentialsProvider({
      async authorize(user) {
        return {
          "id": user._id,
          "email": user.email,
          "name": user.name,
          "image":user._id

        }

      },
    }),
  ],
  
})
