import 'next-auth'
import { DefaultSession } from 'next-auth';

//modified next auth ka User by which we can add the elements which we want to store it in token for the sessions 
declare module 'next-auth' {
    interface User {
        _id?: string,
        isVerified?: boolean,
        isAcceptingMessages?: boolean,
        username?: string
    }

    interface Session {
        user: {
            _id?: string;
            isVerified?: boolean,
            isAcceptingMessages?: boolean,
            username?: string
        } & DefaultSession['user']
    }
}

declare module 'next-auth/jwt' {
    interface JWT {
        _id?: string;
        isVerified?: boolean,
        isAcceptingMessages?: boolean,
        username?: string
    }
}