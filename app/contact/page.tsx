import type { Metadata } from 'next';
import Link from 'next/link';
import { PageShell } from '@/components/site-chrome';
import { FeedbackForm } from '@/components/workflows';

export const metadata: Metadata = { title: 'Help desk hours and prototype contact | RTI Online prototype', description: 'Find RTI Online help-desk hours, portal support and escalation contact information.' };

export default function ContactPage(){return <PageShell><section className="file-strip"><span>Contact Us</span><p>The help desk is for technical problems with online filing. It cannot answer an RTI request. Official numbers are shown for design fidelity; this prototype sends nothing to DoPT or NIC.</p></section><section className="contact-grid"><article><span>01</span><h2>RTI Online help desk</h2><p><b>011-24010690 / 691</b><br/>9:00 AM to 5:30 PM, Monday to Friday except public holidays.</p><p>helprtionline-dopt[at]nic[dot]in</p></article><article><span>02</span><h2>Before contacting support</h2><p>For a deducted payment with no registration number, wait 24–48 working hours and use Payment Reconciliation. Do not pay repeatedly.</p><Link href="/payments">Open payment reconciliation →</Link></article><article><span>03</span><h2>Escalation contact</h2><p>Under Secretary (IR-1)<br/>W/H 31049, Kartavya Bhavan 3<br/>New Delhi – 110001</p><p>usir-dopt[at]nic[dot]in</p></article><article><span>04</span><h2>Prototype feedback</h2><p>Save a local note about this redesign. Nothing is transmitted.</p><FeedbackForm/></article></section></PageShell>}
