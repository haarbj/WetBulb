import "server-only";

import { createClient } from "@supabase/supabase-js";

// Bypasses RLS entirely -- only for the narrow, specific operations that
// genuinely need it (reading/writing coach_invites, which has zero RLS
// policies for authenticated/anon on purpose; see the access-control
// migration). The `server-only` import hard-fails any accidental import
// from client-bundled code, since this key must never reach the browser.
export function createServiceRoleClient() {
  return createClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, process.env.SUPABASE_SERVICE_ROLE_KEY!, {
    auth: { autoRefreshToken: false, persistSession: false },
  });
}
