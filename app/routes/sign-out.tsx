import { ActionFunction, LoaderFunction, redirect } from "@vercel/remix";
import { logout } from "~/utils/session.server";

// action to get the /sign-out request action from the sign out form
export const action: ActionFunction = async ({ request }) => {
  return logout(request);
};

// loader to redirect to "/" after sign out action
export const loader: LoaderFunction = async () => {
  return redirect("/");
};
