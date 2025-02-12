import { createBrowserSupabaseClient } from "@/supabase/client";
import { Button, Input, Typography } from "@material-tailwind/react";
import { useMutation } from "@tanstack/react-query";
import Image from "next/image";
import { Dispatch, SetStateAction, useState } from "react";

interface SignupProps {
	setView: Dispatch<SetStateAction<"signin" | "signup">>;
}

export const Signup = ({ setView }: SignupProps) => {
	const [email, setEmail] = useState("");
	const [otp, setOtp] = useState("");
	const [password, setPassword] = useState("");
	const [confirmationRequired, setConfirmationRequired] = useState(false);

	const supabese = createBrowserSupabaseClient();

	const signupMutation = useMutation({
		mutationFn: async () => {
			const { data, error } = await supabese.auth.signUp({
				email,
				password,
				options: {
					emailRedirectTo: "http://localhost:3000/signup/confirm",
				},
			});

			if (data) {
				setConfirmationRequired(true);
			}

			if (error) {
				alert(error.message);
			}
		},
	});
	const verifyOtpMutation = useMutation({
		mutationFn: async () => {
			const { data, error } = await supabese.auth.verifyOtp({
				type: "signup",
				email,
				token: otp,
			});

			if (error) {
				alert(error.message);
			}
		},
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
					{confirmationRequired ? (
						<Input
							placeholder="인증번호를 입력해 주세요"
							label="otp"
							value={otp}
							onChange={(e) => setOtp(e.currentTarget.value)}
						/>
					) : (
						<>
							<Input
								placeholder="email"
								label="email"
								value={email}
								onChange={(e) =>
									setEmail(e.currentTarget.value)
								}
							/>
							<Input
								placeholder="password"
								label="password"
								value={password}
								type="password"
								onChange={(e) =>
									setPassword(e.currentTarget.value)
								}
							/>
						</>
					)}
					<Button
						onClick={() => {
							if (!email || !password)
								return alert(
									"이메일과 비밀번호를 확인해 주세요."
								);
							if (confirmationRequired)
								return verifyOtpMutation.mutate();
							signupMutation.mutate();
						}}
						color="light-blue"
						className="text-white px-2 py-1 text-md"
						loading={
							confirmationRequired
								? verifyOtpMutation.isPending
								: signupMutation.isPending
						}
						disabled={
							confirmationRequired
								? verifyOtpMutation.isPending
								: signupMutation.isPending
						}
					>
						{confirmationRequired ? "인증하기" : "가입하기"}
					</Button>
				</div>
			</div>

			<div className="flex flex-row gap-2 justify-center items-center p-6 border border-gray-500 bg-white">
				<Typography>이미 계정이 있으신가요?</Typography>
				<button
					className="text-light-blue-600 font-bold"
					onClick={() => setView("signin")}
				>
					로그인 하기
				</button>
			</div>
		</div>
	);
};
