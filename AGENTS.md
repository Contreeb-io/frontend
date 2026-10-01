# Design-reference implementation rule

When a task includes an approved design and an existing implementation, treat the approved design as the visual source of truth. Match its specific composition rather than only its general concept.

For every design-parity task:

1. Inspect the existing implementation before editing.
2. Reuse existing components, assets, tokens, and patterns where appropriate.
3. Compare structure, dimensions, positioning, spacing, typography, color, opacity, shadows, layering, and responsive behavior.
4. Correct structure and proportions before pixel-level details. Do not conceal structural errors with arbitrary margins, transforms, or viewport-specific absolute positioning.
5. Run the application and compare its browser render directly with the approved reference.
6. Make at least one visual refinement pass. Use screenshot comparisons or semi-transparent overlays when tooling permits.
7. Check desktop, tablet, and mobile layouts.
8. Run the project's available lint, typecheck, tests, and build checks.
9. Report any remaining visible discrepancies. Never claim visual parity without inspecting the rendered result.

Keep the implementation maintainable and responsive while matching the reference as closely as practical.
