export type StructuredExplanation = {
  goal: string;
  why: string;
  feel: string;
  mistake: string;
  recovery: string;
};

const LABELS = ["GOAL", "WHY", "FEEL", "MISTAKE", "RECOVERY"] as const;
type Label = (typeof LABELS)[number];

const LABEL_KEY: Record<Label, keyof StructuredExplanation> = {
  GOAL: "goal",
  WHY: "why",
  FEEL: "feel",
  MISTAKE: "mistake",
  RECOVERY: "recovery",
};

const LINE_PATTERN = new RegExp(`^(${LABELS.join("|")}):\\s*(.*)$`);

// Model output isn't guaranteed to match the GUARDRAILS format exactly --
// returns null on anything unrecognized so the caller can fall back to
// rendering the raw text, matching this codebase's existing
// .safeParse()-and-fall-back convention rather than throwing.
export function parseStructuredExplanation(text: string): StructuredExplanation | null {
  const sections: Partial<Record<keyof StructuredExplanation, string[]>> = {};
  let current: keyof StructuredExplanation | null = null;

  for (const rawLine of text.split("\n")) {
    const line = rawLine.trim();
    if (!line) continue;

    const match = line.match(LINE_PATTERN);
    if (match) {
      const label = match[1] as Label;
      current = LABEL_KEY[label];
      sections[current] = match[2] ? [match[2]] : [];
    } else if (current) {
      // A label's sentence wrapped onto the next line -- fold it back in.
      sections[current]!.push(line);
    }
  }

  const complete = LABELS.every((label) => {
    const value = sections[LABEL_KEY[label]];
    return value && value.join(" ").trim().length > 0;
  });
  if (!complete) return null;

  return {
    goal: sections.goal!.join(" ").trim(),
    why: sections.why!.join(" ").trim(),
    feel: sections.feel!.join(" ").trim(),
    mistake: sections.mistake!.join(" ").trim(),
    recovery: sections.recovery!.join(" ").trim(),
  };
}
