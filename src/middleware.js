import { withAuth } from "next-auth/middleware";
import { NextResponse } from "next/server";

// You only need this line of code below and the export statement at the end
// export { default } from "next-auth/middleware";

// We are doing this because we also want to implement 'only admins' for this page
export default withAuth(
	function middleware(req) {
		console.log(req.nextUrl.pathname);
		console.log(req.nextauth.token.role);

		// If the url matches and the role is not administrator, redirect to "denied",
		if (
			req.nextUrl.pathname.startsWith("/CreateUser") &&
			req.nextauth.token.role != "Administrator"
		) {
			return NextResponse.rewrite(new URL("/Denied", req.url));
		}
	},
	{
        // else, check if they at least have a valid token/session, if they do, let them in
		callbacks: {
			authorized: ({ token }) => !!token, //!! Coerces a value into boolean(true/false), so whatever the value of token, it'll be true if truthy or false if falsy, depending on the value
		},
	}
);

export const config = { matcher: ["/CreateUser"] };
