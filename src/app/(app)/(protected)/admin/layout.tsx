import { redirect } from "next/navigation";

import { getAppSession } from "@/lib/auth/session";

export default async function AdminLayout({ children }: { children: React.ReactNode }) {
  const session = await getAppSession();
  if (!session?.isAdmin) redirect("/dashboard");

  return children;
}
