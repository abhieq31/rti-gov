# Filing-flow usability standard

## The promise

A citizen using a mid-range phone should be able to move from “I want this information” to a prototype registration number and clear statutory deadline in under 90 seconds.

## Non-negotiable rules

- Begin with the citizen's words; never require an authority name first.
- Keep the primary journey to three decisions before registration.
- Use ordinary language. Legal terms may explain a decision but may not become prerequisites.
- Never request Aadhaar, PAN, bank or card details in the application form.
- Prevent payment until the likely jurisdiction and authority are visible.
- Keep Back and Continue reachable with one thumb on a phone.
- Show the registration number and due date together on success.
- Label every synthetic action and receipt so the prototype cannot be mistaken for an official filing.
- Preserve keyboard operation, visible focus, semantic labels and reduced-motion support.

## Regression protocol

Viewport: `390 × 844`.

1. On `/`, choose “Inspection report for my railway station.”
2. Start the request and confirm that “Ministry of Railways” is recommended.
3. Continue with synthetic name, mobile, email and postal address.
4. Keep electronic delivery and the default UPI demonstration.
5. Review, accept the prototype declaration and register.
6. Confirm that the receipt includes a visibly synthetic registration number, the filing date, “Ministry of Railways,” the ₹10 fee and a date 30 calendar days after filing.
7. Confirm that the browser reports no console errors.

## Current result

On 22 August 2026, an instrumented browser run completed this path in **43 seconds**. Both Continue gates, the final declaration gate, authority recommendation, registration number generation and due-date calculation behaved as intended. This proves the interaction can fit the time budget under controlled conditions; it does not replace moderated usability and accessibility testing with citizens across languages, ages, literacy levels, assistive technology and network conditions.

## Release gate

A change fails this standard if it adds a required screen, hides the deadline, places a compulsory field before the citizen's information need, introduces an external font dependency, obscures the prototype boundary or prevents the regression protocol from completing.
