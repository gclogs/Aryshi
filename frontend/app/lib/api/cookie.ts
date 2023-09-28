import { createCookie, redirect } from "@remix-run/node";

export const accessToken = createCookie("access_token", {
    maxAge: 604_800,
})

export async function extractTokenCookie(response: Response, token: string) {
    const cookieHeader = response.headers.get('Set-Cookie');
    const cookies = cookieHeader?.split('; ');
    
    let localToken: string = '';

    for (const cookie of cookies!) {
        const [name, value] = cookie.trim().split('=');
        if (name === token) {
            localToken = value;
      }

    return localToken;
    }
}

export async function setClientCookie(cookie: any) {
    return redirect("/", {
        headers: {
            "Set-Cookie": await cookie
        }
    })
}