import Link from "next/link";
import { getServerSession } from "next-auth"; //Tells us if there's an active logged in session
import { options } from "@/app/api/auth/[...nextauth]/options";

const NavigationBar = async () => {
	const session = await getServerSession(options);
	return (
		<header className="bg-gray-600">
			<nav className="flex justify-between items-center w-full px-3 py-4">
				<div>NextAuth</div>
				<div className="flex gap-10">
					<Link href="/">Home</Link>
					<Link href="/CreateUser">Create User (Admin)</Link>
					<Link href="/ClientMember">Member (Client)</Link>
					<Link href="/Member">Member (Server)</Link>
					<Link href="/Public">Public</Link>
					{session ? (
						<Link href="/api/auth/signout?callbackUrl=/">Logout</Link>
					) : (
						<>
							<Link href="/api/auth/signin">Login</Link>
							<Link href="/register">Register</Link>
						</>
					)}
				</div>
			</nav>
		</header>
	);
};
export default NavigationBar;
