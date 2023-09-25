export interface AuthTypes {
    tokens: UserTokens
    user: User
}

export interface UserTokens {
    accessToken: string
    refreshToken: string
}
    

export interface User {
    id: number
    username: string
}