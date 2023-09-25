import { auth } from "~/lib/api/auth"

export function useLogout() {
    const handleLogout = async () => {
      try {
        await auth.logout();
      } catch (e) {
        throw console.error(e);
      }
      window.location.href = '/'
    }
    return handleLogout
  }