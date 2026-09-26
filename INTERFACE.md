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

The layout and form styling are scoped to the hero. Shared Button, Input, and other page components retain their existing styles.
