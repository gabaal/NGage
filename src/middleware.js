import { authMiddleware } from "@clerk/nextjs";

export default authMiddleware ({
  //routes that anyone can access without authorisation
  publicRoutes: ["/", "/about", "/posts", "/profile/createprofile", "/profile/signedin"]
})
// "/posts/([^/.])"

export const config = {
  matcher: ["/((?!.+\\.[\\w]+$|_next).*)", "/", "/(api|trpc)(.*)"],
}