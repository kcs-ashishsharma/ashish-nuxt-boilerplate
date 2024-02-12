import { AuthCookie } from "~/lib/auth";

export default defineNuxtRouteMiddleware((to:any) => {
    const jwt = useCookie(AuthCookie);
    // meta.auth
    const publicRoutes = ["auth-login", "login-error", "auth-register", "auth-forgot-password", "auth-create-account"];
    if (to.meta.auth === false) return;
    if (!jwt?.value){
        if (publicRoutes.includes(to.name))
            return;
        return navigateTo("/auth/login");
    } else if (to.name === "auth-login") return navigateTo("/");


})