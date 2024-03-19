import { authOptions } from '@/lib/authOptions'
import NextAuth from 'next-auth'

// Define your handler function
const handler = NextAuth(authOptions)
// Export the handler and alias as GET and POST
export { handler as GET, handler as POST }
