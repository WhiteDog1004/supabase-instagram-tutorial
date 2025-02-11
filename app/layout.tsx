import ReactQueryClientProvider from "@/config/ReactQueryClientProvider";
import { ThemeProvider } from "@/config/material-tailwind-theme-provider";
import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
	title: "Dogstagram",
	description: "instagram clone",
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang="en">
			<head>
				<link
					rel="stylesheet"
					href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.2.1/css/all.min.css"
					integrity="sha512-MV7K8+y+gLIBoVD59lQIYicR65iaqukzvf/nwasF0nqhPay5w/9lJmVM2hMDcnK1OnMGCdVK+iQrJ7lzPJQd1w=="
					crossOrigin="anonymous"
					referrerPolicy="no-referrer"
				/>
			</head>
			<body>
				<ReactQueryClientProvider>
					<ThemeProvider>{children}</ThemeProvider>
				</ReactQueryClientProvider>
			</body>
		</html>
	);
}
