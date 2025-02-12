"use client";

import { useState } from "react";
import { Signin } from "../Signin";
import { Signup } from "../Signup";

export const AuthClientPage = () => {
	const [view, setView] = useState<"signin" | "signup">("signup");

	return (
		<div className="flex flex-row justify-center items-center w-screen h-screen p-20 bg-gradient-to-br from-purple-50 to-light-blue-50">
			{view === "signup" ? (
				<Signup setView={setView} />
			) : (
				<Signin setView={setView} />
			)}
		</div>
	);
};
