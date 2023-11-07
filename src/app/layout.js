import NavigationBar from "@/components/NavigationBar";
import "./globals.css";
import { AuthProvider } from "./ClientMember/page";

export const metadata = {
	title: "Learning Next Auth",
	description: "All about NextJS authentication",
};

export default function RootLayout({ children }) {
	return (
		<html lang="en">
			<AuthProvider>
				<body className="bg-gray-100">
					<NavigationBar />

					<div className="m-2">{children}</div>
				</body>
			</AuthProvider>
		</html>
	);
}
