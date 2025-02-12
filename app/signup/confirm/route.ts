import { createServerSupabaseClient } from "@/supabase/server";
import { NextResponse } from "next/server";

export const GET = async (request: Request) => {
	const requestUrl = new URL(request.url);
	const code = requestUrl.searchParams.get("code");

	if (code) {
		const supabase = await createServerSupabaseClient();
		await supabase.auth.exchangeCodeForSession(code);

		return NextResponse.redirect(requestUrl.origin);
	}
};
