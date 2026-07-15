// Backs the admin "linked article" picker (see linked-section-picker.tsx)
// -- lets an admin find the exact value the questions.linked_section_slug
// column expects (a bare section slug, or "slug#heading-anchor") by
// searching or browsing instead of hand-typing it, which is exactly how
// a stray anchor mismatch slipped through before (see resolveLinkedSection
// in sections.ts for the read-side half of this fix).

import { categoryMap, sections } from "@/lib/sections";
import { headingId } from "@/lib/heading-id";

export type LinkableTarget = {
  /** What gets stored in questions.linked_section_slug. */
  value: string;
  /** The heading text, or the section's own title for a whole-page target. */
  label: string;
  sectionTitle: string;
  sectionSlug: string;
  categoryTitle: string;
  categorySlug: string;
};

/**
 * Every real, linkable target on the site: one whole-page entry per
 * section, plus one entry per heading inside it. Built from the exact
 * same section/content/heading data the pages render from (and the same
 * headingId() the anchors themselves use), so a target returned here is
 * guaranteed to resolve via resolveLinkedSection -- there's no way for
 * this list and the real pages to drift apart.
 */
export function buildLinkableTargets(): LinkableTarget[] {
  const targets: LinkableTarget[] = [];

  for (const section of sections) {
    const category = categoryMap.get(section.category);
    if (!category) continue;

    targets.push({
      value: section.slug,
      label: section.title,
      sectionTitle: section.title,
      sectionSlug: section.slug,
      categoryTitle: category.title,
      categorySlug: category.slug,
    });

    for (const block of section.content ?? []) {
      if (block.type === "heading") {
        targets.push({
          value: `${section.slug}#${headingId(block.text)}`,
          label: block.text,
          sectionTitle: section.title,
          sectionSlug: section.slug,
          categoryTitle: category.title,
          categorySlug: category.slug,
        });
      }
    }
  }

  return targets;
}

const RESULT_LIMIT = 20;

/**
 * Filters `targets` by a free-text query against the heading/section
 * label, ranking a label that starts with the query above one that just
 * contains it, and a label match above a section-title-only match --
 * capped so a broad query (e.g. "the") doesn't dump the entire site.
 */
export function searchLinkableTargets(query: string, targets: LinkableTarget[]): LinkableTarget[] {
  const normalized = query.trim().toLowerCase();
  if (!normalized) return [];

  const scored = targets
    .map((target) => {
      const label = target.label.toLowerCase();
      const sectionTitle = target.sectionTitle.toLowerCase();
      let score = -1;
      if (label.startsWith(normalized)) score = 3;
      else if (label.includes(normalized)) score = 2;
      else if (sectionTitle.includes(normalized)) score = 1;
      return { target, score };
    })
    .filter((entry) => entry.score >= 0)
    .sort((a, b) => b.score - a.score || a.target.label.length - b.target.label.length);

  return scored.slice(0, RESULT_LIMIT).map((entry) => entry.target);
}
