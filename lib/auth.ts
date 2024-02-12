import * as jose from "jose";

export const AuthCookie: string = "jwt";
export const NameCookie: string = "name";
export const LocationCookie: string = "location";
export const SettingsCookie: string = "settings";
export const SalesPersonId: string = "salesPerson";

type EncodeParams = {
    locationCode: string;
    salesPersonId: string;
    email: string;
};

const alg = "HS256";

export async function encodeJwt(
    payload: any,
    secret: string,
    exp: string | number = "1 d"
) {
    const encodedSecret = new TextEncoder().encode(secret);

    return await new jose.SignJWT(payload)
        .setProtectedHeader({ alg })
        .setSubject(payload.email)
        .setExpirationTime(exp)
        .sign(encodedSecret);
}

export async function decodeJwt(jwt: string, secret: string) {
    const encodedSecret = new TextEncoder().encode(secret);
    const r = await jose.jwtVerify(jwt, encodedSecret);
    return {
        locationCode: r.payload.loc,
        salesPersonId: r.payload.spid,
        email: r.payload.sub,
    };
}
