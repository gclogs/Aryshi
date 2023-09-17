import { LoaderArgs, createCookie, json } from "@remix-run/node";

export const cookie = createCookie("Set-Cookie");

export const loader = async ({request}: LoaderArgs) => {
    const cookieHeader = request.headers.get("Set-Cookie");
    const value = await cookie.parse(cookieHeader);
    
    return json(value);
}