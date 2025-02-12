import { createServerSupabaseClient } from "@/supabase/server";
import { Logout } from "./_components/Logout";

export default async function Home() {
	const supabase = await createServerSupabaseClient();

	const {
		data: { session },
	} = await supabase.auth.getSession();

	return (
		<div className="w-full h-screen flex flex-col gap-4 justify-center items-center">
			<h1>Welcome {session?.user.email?.split("@")[0]}</h1>
			<Logout />
		</div>
	);
}
