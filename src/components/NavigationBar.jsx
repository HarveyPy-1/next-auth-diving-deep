import Link from "next/link"

const NavigationBar = () => {
	return (
		<header className="bg-gray-600">
			<nav className="flex justify-between items-center w-full px-10 py-4">
				<div>NextAuth</div>
				<div className="flex gap-10">
					<Link href="/">Home</Link>
					<Link href="/CreateUser">Create User (Admin)</Link>
					<Link href="/ClientMember">Member (Client)</Link>
					<Link href="/Member">Member (Server)</Link>
					<Link href="/Public">Public</Link>
				</div>
			</nav>
		</header>
	);
};
export default NavigationBar;
