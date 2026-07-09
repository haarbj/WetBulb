"use server";

import { createServiceRoleClient } from "@/lib/db/service-role";

// coach_invites has zero RLS policies for authenticated/anon by design (see
// the access-control migration) -- resolving a token to build the signup
// page's prefilled-email UI has to go through the service-role client, same
// as the admin invite-management actions. This is read-only and returns
// nothing beyond the email itself, so there's no meaningful exposure beyond
// "does this token correspond to a still-pending invite."
export async function resolveInvite(token: string): Promise<{ email: string } | null> {
  if (!token) return null;

  const admin = createServiceRoleClient();
  const { data } = await admin
    .from("coach_invites")
    .select("email")
    .eq("token", token)
    .is("redeemed_at", null)
    .maybeSingle();

  return data ? { email: data.email } : null;
}
