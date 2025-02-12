import { SideBar } from "@/app/_components/SideBar";

const MainLayout = ({ children }) => {
	return (
		<div className="flex flex-row">
			<SideBar />
			{children}
		</div>
	);
};

export default MainLayout;
