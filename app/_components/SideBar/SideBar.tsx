"use client";

import { createBrowserSupabaseClient } from "@/supabase/client";
import { Home, Logout, People, Search, Send } from "@mui/icons-material";
import Link from "next/link";

export const SideBar = () => {
	const supabase = createBrowserSupabaseClient();

	return (
		<aside className="h-screen w-fit p-6 border-r border-gray-300 flex flex-col justify-between">
			<div className="flex flex-col gap-4">
				<Link href={"/"}>
					<Home className="text-2xl mb-10" />
				</Link>
				<Link href={"/people"}>
					<People className="text-2xl" />
				</Link>
				<Link href={"/discover"}>
					<Search className="text-2xl" />
				</Link>
				<Link href={"/chat"}>
					<Send className="text-2xl" />
				</Link>
			</div>

			<div>
				<button
					onClick={() => {
						supabase.auth.signOut();
					}}
				>
					<Logout className="text-2xl" />
				</button>
			</div>
		</aside>
	);
};
