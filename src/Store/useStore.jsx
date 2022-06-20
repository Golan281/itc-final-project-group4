import create from "zustand";
import { persist } from "zustand/middleware";

const useStore = create(
  persist(
    (set) => ({
      links: [],
      setLinks: (value) => {
        set((state) => ({
          links: [value, ...state.links],
        }));
      },

      userWorkSpace: [],
      addTab: (tab) => {
        set((state) => ({
          userWorkSpace: [tab, ...state.userWorkSpace],
        }));
      },

      removeTab: (tabId) => {
        set((state) => ({
          userWorkSpace: state.userWorkSpace.filter(
            (item) => item.id !== tabId
          ),
        }));
      },
    }),

    {
      name: "workSpaceStorage",
      getStorage: () => sessionStorage,
    }
  )
);

export default useStore;
