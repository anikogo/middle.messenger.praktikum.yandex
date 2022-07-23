import Router from "./Router";

export default function goToPage(page: string): void {
  const router: Router = new Router();
  router.go(page);
}
