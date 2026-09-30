# Implementation learnings

## Hero fidelity pass

- The original hero was 620px tall, used a centered `cover` image with 2px blur, and had no independent tint or fade. The header's 1280px maximum width and padding placed it too far inward. The description's `46ch` width also produced different line breaks.
- The supplied screenshot uses the same hands photograph found at `/hero-image.jpg`. Separating the image, color tint, and vertical gradient made it possible to move the hands upward while fading the photograph before the headline.
- A width-based background size worked at desktop widths but left a visible image edge at 768 × 1024. Sizing the image by hero height at tablet widths removed that edge.
- The reference screenshot provides visual placement but no inspectable Figma values. Color, blur, crop, and responsive positions remain visual approximations.
- The waitlist's validation, mutation, loading, success, and error logic were left in place. The visual pass changed only its layout classes. An invalid email still displays the existing validation message; no live waitlist request was sent during review.

## Trust and safety redesign

- The existing section files provided the correct insertion points, but their earlier portrait badges, safe graphic, and document PNGs did not match the supplied Figma frame. Replacing those three visuals did not require changes to the hero or form behavior.
- Figma's exported document outline is separate from its internal placeholder lines and divider. Rendering the outline alone looked empty; the content needs HTML bars plus the provided divider asset.
- A fixed 514px + 705px desktop grid overflows once the page is narrower than its 1,283px reference width. Switching to flexible columns before the stacked breakpoint preserves the visual without horizontal clipping.
- The in-app browser rendered at 819px and exposed console and DOM inspection, but no viewport resizing. This limits direct comparison at the 1,440px source frame and narrow mobile widths.
- The connected Figma account allowed the initial frame context, then hit its Starter plan tool limit. The exact values visible in that first response were used; deeper layer values and additional Figma screenshots remain unavailable.
- The repository's full lint failure comes from existing Fast Refresh export errors in `src/components/ui/toast.tsx`. The changed source files lint cleanly.
