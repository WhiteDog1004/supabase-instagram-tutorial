import AuthProvider from "@/auth/auth-provider";
import ReactQueryClientProvider from "@/config/ReactQueryClientProvider";
import { ThemeProvider } from "@/config/material-tailwind-theme-provider";
import MainLayout from "@/layouts/MainLayout";
import { createServerSupabaseClient } from "@/supabase/server";
import type { Metadata } from "next";
import { AuthClientPage } from "./_components/AuthClientPage";
import "./globals.css";

export const metadata: Metadata = {
	title: "Dogstagram",
	description: "instagram clone",
};

export default async function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	const supabase = await createServerSupabaseClient();

	const {
		data: { session },
	} = await supabase.auth.getSession();

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
				<AuthProvider accessToken={session?.access_token}>
					<ReactQueryClientProvider>
						<ThemeProvider>
							{session?.user ? (
								<MainLayout>{children}</MainLayout>
							) : (
								<AuthClientPage />
							)}
						</ThemeProvider>
					</ReactQueryClientProvider>
				</AuthProvider>
			</body>
		</html>
	);
}
