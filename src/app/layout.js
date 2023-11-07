import NavigationBar from "@/components/NavigationBar";
import "./globals.css";

export const metadata = {
	title: "Learning Next Auth",
	description: "All about NextJS authentication",
};

export default function RootLayout({ children }) {
	return (
		<html lang="en">
			<body className="bg-gray-100">
				<NavigationBar />
				<div className="m-2">{children}</div>
			</body>
		</html>
	);
}
