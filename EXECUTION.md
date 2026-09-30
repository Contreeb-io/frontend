# Trust and safety redesign execution

## Scope and source

- Branch: `feat/trust-safety-figma-redesign`, started from `style/body-background-offwhite` so the existing white page and Trust grid remain in place.
- Figma: `Contreebute.io`, node `3686:19815`. The initial design context and screenshot were retrieved. Further layer calls were stopped by the connected Figma Starter plan limit.
- Scope: the existing `Verified`, `Secure`, and `Review` sections. Hero, Trust intro, waitlist, FAQs, routing, and form behavior remain untouched.

## Implementation

- Reused the existing React 19, Vite 8, Tailwind 4, Outfit/Inter fonts, and the three homepage section entry points.
- Added `trust-feature.tsx` for the shared editorial layout and `trust-safety.css` for the static compositions and responsive rules.
- Verification uses HTML cards and the exact Figma avatar, check, pending ring, badge, and divider assets.
- Payments uses HTML notification cards and the exact Figma money icon, lock, and orbital assets.
- Review uses a 4 × 3 document matrix with the exact Figma document, divider, and seal assets.
- Removed the old section assets and profile-card component after confirming they had no remaining references.

## Layout and visual review

- The retrieved Figma context showed a 1,283px review area at x=78 in a 1,440px frame, with a 514px copy area, a wider visual area, 40px Outfit headings, 24px Inter descriptions, and 156 × 176px document tiles.
- The three desktop narrative areas use 856px, 805px, and 829px vertical spans. The review document matrix is 705 × 604px.
- Browser pass one at the available 819px viewport checked the verification, payment, and review visuals. It found no failed assets or console errors. The right column could clip near desktop widths, so the intermediate grid was changed to flexible columns.
- Browser pass two rechecked payment and review after the correction. The page reported no horizontal overflow at 819px.
- The in-app browser did not expose a viewport resize capability, so 1,440px and the requested narrow widths could not be captured in this run. The CSS includes explicit tablet and mobile layouts; those sizes still need direct browser review.

## Quality checks

- `corepack yarn build`: passed, including TypeScript compilation.
- `corepack yarn node --test tests/*.test.cjs`: 9 passed.
- ESLint on changed source files: passed.
- Full `corepack yarn lint`: fails on three pre-existing `react-refresh/only-export-components` errors in `src/components/ui/toast.tsx`; no errors were reported in the redesigned files.

## Remaining fidelity checks

- Inspect deeper Figma layers when the account limit is lifted, especially exact verification-card placement, secondary opacity/blur, and payment notification shadows.
- Compare screenshots at 1,440, 1,280, 1,024, 768, 390, and 375px after browser viewport control is available.
