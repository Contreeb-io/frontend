# Interface decisions

## Landing hero

The reference is the supplied 2880 × 2048 screenshot, treated as a 1440 × 1024 desktop frame at 2× resolution. The values below were matched visually from that screenshot; none came from editable Figma measurements.

- The hero fills at least `100svh`. Its header and content are independent layers above the photograph, tint, and vertical fade.
- The desktop header starts 48px from the top and about 80px from each side at 1440px. Its inner width is capped at 1760px. The logo is 200px wide.
- Desktop content is centered in a 900px container, with its top at 57.5% of the hero height. The heading remains on one line at the reference width.
- The heading uses Outfit, weight 500, a 1.06 line height, and a size that reaches 70px at desktop widths. The paragraph uses Inter at 18px with a 600px maximum width; it wraps to three lines at 1440px.
- The waitlist row has a 520px maximum width, a 16px gap, and 56px tall controls. Its input grows within the row and its button uses content width with 28px horizontal padding.
- The existing `/hero-image.jpg` is positioned at 35% horizontally and 8svh above the hero, sized to 110% of the hero width. A slight blur, saturation, and brightness adjustment softens the image. A separate lateral blue/violet tint and a vertical gradient fade it into `#5256a8` before the main text.
- At widths up to 1024px, the image is sized to 88% of the hero height so it extends behind the fade without a visible lower edge. At 760px and below, it is sized to 66% of the hero height, the header switches to a disclosure menu, and the content returns to document flow with a viewport-based gap above it.
- At widths below 640px, the waitlist controls stack and fill their container.

The layout uses Tailwind utilities in the hero and form components. Shared Button, Input, and other page components retain their existing styles.

## Trust and safety narrative

- The verification, payment, and review sections share a 1,283px editorial grid on a `#fcfcfc` surface. At the 1,440px Figma frame width, the copy column is 514px, the gap is 64px, and the visual column is 705px.
- Headings use Outfit Semibold at 40px with a 1.2 line height. Descriptions use Inter Regular at 24px with a 1.5 line height and `#737373` text.
- The visual hierarchy is decorative and hidden from the accessibility tree. All feature meaning remains in the semantic heading and description.
- Verification cards use a 434px white surface, 24px radius, 16px padding, a subtle border and shadow, and a `#f7f7f7` status panel. The primary card is sharp; surrounding cards use varied opacity, blur, clipping, and edge fades.
- Payments uses three overlapping notification surfaces above the Figma dashed orbits. The foreground card stays sharp; the two cards behind it fade and blur. The Figma money icon and lock remain local SVG assets.
- Review uses Figma's 156 × 176px document artwork in four columns and three rows, with 27px column gaps and 38px row gaps. Reviewed documents receive the Figma seal; neutral/background documents use lower opacities.
- Below 900px the sections stack copy above visuals. Below 650px verification keeps one readable primary card, payment condenses its foreground card, and review changes to two document columns.
- Assets are stored in `public/trust/`; Figma SVG root dimensions remain intact. The designs introduce no animation.

## Reasons to care

- The new section sits between the hero and trust introduction. Its three 700 × 570px image cards are centered in a single strip at the 1440px reference width, with 24px gaps and 40px corners. The outer cards crop beyond the viewport and fade toward its edges.
- The heading and paragraph use Outfit and Inter respectively, with generous spacing below the images. At smaller widths, the center card scales to 72vw so both neighboring cards remain visible.
- The education and celebration images match the supplied reference. The care image is a freely licensed alternative to the watermarked image in that reference. Photo sources: [education](https://unsplash.com/photos/woman-carrying-white-and-green-textbook-iQPr1XkF5F0), [celebration](https://unsplash.com/photos/time-lapse-photography-of-two-women-splashing-glitters-LO1lToLGGFA), [care](https://unsplash.com/photos/doctor-comforting-patient-with-a-hand-on-arm-E0xu1n9yiPk).
