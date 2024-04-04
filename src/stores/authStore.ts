import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
// zustand로 로그인 유저 정보를 관리하면서 발생하는 문제
// (Trouble! 비로그인 회원도 메인페이지로 접근이 가능해짐)

// 상태 관련 인터페이스 정의
interface UserData {
  access_token: string | null;
  refresh_token: string | null;
  member_id: number | null;
  nickname: string | null;
  profile_image: string | null;
}

interface AuthStore {
  userData: UserData;
  setUserData: (userData: Partial<UserData>) => void;
}
const storage = createJSONStorage(() => localStorage);
const useAuthStore = create<AuthStore>()(
  persist(
    (set) => ({
      userData: {
        access_token: null,
        refresh_token: null,
        member_id: null,
        nickname: null,
        profile_image: null,
      },
      setUserData: (userData) => set((prevUserData) => ({ ...prevUserData, ...userData })),
    }),
    {
      name: 'auth-store', // 저장소의 이름을 설정합니다.
      storage, // 사용할 스토리지를 설정합니다. 여기서는 로컬 스토리지를 사용합니다.
    },
  ),
);

export default useAuthStore;
// const useAuthStore = create<AuthStore>((set) => ({
//   userData: {
//     access_token: null,
//     refresh_token: null,
//     member_id: null,
//     nickname: null,
//     profile_image: null,
//   },
//   // setUserData: (userData) => set({ userData }),
//   setUserData: (userData) => set((prevUserData) => ({ ...prevUserData, ...userData })),
// }));

// export default useAuthStore;
// const useAuthStore = create<AuthStore>()(
//   persist(
//     (set) => ({
//       userData: {
//         access_token: null,
//         refresh_token: null,
//         member_id: null,
//         nickname: null,
//         profile_image: null,
//       },
//       setUserData: (userData: Partial<UserData>) =>
//         set((state) => ({
//           userData: {
//             ...state.userData,
//             ...userData,
//           },
//         })),
//     }),
//     {
//       name: 'auth-store', // localStorage에 저장될 때 사용될 키의 이름
//     },
//   ),
// );

// export default useAuthStore;
