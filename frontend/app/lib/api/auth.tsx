interface AuthParams {
    email: string
    password: string
}

export const auth = {
    async logout() {
        return fetch('localhost:4000/api/auth/logout')
    }
}
