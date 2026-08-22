# Filing-flow usability standard

## The promise

A citizen using a mid-range phone should be able to move from “I want this information” to a prototype registration number and clear statutory deadline in under 90 seconds.

## Non-negotiable rules

- Begin with the citizen's words; never require an authority name first.
- Keep the primary journey to three decisions before registration.
- Use ordinary language. Legal terms may explain a decision but may not become prerequisites.
- Never request Aadhaar, PAN, bank or card details in the application form.
- Prevent payment until the likely jurisdiction and authority are visible.
- Explain why the authority was recommended and allow a one-tap correction.
- Never require an OTP during filing.
- Treat payment confirmation and registration as one idempotent transaction: no blank redirect, duplicate charge or reconciliation wait.
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
7. Confirm that payment is marked “Paid,” a payment reference is visible and the receipt explicitly states that registration happened in the same transaction.
8. Confirm that every interaction leaves a populated application screen visible, no OTP is requested and no reconciliation screen appears.
9. Confirm that the browser reports no console errors.

## Current result

On 22 August 2026, a deliberately paced instrumented browser run at `390 × 844` completed the full path in **60 seconds**. The run included reading pauses, four contact fields, authority confirmation, UPI selection, declaration, payment confirmation and receipt verification. Every state retained visible page content; filing requested no OTP; no reconciliation screen appeared; and the final receipt showed a `RTI-DEMO/MORLY/2026/…` registration, “Payment confirmed,” “₹10 · UPI · Paid,” Ministry of Railways and **21 September 2026** as the 30-day deadline. The browser console reported zero errors.

This proves the prototype interaction fits the time budget under controlled conditions. It does not replace moderated usability and accessibility testing with citizens across languages, ages, literacy levels, assistive technology and constrained networks.

## Release gate

A change fails this standard if it adds a required screen, hides the deadline, places a compulsory field before the citizen's information need, introduces an external font dependency, obscures the prototype boundary or prevents the regression protocol from completing.
