"use client";

//This is how we protect a client side route
import { useSession } from "next-auth/react";
import { redirect } from "next/navigation";
import { SessionProvider} from "next-auth/react"

// You can do this in a different file if you want.
export const AuthProvider = ({children}) => {
	return <SessionProvider>{children}</SessionProvider>
}


const ClientMember = () => {
	const { data: session } = useSession({
		required: true,
		onUnauthenticated() {
			redirect("/api/auth/signin?callbackUrl=/ClientMember");
		},
	});
	return (
		<div>
			<h1>Member Client Session</h1>
			<p>{session?.user?.email}</p>
			<p>{session?.user?.role}</p>
		</div>
	);
};
export default ClientMember;
