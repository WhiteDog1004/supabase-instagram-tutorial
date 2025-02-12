"use client";

import { createBrowserSupabaseClient } from "@/supabase/client";
import { Button } from "@material-tailwind/react";

export const Logout = () => {
	const supabase = createBrowserSupabaseClient();

	return (
		<Button color="red" onClick={() => supabase.auth.signOut()}>
			로그아웃
		</Button>
	);
};
