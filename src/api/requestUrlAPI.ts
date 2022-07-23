export const getUrlManageUserToChat: string = "https://ya-praktikum.tech/api/v2/chats/users";
export const getUrlManageChats: string = "https://ya-praktikum.tech/api/v2/chats";
export const getUrlUsersSearch: string = "https://ya-praktikum.tech/api/v2/user/search";
export const getUrlChangeUserData: string = "https://ya-praktikum.tech/api/v2/user/profile";
export const getUrlChangeUserPassword: string = "https://ya-praktikum.tech/api/v2/user/password";
export const getUrlAuthUser: string = "https://ya-praktikum.tech/api/v2/auth/user";
export const getUrlLogoutUser: string = "https://ya-praktikum.tech/api/v2/auth/logout";
export const getUrlLoginUser: string = "https://ya-praktikum.tech/api/v2/auth/signin";
export const getUrlRegisterUser: string = "https://ya-praktikum.tech/api/v2/auth/signup";

export function getUrlTokenRequest(chatId: number) {
  return `https://ya-praktikum.tech/api/v2/chats/token/${chatId}`;
}
