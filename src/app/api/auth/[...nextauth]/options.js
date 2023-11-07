import GitHubProvider from "next-auth/providers/github";
import GoogleProvider from "next-auth/providers/google";

// Provide array of providers we want to use
export const options = {
	providers: [
		GitHubProvider({
			profile(profile) {
				console.log("Github Profile: ", profile);

				//creating roles (Admin)
				let userRole = "Github User";
				if (profile?.email == "don4dolex@gmail.com") {
					userRole = "admin";
				}

				return {
					...profile,
					role: userRole,
				};
			},
			clientId: process.env.GITHUB_ID,
			clientSecret: process.env.GITHUB_SECRET,
		}),
		GoogleProvider({
			profile(profile) {
				console.log("Google Profile: ", profile);
				// No role for google user
				return {
					...profile,
					id: profile.sub,
					role: userRole,
				};
			},
			clientId: process.env.GOOGLE_ID,
			clientSecret: process.env.GOOGLE_SECRET,
		}),
	],
	callbacks: {
        // server login?
		async jwt({ token, user }) {
			if (user) token.role = user.role;
			return token;
		},
        // client side login?
		async session({ session, token }) {
			if (session?.user) session.user.role = token.role;
			return session;
		},
	},
};
