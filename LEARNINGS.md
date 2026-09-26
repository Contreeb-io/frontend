# Implementation learnings

## Hero fidelity pass

- The original hero was 620px tall, used a centered `cover` image with 2px blur, and had no independent tint or fade. The header's 1280px maximum width and padding placed it too far inward. The description's `46ch` width also produced different line breaks.
- The supplied screenshot uses the same hands photograph found at `/hero-image.jpg`. Separating the image, color tint, and vertical gradient made it possible to move the hands upward while fading the photograph before the headline.
- A width-based background size worked at desktop widths but left a visible image edge at 768 × 1024. Sizing the image by hero height at tablet widths removed that edge.
- The reference screenshot provides visual placement but no inspectable Figma values. Color, blur, crop, and responsive positions remain visual approximations.
- The waitlist's validation, mutation, loading, success, and error logic were left in place. The visual pass changed only its layout classes. An invalid email still displays the existing validation message; no live waitlist request was sent during review.
