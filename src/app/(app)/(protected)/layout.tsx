import { redirect } from "next/navigation";

import { getAppSession } from "@/lib/auth/session";

export default async function ProtectedLayout({ children }: { children: React.ReactNode }) {
  const session = await getAppSession();
  if (!session) redirect("/login");
  if (!session.approved && !session.isAdmin) redirect("/pending");

  return children;
}
