import { createBrowserSupabaseClient } from "@/supabase/client";
import { Button, Input, Typography } from "@material-tailwind/react";
import { useMutation } from "@tanstack/react-query";
import Image from "next/image";
import { Dispatch, SetStateAction, useState } from "react";

interface SigninProps {
	setView: Dispatch<SetStateAction<"signin" | "signup">>;
}

export const Signin = ({ setView }: SigninProps) => {
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");

	const supabese = createBrowserSupabaseClient();

	const signinMutation = useMutation({
		mutationFn: async () => {
			const { data, error } = await supabese.auth.signInWithPassword({
				email,
				password,
			});

			if (error) throw error;
			return data;
		},
		onError: (error) => alert(`로그인 실패: ${error.message}`),
		onSuccess: () => alert("성공!"),
	});

	return (
		<div className="flex flex-col gap-6">
			<div className="flex flex-col justify-center items-center gap-8 p-12 border border-gray-500 bg-white">
				<Image
					width={240}
					height={60}
					src="/images/inflearngram.png"
					alt="inflearngram"
				/>
				<div className="flex flex-col gap-4 w-full">
					<Input
						placeholder="email"
						label="email"
						value={email}
						onChange={(e) => setEmail(e.currentTarget.value)}
					/>
					<Input
						placeholder="password"
						label="password"
						value={password}
						type="password"
						onChange={(e) => setPassword(e.currentTarget.value)}
					/>
					<Button
						onClick={() => signinMutation.mutate()}
						color="light-blue"
						className="text-white px-2 py-1 text-md"
						loading={signinMutation.isPending}
						disabled={signinMutation.isPending}
					>
						로그인
					</Button>
				</div>
			</div>

			<div className="flex flex-row gap-2 justify-center items-center p-6 border border-gray-500 bg-white">
				<Typography>계정이 없으신가요?</Typography>
				<button
					className="text-light-blue-600 font-bold"
					onClick={() => setView("signup")}
				>
					가입하기
				</button>
			</div>
		</div>
	);
};
