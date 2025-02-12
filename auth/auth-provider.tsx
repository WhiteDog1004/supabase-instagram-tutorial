"use client";

import { createBrowserSupabaseClient } from "@/supabase/client";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function AuthProvider({ accessToken, children }) {
	const supabase = createBrowserSupabaseClient();
	const router = useRouter();

	useEffect(() => {
		const {
			data: { subscription: authListner },
		} = supabase.auth.onAuthStateChange((event, session) => {
			if (session?.access_token !== accessToken) {
				router.refresh();
			}
		});

		return () => {
			authListner.unsubscribe();
		};
	}, [accessToken, supabase, router]);

	return children;
}
