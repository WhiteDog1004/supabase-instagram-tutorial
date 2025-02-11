import { create } from "zustand";

interface SearchStoreTypes {
	searchValue: string;
	setSearchValue: (searchValue: string) => void;
}

export const useSearchStore = create<SearchStoreTypes>((set) => ({
	searchValue: "",

	setSearchValue: (searchValue) => set({ searchValue }),
}));
