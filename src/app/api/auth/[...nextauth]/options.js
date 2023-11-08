import GitHubProvider from "next-auth/providers/github";
import GoogleProvider from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials";
import User from "@/lib/db/User";
import bcrypt from "bcrypt";

// Provide array of providers we want to use
export const options = {
	providers: [
		// For manual logins
		CredentialsProvider({
			name: "credentials",
			credentials: {
				email: {
					label: "Email",
					type: "email",
					placeholder: "Enter your email",
				},
				password: {
					label: "Password",
					type: "password",
					placeholder: "Enter your password",
				},
			},
			async authorize(credentials) {
				try {
					const foundUser = await User.findOne({
						email: credentials.email.toLowerCase(),
					})
						.lean()
						.exec();

					if (foundUser) {
						console.log("User Exists");
						const match = await bcrypt.compare(
							credentials.password,
							foundUser.password
						);

						if (match) {
							console.log("Password matches");
							delete foundUser.password;

							foundUser["role"] = "Unverified Email User";
							return foundUser;
						}
					}
				} catch (error) {
					console.log(error);
				}
				return null;
			},
		}),
		GitHubProvider({
			profile(profile) {
				console.log("Github Profile: ", profile);

				//creating roles (Admin)
				let userRole = "Github User";
				if (profile?.email == "don4dolex@gmail.com") {
					userRole = "Administrator";
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
				// Create role
				let userRole = "Google User";

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
