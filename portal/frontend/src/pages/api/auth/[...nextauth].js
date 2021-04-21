import NextAuth from 'next-auth'
import Providers from 'next-auth/providers'

import {login} from '../../../common/services/auth'

const options = {
  providers: [
    Providers.Credentials({
      name: 'Astvision',
      async authorize(credentials) {
        const response = await login(credentials.username, credentials.password)
        console.log(response, 'auth response')
        if (response.result === true && response.data) {
          return Promise.resolve(response.data)
        } else {
          return Promise.reject(new Error(response.message))
        }
      },
    })
  ],
  site: process.env.NEXTAUTH_URL || 'http://localhost:3000',
  pages: {
    signIn: '/auth/signin',
    signOut: '/auth/signout',
    error: '/auth/signin', // Error code passed in query string as ?error=
    verifyRequest: '/auth/verify', // (used for check email message)
    newUser: null // If set, new users will be directed here on first sign in
  },
  callbacks: {
    // async signIn(user, account, profile) {
    //   return {result: true}
    // },
    // async redirect(url, baseUrl) {
    //   return url.startsWith(baseUrl)
    //     ? url
    //     : baseUrl
    // },
    async jwt(token, userData, account, profile, isNewUser) {
      userData && (token.userData = userData)
      return token
    },
    async session(session, token) {
      // console.log(token, 'callback session userData')
      session.token = token.userData && token.userData.token
      session.businessRole = token.userData && token.userData.businessRole
      return session
    },
  }
  // debug: true,
}

const Auth = (req, res) => NextAuth(req, res, options)

export default Auth
