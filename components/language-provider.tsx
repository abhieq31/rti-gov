'use client';

import { createContext, useContext, useEffect, useMemo, useState, type ReactNode } from 'react';

export type SiteLanguage = 'en' | 'hi';

type LanguageContextValue = {
  language: SiteLanguage;
  setLanguage: (language: SiteLanguage) => void;
  toggleLanguage: () => void;
};

const LanguageContext = createContext<LanguageContextValue | null>(null);

const hindi: Record<string, string> = {
  'Skip to main content': 'मुख्य सामग्री पर जाएँ',
  'Independent redesign prototype': 'स्वतंत्र पुनःडिज़ाइन प्रोटोटाइप',
  'Not the official RTI Online portal. Synthetic data only.': 'यह आधिकारिक RTI ऑनलाइन पोर्टल नहीं है। केवल नमूना डेटा।',
  'Accessibility': 'सुगम्यता',
  'Text size': 'अक्षर आकार',
  'Decrease text size': 'अक्षर आकार घटाएँ',
  'Default text size': 'सामान्य अक्षर आकार',
  'Increase text size': 'अक्षर आकार बढ़ाएँ',
  'Right to Information': 'सूचना का अधिकार',
  'Independent prototype': 'स्वतंत्र प्रोटोटाइप',
  'Not a Government of India service': 'भारत सरकार की सेवा नहीं',
  'Home': 'मुखपृष्ठ',
  'Submit Request': 'अनुरोध जमा करें',
  'Submit First Appeal': 'प्रथम अपील जमा करें',
  'View Status': 'स्थिति देखें',
  'View History': 'इतिहास देखें',
  'Payment Reconciliation': 'भुगतान मिलान',
  'Login': 'लॉग इन',
  'Public Authorities': 'लोक प्राधिकरण',
  'User Manual': 'उपयोगकर्ता पुस्तिका',
  'FAQ': 'अक्सर पूछे गए प्रश्न',
  'Contact Us': 'संपर्क करें',
  'Privacy': 'गोपनीयता',
  'National Portal of India': 'भारत का राष्ट्रीय पोर्टल',
  'Citizen services': 'नागरिक सेवाएँ',
  'Citizen menu': 'नागरिक मेनू',
  'Menu': 'मेनू',
  'Close': 'बंद करें',
  'Services': 'सेवाएँ',
  'Information': 'जानकारी',
  'RTI Online': 'आरटीआई ऑनलाइन',
  'Independent redesign prototype. Nothing is filed or charged.': 'स्वतंत्र पुनःडिज़ाइन प्रोटोटाइप। कुछ भी दाखिल नहीं होता और कोई शुल्क नहीं लगता।',
  'Official RTI Online help desk (rtionline.gov.in): 011-24010690 / 691.': 'आधिकारिक आरटीआई ऑनलाइन सहायता केंद्र (rtionline.gov.in): 011-24010690 / 691।',
  'File RTI applications and first appeals online for Central Government public authorities.': 'केंद्र सरकार के लोक प्राधिकरणों के लिए आरटीआई आवेदन और प्रथम अपील ऑनलाइन दाखिल करें।',
  'Indian citizens only. Payment by UPI, net banking, debit/credit or RuPay. Read the guidelines before you submit.': 'केवल भारतीय नागरिक। भुगतान यूपीआई, नेट बैंकिंग, डेबिट/क्रेडिट या रुपे से। जमा करने से पहले दिशानिर्देश पढ़ें।',
  'File an RTI application with a Central public authority. Fee ₹10, unless BPL.': 'केंद्रीय लोक प्राधिकरण में आरटीआई आवेदन करें। बीपीएल को छोड़कर शुल्क ₹10।',
  'Appeal delay, denial or an incomplete reply. No fee.': 'देरी, इनकार या अधूरे उत्तर के विरुद्ध अपील करें। कोई शुल्क नहीं।',
  'See the case, due date, extra fees and replies.': 'मामला, नियत तारीख, अतिरिक्त शुल्क और उत्तर देखें।',
  'Requests and appeals filed with the same email, kept for three years.': 'एक ही ईमेल से दाखिल अनुरोध और अपील तीन वर्ष तक देखें।',
  'Use this if money was debited but no registration number arrived.': 'पैसा कट गया लेकिन पंजीकरण संख्या नहीं मिली तो इसका उपयोग करें।',
  'Optional. You can file without an account.': 'वैकल्पिक। खाते के बिना भी आवेदन कर सकते हैं।',
  'Do not file here for State Governments, including NCT Delhi.': 'राज्य सरकारों, दिल्ली सहित, के लिए यहाँ आवेदन न करें।',
  'Those applications would be returned without refund.': 'ऐसे आवेदन बिना धनवापसी के लौटाए जाएँगे।',
  'Reply': 'उत्तर',
  'Transfer': 'स्थानांतरण',
  'First appeal': 'प्रथम अपील',
  'Second appeal to CIC': 'सीआईसी में द्वितीय अपील',
  'days': 'दिन',
  'hours': 'घंटे',
  'Central Government only.': 'केवल केंद्र सरकार।',
  'Not for State authorities, including NCT Delhi.': 'दिल्ली सहित राज्य प्राधिकरणों के लिए नहीं।',
  'An existing record.': 'मौजूदा अभिलेख।',
  'Write what you want. The office is recommended from those words.': 'जो अभिलेख चाहिए वह लिखें। उन्हीं शब्दों से सही कार्यालय सुझाया जाएगा।',
  'Original request.': 'मूल अनुरोध।',
  'Use the request number and the email used to file.': 'अनुरोध संख्या और आवेदन वाला ईमेल उपयोग करें।',
  'No identity documents.': 'पहचान दस्तावेज़ नहीं।',
  'Do not upload Aadhaar or PAN. A valid BPL certificate is the only exception.': 'आधार या पैन अपलोड न करें। केवल वैध बीपीएल प्रमाणपत्र अपवाद है।',
  'Length limits.': 'लंबाई सीमा।',
  '3,000 characters. One optional PDF, up to 1 MB.': '3,000 अक्षर। एक वैकल्पिक पीडीएफ, अधिकतम 1 एमबी।',
  'Pay once.': 'एक बार भुगतान करें।',
  '₹10 by UPI, net banking or card, unless BPL proof is attached.': 'बीपीएल प्रमाण संलग्न न होने पर यूपीआई, नेट बैंकिंग या कार्ड से ₹10।',
  'No first-appeal fee.': 'प्रथम अपील का कोई शुल्क नहीं।',
  'A Central first appeal is free.': 'केंद्रीय प्रथम अपील निःशुल्क है।',
  'I have read and understood the guidelines.': 'मैंने दिशानिर्देश पढ़ और समझ लिए हैं।',
  'This remains a synthetic prototype; nothing is filed or charged.': 'यह एक नमूना प्रोटोटाइप है; कुछ भी दाखिल नहीं होता और कोई शुल्क नहीं लगता।',
  'Guidelines': 'दिशानिर्देश',
  'Request form': 'अनुरोध प्रपत्र',
  'Payment': 'भुगतान',
  'Registered': 'पंजीकृत',
  'Complete': 'पूर्ण',
  'Online RTI request form': 'ऑनलाइन आरटीआई अनुरोध प्रपत्र',
  'Start with the record you want.': 'जिस अभिलेख की आवश्यकता है, उससे शुरू करें।',
  'The record you want': 'आवश्यक अभिलेख',
  'Text for RTI request application *': 'आरटीआई अनुरोध आवेदन का विवरण *',
  'Provide copies of the inspection reports for…': 'निरीक्षण रिपोर्ट की प्रतियाँ उपलब्ध कराएँ…',
  'Need the problem fixed?': 'समस्या का समाधान चाहिए?',
  'RTI obtains existing records. A grievance service is the route for asking an office to take action.': 'आरटीआई मौजूदा अभिलेख दिलाता है। कार्रवाई के लिए शिकायत सेवा का उपयोग करें।',
  'Read the user manual': 'उपयोगकर्ता पुस्तिका पढ़ें',
  'Suggested from request text': 'अनुरोध के आधार पर सुझाव',
  'Public authority details': 'लोक प्राधिकरण का विवरण',
  'Search public authority': 'लोक प्राधिकरण खोजें',
  'Type a ministry, department or public authority': 'मंत्रालय, विभाग या लोक प्राधिकरण लिखें',
  'Select ministry / department / apex body *': 'मंत्रालय / विभाग / शीर्ष निकाय चुनें *',
  'Select public authority *': 'लोक प्राधिकरण चुनें *',
  'Select': 'चुनें',
  'Request will be filed with': 'अनुरोध यहाँ दाखिल होगा',
  'Personal details of RTI applicant': 'आरटीआई आवेदक का व्यक्तिगत विवरण',
  'Name *': 'नाम *',
  'Email ID *': 'ईमेल आईडी *',
  'Mobile number': 'मोबाइल नंबर',
  '10-digit mobile for SMS alerts': 'एसएमएस सूचना के लिए 10 अंकों का मोबाइल',
  'Gender': 'लिंग',
  'Male': 'पुरुष',
  'Female': 'महिला',
  'Third Gender': 'तृतीय लिंग',
  'Address *': 'पता *',
  'House, street, city': 'मकान, सड़क, शहर',
  'PIN code': 'पिन कोड',
  'State': 'राज्य',
  'Optional: locality, education and phone': 'वैकल्पिक: क्षेत्र, शिक्षा और फोन',
  'Status': 'स्थिति',
  'Rural': 'ग्रामीण',
  'Urban': 'शहरी',
  'Educational status': 'शैक्षिक स्थिति',
  'Literate': 'साक्षर',
  'Illiterate': 'निरक्षर',
  'Phone number': 'फोन नंबर',
  'Request details': 'अनुरोध का विवरण',
  'Is the applicant Below Poverty Line? *': 'क्या आवेदक गरीबी रेखा से नीचे है? *',
  'Yes': 'हाँ',
  'No': 'नहीं',
  'Send records as': 'अभिलेख इस रूप में भेजें',
  'Electronic copy': 'इलेक्ट्रॉनिक प्रति',
  'Certified paper copy': 'प्रमाणित कागज़ी प्रति',
  'Inspection of records': 'अभिलेखों का निरीक्षण',
  'Use only for a genuine 48-hour matter': 'केवल वास्तविक 48 घंटे के मामले में चुनें',
  'BPL certificate *': 'बीपीएल प्रमाणपत्र *',
  'Supporting document (optional)': 'सहायक दस्तावेज़ (वैकल्पिक)',
  'Enter security code *': 'सुरक्षा कोड दर्ज करें *',
  'Enter RTI26': 'RTI26 दर्ज करें',
  'Back': 'वापस',
  'Draft stays in this browser': 'मसौदा इसी ब्राउज़र में सुरक्षित रहता है',
  'Proceed to form': 'प्रपत्र पर जाएँ',
  'Accept guidelines to continue': 'आगे बढ़ने के लिए दिशानिर्देश स्वीकार करें',
  'Pay ₹10': '₹10 भुगतान करें',
  'Make payment': 'भुगतान करें',
  'Confirm and pay ₹10.': 'पुष्टि करें और ₹10 भुगतान करें।',
  'Confirm the BPL exemption.': 'बीपीएल छूट की पुष्टि करें।',
  'Request': 'अनुरोध',
  'Public authority': 'लोक प्राधिकरण',
  'Applicant': 'आवेदक',
  'Edit': 'संपादित करें',
  'Prescribed fee': 'निर्धारित शुल्क',
  'BPL exemption selected': 'बीपीएल छूट चुनी गई',
  'UPI': 'यूपीआई',
  'Net banking': 'नेट बैंकिंग',
  'RuPay / card': 'रुपे / कार्ड',
  'I confirm these details are correct.': 'मैं पुष्टि करता/करती हूँ कि यह विवरण सही है।',
  'Confirm details to pay': 'भुगतान के लिए विवरण की पुष्टि करें',
  'Pay ₹10 and register': '₹10 भुगतान कर पंजीकरण करें',
  'Register without fee': 'बिना शुल्क पंजीकरण करें',
  'Request registered': 'अनुरोध पंजीकृत',
  'Your number and due date.': 'आपकी संख्या और नियत तारीख।',
  'Save both. The statutory clock starts today. Status and first appeal use this same number.': 'दोनों सुरक्षित रखें। वैधानिक समय आज से शुरू होता है। स्थिति और प्रथम अपील में यही संख्या उपयोग होगी।',
  'Prototype registration number': 'प्रोटोटाइप पंजीकरण संख्या',
  'Response due': 'उत्तर की नियत तारीख',
  'Copy number': 'संख्या कॉपी करें',
  'Copied': 'कॉपी किया गया',
  'What information do you want?': 'आप कौन-सी जानकारी चाहते हैं?',
  'Start my request': 'मेरा अनुरोध शुरू करें',
  'No reason. No Aadhaar. Plain language is enough.': 'कारण नहीं। आधार नहीं। सरल भाषा पर्याप्त है।',
  'Try an example': 'उदाहरण चुनें',
  'Central Government only. Write the record you want. The prototype suggests the public authority. Security code RTI26.': 'केवल केंद्र सरकार। आवश्यक अभिलेख लिखें। प्रोटोटाइप लोक प्राधिकरण सुझाएगा। सुरक्षा कोड RTI26।',
  'Complete the required details to continue': 'आगे बढ़ने के लिए आवश्यक विवरण पूरा करें',
  'required items remaining': 'आवश्यक जानकारी शेष',
  'Fill demonstration details': 'नमूना विवरण भरें',
  'Clear form': 'प्रपत्र साफ़ करें',
  'About RTI': 'आरटीआई के बारे में',
  'How the service works': 'सेवा कैसे काम करती है',
  'Search public information': 'सार्वजनिक जानकारी खोजें',
  'Information commissions': 'सूचना आयोग',
  'About this prototype': 'इस प्रोटोटाइप के बारे में',
  'Prototype status': 'प्रोटोटाइप की स्थिति',
  'Language': 'भाषा',
  'On this page': 'इस पृष्ठ पर',
  'What RTI can do': 'आरटीआई क्या कर सकता है',
  'Your filing rights': 'आवेदन के आपके अधिकार',
  'What it cannot do': 'यह क्या नहीं कर सकता',
  'Fees & timelines': 'शुल्क और समय-सीमा',
  'Appeals': 'अपील',
  'Ask for records that already exist.': 'पहले से मौजूद अभिलेख माँगें।',
  'You do not need permission to exercise a right.': 'अधिकार के प्रयोग के लिए अनुमति की आवश्यकता नहीं।',
  'No reason required': 'कारण बताना आवश्यक नहीं',
  'Your language': 'आपकी भाषा',
  'Assistance required': 'सहायता का अधिकार',
  'Transfer within five days': 'पाँच दिनों में स्थानांतरण',
  'Do not ask RTI to solve a grievance.': 'आरटीआई से शिकायत का समाधान न माँगें।',
  'Strong request': 'मज़बूत अनुरोध',
  'Weak request': 'कमज़ोर अनुरोध',
  'Reframed': 'बेहतर रूप',
  'Know the clock and the cost.': 'समय और लागत जानें।',
  'Usual response period': 'सामान्य उत्तर अवधि',
  'Central application fee': 'केंद्रीय आवेदन शुल्क',
  'Per A4/A3 copy page': 'प्रति A4/A3 प्रति पृष्ठ',
  'The right includes a remedy.': 'अधिकार के साथ उपाय भी है।',
  'These clocks match the official RTI Online homepage diagram. The prototype shows them as a file, not a missing image.': 'ये समय-सीमाएँ आधिकारिक आरटीआई ऑनलाइन आरेख के अनुरूप हैं। प्रोटोटाइप इन्हें स्पष्ट रूप में दिखाता है।',
  'Day 0': 'दिन 0',
  'Life or liberty': 'जीवन या स्वतंत्रता',
  'First appeal · ₹0': 'प्रथम अपील · ₹0',
  'Second appeal': 'द्वितीय अपील',
  'File a demo request': 'नमूना अनुरोध दाखिल करें',
  'The fastest RTI request is the one you do not need to file. These results are synthetic catalogue entries.': 'सबसे तेज़ आरटीआई अनुरोध वह है जिसे दाखिल करने की ज़रूरत ही न पड़े। ये परिणाम नमूना सूची से हैं।',
  'What information are you looking for?': 'आप कौन-सी जानकारी खोज रहे हैं?',
  'Search records': 'अभिलेख खोजें',
  'Featured records': 'चुनिंदा अभिलेख',
  'Best matches': 'सर्वोत्तम मिलान',
  'Open record': 'अभिलेख खोलें',
  'Close record': 'अभिलेख बंद करें',
  'Prototype record preview': 'प्रोटोटाइप अभिलेख पूर्वावलोकन',
  'No published record matched that search.': 'उस खोज से कोई प्रकाशित अभिलेख नहीं मिला।',
  'Find the right authority': 'सही प्राधिकरण खोजें',
  'This portal accepts filings only for Central Government public authorities. State and local offices are shown so you do not pay the wrong fee.': 'यह पोर्टल केवल केंद्र सरकार के लोक प्राधिकरणों के आवेदन स्वीकार करता है। गलत शुल्क से बचाने के लिए राज्य और स्थानीय कार्यालय भी दिखाए गए हैं।',
  'Authority level': 'प्राधिकरण स्तर',
  'All': 'सभी',
  'Central': 'केंद्रीय',
  'Local': 'स्थानीय',
  'File online here': 'यहाँ ऑनलाइन दाखिल करें',
  'Route to local authority': 'स्थानीय प्राधिकरण पर जाएँ',
  'Continue on State portal': 'राज्य पोर्टल पर जारी रखें',
  'Enter the registration number and email from the receipt. Security code': 'रसीद की पंजीकरण संख्या और ईमेल दर्ज करें। सुरक्षा कोड',
  'Enter the application details.': 'आवेदन का विवरण दर्ज करें।',
  'Registration number *': 'पंजीकरण संख्या *',
  'Email used to file *': 'आवेदन वाला ईमेल *',
  'Security code *': 'सुरक्षा कोड *',
  'Open demonstration case': 'नमूना मामला खोलें',
  'Look up a different case': 'दूसरा मामला खोजें',
  'Print acknowledgement': 'पावती प्रिंट करें',
  'Open history': 'इतिहास खोलें',
  'Additional fee, PDF or split CPIO numbers': 'अतिरिक्त शुल्क, पीडीएफ या अलग सीपीआईओ संख्या',
  'Pay additional fee': 'अतिरिक्त शुल्क दें',
  'Upload requested PDF': 'माँगी गई पीडीएफ अपलोड करें',
  'View split CPIO cases': 'अलग सीपीआईओ मामले देखें',
  'Pay mock fee': 'नमूना शुल्क दें',
  'Supporting document required': 'सहायक दस्तावेज़ आवश्यक',
  'Forwarded to multiple CPIOs': 'कई सीपीआईओ को भेजा गया',
  'Online RTI first appeal form': 'ऑनलाइन आरटीआई प्रथम अपील प्रपत्र',
  'Retrieve request': 'अनुरोध प्राप्त करें',
  'Appeal form': 'अपील प्रपत्र',
  'Start with the original request.': 'मूल अनुरोध से शुरू करें।',
  'RTI request registration number *': 'आरटीआई अनुरोध पंजीकरण संख्या *',
  'Fill demonstration request': 'नमूना अनुरोध भरें',
  'Grounds for appeal': 'अपील के आधार',
  'Complete the first appeal.': 'प्रथम अपील पूरी करें।',
  'Original request': 'मूल अनुरोध',
  'First appeal fee': 'प्रथम अपील शुल्क',
  'No fee for a Central first appeal': 'केंद्रीय प्रथम अपील का कोई शुल्क नहीं',
  'Ground for appeal *': 'अपील का आधार *',
  'No response after 30 days': '30 दिनों बाद भी उत्तर नहीं',
  'Incomplete information': 'अधूरी जानकारी',
  'Information wrongly denied': 'जानकारी अनुचित रूप से अस्वीकृत',
  'Unreasonable additional fee': 'अनुचित अतिरिक्त शुल्क',
  'Other': 'अन्य',
  'Text for RTI first appeal application *': 'आरटीआई प्रथम अपील आवेदन का विवरण *',
  'Supporting PDF (optional)': 'सहायक पीडीएफ (वैकल्पिक)',
  'I confirm the appeal details are correct.': 'मैं पुष्टि करता/करती हूँ कि अपील का विवरण सही है।',
  'First appeal registered': 'प्रथम अपील पंजीकृत',
  'Your appeal number and 45-day clock.': 'आपकी अपील संख्या और 45 दिन की समय-सीमा।',
  'Prototype appeal number': 'प्रोटोटाइप अपील संख्या',
  'Appeal decision due': 'अपील निर्णय की नियत तारीख',
  'Proceed to appeal form': 'अपील प्रपत्र पर जाएँ',
  'Submit first appeal': 'प्रथम अपील जमा करें',
  'Confirm details to submit': 'जमा करने के लिए विवरण की पुष्टि करें',
  'Verify the applicant.': 'आवेदक सत्यापित करें।',
  'Open demonstration history': 'नमूना इतिहास खोलें',
  'Demo citizen account': 'नमूना नागरिक खाता',
  'New request': 'नया अनुरोध',
  'Pending': 'लंबित',
  'Closed': 'बंद',
  'Next date': 'अगली तारीख',
  'RTI requests': 'आरटीआई अनुरोध',
  'Active appeals': 'सक्रिय अपील',
  'Replies received': 'प्राप्त उत्तर',
  'next deadline': 'अगली समय-सीमा',
  'Look up a different applicant': 'दूसरा आवेदक खोजें',
  'Payment reconciled': 'भुगतान का मिलान हो गया',
  '₹10 received. Number issued.': '₹10 प्राप्त। संख्या जारी हुई।',
  'Amount': 'राशि',
  'Transaction': 'लेनदेन',
  'Payment reference': 'भुगतान संदर्भ',
  'Find the ₹10 once.': '₹10 का भुगतान खोजें।',
  'Bank / gateway transaction ID *': 'बैंक / गेटवे लेनदेन आईडी *',
  'Applicant email *': 'आवेदक का ईमेल *',
  'Check payment': 'भुगतान जाँचें',
  'Open demonstration payment': 'नमूना भुगतान खोलें',
  'Look up a different payment': 'दूसरा भुगतान खोजें',
  'Sign in to view history.': 'इतिहास देखने के लिए साइन इन करें।',
  'Username *': 'उपयोगकर्ता नाम *',
  'Password *': 'पासवर्ड *',
  'Password': 'पासवर्ड',
  'Fill demonstration account': 'नमूना खाता भरें',
  'View history without login →': 'लॉग इन किए बिना इतिहास देखें →',
  'Feedback saved on this device.': 'प्रतिक्रिया इस डिवाइस पर सुरक्षित हुई।',
  'Write another note': 'एक और टिप्पणी लिखें',
  'Your feedback': 'आपकी प्रतिक्रिया',
  'Save prototype feedback': 'प्रोटोटाइप प्रतिक्रिया सुरक्षित करें',
  'Plain answers about fees, clocks, status and first appeals before the legal language.': 'कानूनी भाषा से पहले शुल्क, समय-सीमा, स्थिति और प्रथम अपील के सरल उत्तर।',
  'Guidelines, the record, the public authority, applicant details, RTI26, then the number and due date. First appeal has no fee.': 'दिशानिर्देश, अभिलेख, लोक प्राधिकरण, आवेदक विवरण, RTI26, फिर संख्या और नियत तारीख। प्रथम अपील निःशुल्क है।',
  'Open': 'खोलें',
  'Accept the guidelines': 'दिशानिर्देश स्वीकार करें',
  'Type the record you want': 'आवश्यक अभिलेख लिखें',
  'Use the suggested public authority if it is right': 'सही होने पर सुझाया लोक प्राधिकरण चुनें',
  'Pay ₹10, then save the number and due date': '₹10 दें, फिर संख्या और नियत तारीख सुरक्षित करें',
  'Nothing leaves this device.': 'इस डिवाइस से कुछ बाहर नहीं जाता।',
  'Do not enter real personal data.': 'वास्तविक व्यक्तिगत जानकारी दर्ज न करें।',
  'Access is a product requirement.': 'सुगम्यता उत्पाद की अनिवार्य आवश्यकता है।',
  'English and Hindi are supported across the prototype.': 'पूरे प्रोटोटाइप में अंग्रेज़ी और हिन्दी उपलब्ध हैं।',
  'Trust begins with a clear boundary.': 'विश्वास स्पष्ट सीमा से शुरू होता है।',
  'Know where a second appeal or complaint goes.': 'जानें कि द्वितीय अपील या शिकायत कहाँ जाती है।',
  'Start with a first appeal': 'प्रथम अपील से शुरू करें',
  'Read the citizen guide': 'नागरिक मार्गदर्शिका पढ़ें',
  'Central authorities': 'केंद्रीय प्राधिकरण',
  'State authorities': 'राज्य प्राधिकरण',
  'Central Information Commission': 'केंद्रीय सूचना आयोग',
  'State Information Commissions': 'राज्य सूचना आयोग',
  'Find the public authority →': 'लोक प्राधिकरण खोजें →',
  'RTI Online help desk': 'आरटीआई ऑनलाइन सहायता केंद्र',
  'Before contacting support': 'सहायता से संपर्क करने से पहले',
  'Escalation contact': 'उच्च संपर्क',
  'Prototype feedback': 'प्रोटोटाइप प्रतिक्रिया',
  'Open payment reconciliation →': 'भुगतान मिलान खोलें →',
  'Ask for records that already exist. The law places the burden of transparency on the authority — not on the citizen to justify the question.': 'पहले से मौजूद अभिलेख माँगें। पारदर्शिता की ज़िम्मेदारी प्राधिकरण पर है—नागरिक पर प्रश्न का कारण बताने की नहीं।',
  'Request copies of documents, file notings, reports, orders, contracts, inspection records, correspondence, datasets, certified samples or extracts held by a': 'दस्तावेज़, फ़ाइल टिप्पणियाँ, रिपोर्ट, आदेश, अनुबंध, निरीक्षण अभिलेख, पत्राचार, डेटा, प्रमाणित नमूने या उद्धरण माँगें जो किसी',
  'public authority': 'लोक प्राधिकरण',
  'Only contact details necessary to respond may be requested.': 'उत्तर देने के लिए आवश्यक संपर्क विवरण ही माँगा जा सकता है।',
  'Apply in English, Hindi or the official language of the area.': 'अंग्रेज़ी, हिन्दी या क्षेत्र की राजभाषा में आवेदन करें।',
  'If you cannot write, the PIO must reasonably help reduce the request to writing.': 'यदि आप लिख नहीं सकते, तो पीआईओ को अनुरोध लिखने में उचित सहायता देनी होगी।',
  'A Central authority holding the wrong part must transfer it promptly.': 'गलत हिस्से वाला केंद्रीय प्राधिकरण उसे तुरंत सही जगह भेजे।',
  'RTI cannot compel an authority to provide a service, create a new analysis, justify an action from memory or offer an opinion. It can reveal the records behind those decisions.': 'आरटीआई किसी प्राधिकरण को सेवा देने, नया विश्लेषण बनाने या राय देने के लिए बाध्य नहीं करता। यह उन निर्णयों के पीछे के अभिलेख दिखा सकता है।',
  'Eligible': 'पात्र',
  'Below Poverty Line': 'गरीबी रेखा से नीचे',
  'applicants pay no application or information fee with valid proof. The first hour of record inspection is free. Information must be supplied free when the authority misses the statutory response time.': 'आवेदक वैध प्रमाण के साथ आवेदन या सूचना शुल्क नहीं देते। अभिलेख निरीक्षण का पहला घंटा निःशुल्क है। समय-सीमा चूकने पर सूचना निःशुल्क देनी होगी।',
  'If there is no timely response, information is denied, the reply is incomplete or an additional fee appears unreasonable, file a': 'समय पर उत्तर न मिले, सूचना अस्वीकार हो, उत्तर अधूरा हो या अतिरिक्त शुल्क अनुचित लगे तो',
  'first appeal': 'प्रथम अपील',
  'with the designated First Appellate Authority. A first appeal is ordinarily due within 30 days.': 'नामित प्रथम अपीलीय प्राधिकारी के पास दाखिल करें। सामान्यतः प्रथम अपील 30 दिनों के भीतर करनी होती है।',
  'You leave with a registration number, the filing date and the usual statutory due date on the same screen.': 'एक ही स्क्रीन पर पंजीकरण संख्या, दाखिल करने की तारीख और वैधानिक नियत तारीख मिलती है।',
  'Use only for a genuine emergency. The CPIO must reply in two days, not thirty. The prototype marks this on the receipt when selected.': 'केवल वास्तविक आपात स्थिति में उपयोग करें। सीपीआईओ को तीस नहीं, दो दिनों में उत्तर देना होगा। चुने जाने पर रसीद पर यह स्पष्ट होगा।',
  'The CPIO sends the record, a lawful exemption, an extra-fee notice or a transfer. If you are satisfied, the case ends.': 'सीपीआईओ अभिलेख, वैध अपवाद, अतिरिक्त शुल्क सूचना या स्थानांतरण भेजता है। संतुष्ट होने पर मामला समाप्त होता है।',
  'If another Central authority holds the record, the request should move within five days. That office then has its own 30-day clock.': 'यदि अभिलेख किसी अन्य केंद्रीय प्राधिकरण के पास है, तो अनुरोध पाँच दिनों में भेजा जाना चाहिए। उस कार्यालय की 30 दिन की अवधि फिर शुरू होती है।',
  'Silence, denial or an incomplete reply is enough. No fee. The First Appellate Authority should decide within 45 days.': 'उत्तर न मिलना, इनकार या अधूरा उत्तर पर्याप्त आधार है। कोई शुल्क नहीं। प्रथम अपीलीय प्राधिकारी को 45 दिनों में निर्णय देना चाहिए।',
  'Central cases go to the Central Information Commission. That filing sits outside this portal.': 'केंद्रीय मामले केंद्रीय सूचना आयोग में जाते हैं। वह आवेदन इस पोर्टल के बाहर होता है।',
  'A Section 18 complaint to the CIC is a separate remedy when there is no applicable time limit. Second appeals are not filed through this portal.': 'धारा 18 के तहत सीआईसी शिकायत एक अलग उपाय है। द्वितीय अपील इस पोर्टल से दाखिल नहीं होती।',
  'This concept demonstrates a better RTI experience. It is not an official service and cannot file a legal request.': 'यह अवधारणा बेहतर आरटीआई अनुभव दिखाती है। यह आधिकारिक सेवा नहीं है और कानूनी आवेदन दाखिल नहीं कर सकती।',
  'Requests, receipts, sign-in state, appeals and feedback are synthetic demonstrations stored only in this browser. No government, identity, payment or records system is connected.': 'अनुरोध, रसीदें, लॉग-इन स्थिति, अपील और प्रतिक्रिया केवल इस ब्राउज़र में सुरक्षित नमूने हैं। कोई सरकारी, पहचान, भुगतान या अभिलेख प्रणाली जुड़ी नहीं है।',
  'The interface deliberately avoids Aadhaar, PAN and banking fields. Clear browser site data to remove any locally saved demonstration records.': 'इंटरफ़ेस जानबूझकर आधार, पैन और बैंकिंग फ़ील्ड से बचता है। स्थानीय नमूना अभिलेख हटाने के लिए ब्राउज़र साइट डेटा साफ़ करें।',
  'The experience uses semantic controls, keyboard-visible focus, reduced-motion support, responsive layouts and plain-language labels. A production service would still require formal WCAG testing with disabled citizens and assistive technology.': 'अनुभव में अर्थपूर्ण नियंत्रण, स्पष्ट कीबोर्ड फ़ोकस, कम गति समर्थन, उत्तरदायी लेआउट और सरल लेबल हैं। वास्तविक सेवा के लिए दिव्यांग नागरिकों और सहायक तकनीक के साथ औपचारिक WCAG परीक्षण आवश्यक होगा।',
  'The selected language persists across pages and applies to navigation, instructions, validation messages, workflows and receipts.': 'चुनी भाषा सभी पृष्ठों पर बनी रहती है और नेविगेशन, निर्देश, सत्यापन संदेश, प्रक्रियाओं और रसीदों पर लागू होती है।',
  'The Central Information Commission and State Information Commissions are independent statutory bodies. The correct commission depends on the public authority involved.': 'केंद्रीय और राज्य सूचना आयोग स्वतंत्र वैधानिक निकाय हैं। सही आयोग संबंधित लोक प्राधिकरण पर निर्भर करता है।',
  'This directory and handoff are explanatory demonstrations. Verify filing details on the relevant commission\'s official website.': 'यह सूची और हस्तांतरण केवल समझाने के नमूने हैं। संबंधित आयोग की आधिकारिक वेबसाइट पर आवेदन विवरण सत्यापित करें।',
  'For matters involving Central Government public authorities, the Central Information Commission hears eligible second appeals and complaints under the RTI Act.': 'केंद्र सरकार के लोक प्राधिकरणों से जुड़े मामलों में केंद्रीय सूचना आयोग पात्र द्वितीय अपील और शिकायतें सुनता है।',
  'Each State route is separate. Use the public-authority finder to identify the jurisdiction before proceeding to the relevant commission.': 'हर राज्य का मार्ग अलग है। संबंधित आयोग जाने से पहले लोक प्राधिकरण खोज से अधिकार-क्षेत्र पहचानें।',
  'The help desk is for technical problems with online filing. It cannot answer an RTI request. Official numbers are shown for design fidelity; this prototype sends nothing to DoPT or NIC.': 'सहायता केंद्र ऑनलाइन आवेदन की तकनीकी समस्याओं के लिए है। यह आरटीआई अनुरोध का उत्तर नहीं दे सकता। प्रोटोटाइप DoPT या NIC को कुछ नहीं भेजता।',
  'For a deducted payment with no registration number, wait 24–48 working hours and use Payment Reconciliation. Do not pay repeatedly.': 'भुगतान कटने पर पंजीकरण संख्या न मिले तो 24–48 कार्य घंटे प्रतीक्षा करें और भुगतान मिलान का उपयोग करें। बार-बार भुगतान न करें।',
  'Save a local note about this redesign. Nothing is transmitted.': 'इस पुनःडिज़ाइन पर स्थानीय टिप्पणी सुरक्षित करें। कुछ भी भेजा नहीं जाता।',
  'Who can file an RTI request?': 'आरटीआई अनुरोध कौन कर सकता है?',
  'What can I ask for?': 'मैं क्या माँग सकता/सकती हूँ?',
  'What is the application fee?': 'आवेदन शुल्क कितना है?',
  'How long should a response take?': 'उत्तर कितने समय में मिलना चाहिए?',
  'What if I chose the wrong authority?': 'गलत प्राधिकरण चुनने पर क्या होगा?',
  'Is an account mandatory?': 'क्या खाता अनिवार्य है?',
  'How do I file a first appeal?': 'प्रथम अपील कैसे दाखिल करें?',
  'What if payment was deducted but no registration number arrived?': 'भुगतान कट गया लेकिन पंजीकरण संख्या नहीं मिली तो क्या करें?',
  'How do I upload a document requested by the authority?': 'प्राधिकरण द्वारा माँगा दस्तावेज़ कैसे अपलोड करें?',
  'Why did one request generate several registration numbers?': 'एक अनुरोध से कई पंजीकरण संख्याएँ क्यों बनीं?',
  'Can I appeal an application filed outside the portal?': 'क्या पोर्टल के बाहर दाखिल आवेदन की अपील कर सकता/सकती हूँ?',
  'How long are cases visible online?': 'मामले ऑनलाइन कितने समय तक दिखते हैं?',
  'Any citizen of India can seek records under the Right to Information Act, 2005. This prototype uses synthetic applicant details.': 'भारत का कोई भी नागरिक सूचना का अधिकार अधिनियम, 2005 के तहत अभिलेख माँग सकता है। यह प्रोटोटाइप नमूना आवेदक विवरण उपयोग करता है।',
  'The prescribed Central RTI application fee is ₹10 for non-BPL applicants. Eligible Below Poverty Line applicants do not pay the fee when valid proof is provided.': 'गैर-बीपीएल आवेदकों के लिए केंद्रीय आरटीआई आवेदन शुल्क ₹10 है। पात्र बीपीएल आवेदक वैध प्रमाण पर शुल्क नहीं देते।',
  'The usual statutory period is 30 days. Information concerning life or liberty has a 48-hour timeline. Other statutory situations can vary.': 'सामान्य वैधानिक अवधि 30 दिन है। जीवन या स्वतंत्रता से जुड़ी सूचना की अवधि 48 घंटे है। अन्य स्थितियाँ अलग हो सकती हैं।',
  'No. The current Central portal allows direct filing. An account is useful for history, saved drafts and notifications; this concept keeps direct filing available.': 'नहीं। केंद्रीय पोर्टल सीधे आवेदन की अनुमति देता है। खाता इतिहास, मसौदे और सूचनाओं के लिए उपयोगी है; सीधे आवेदन की सुविधा बनी रहती है।',
  'Use the original registration number and email address, select the ground for appeal, state your case and submit. No fee is charged for a Central first appeal.': 'मूल पंजीकरण संख्या और ईमेल उपयोग करें, अपील का आधार चुनें, अपना पक्ष लिखें और जमा करें। केंद्रीय प्रथम अपील निःशुल्क है।',
  'Do not pay repeatedly. Use payment reconciliation and allow 24–48 working hours for bank reconciliation in the current system.': 'बार-बार भुगतान न करें। भुगतान मिलान का उपयोग करें और बैंक मिलान के लिए 24–48 कार्य घंटे दें।',
  'View Status and View History retain online request and first-appeal cases for three years.': 'स्थिति और इतिहास में ऑनलाइन अनुरोध और प्रथम अपील के मामले तीन वर्ष तक रहते हैं।',
  'Indian citizens only. Type the record, use the suggested office if it is right, then name, email, address, BPL and security code': 'केवल भारतीय नागरिक। अभिलेख लिखें, सही सुझाया कार्यालय चुनें, फिर नाम, ईमेल, पता, बीपीएल और सुरक्षा कोड भरें',
  'Required details complete': 'आवश्यक विवरण पूर्ण',
  'Describe the record you want': 'आवश्यक अभिलेख का वर्णन करें',
  'Add more detail to the request': 'अनुरोध में अधिक विवरण जोड़ें',
  'Select a ministry or department': 'मंत्रालय या विभाग चुनें',
  'Select a public authority': 'लोक प्राधिकरण चुनें',
  'Enter your name': 'अपना नाम दर्ज करें',
  'Enter a valid email address': 'वैध ईमेल दर्ज करें',
  'Enter your full address': 'पूरा पता दर्ज करें',
  'Enter a 6-digit PIN code': '6 अंकों का पिन कोड दर्ज करें',
  'Choose BPL status': 'बीपीएल स्थिति चुनें',
  'Attach a valid BPL certificate': 'वैध बीपीएल प्रमाणपत्र संलग्न करें',
  'Review request': 'अनुरोध की समीक्षा करें',
  'Choose a PDF no larger than 1 MB.': 'अधिकतम 1 एमबी की पीडीएफ चुनें।',
  'Right to Information · Central Government': 'सूचना का अधिकार · केंद्र सरकार',
  'Ask for the record.': 'अभिलेख माँगें।',
  'Leave with a due date.': 'नियत तारीख साथ पाएँ।',
  'Describe the information you want in plain language. We help identify the public authority and carry the request through payment to registration.': 'सरल भाषा में बताएं कि कौन-सी जानकारी चाहिए। हम सही लोक प्राधिकरण पहचानने और अनुरोध को भुगतान से पंजीकरण तक ले जाने में मदद करते हैं।',
  'application fee': 'आवेदन शुल्क',
  'usual reply': 'सामान्य उत्तर',
  'Start a Central RTI request': 'केंद्रीय आरटीआई अनुरोध शुरू करें',
  'What record do you need?': 'आपको कौन-सा अभिलेख चाहिए?',
  'Prototype filing · nothing is sent or charged': 'प्रोटोटाइप आवेदन · कुछ भेजा नहीं जाता, कोई शुल्क नहीं लगता',
  'For State Governments, including NCT Delhi, find the correct portal before paying.': 'दिल्ली सहित राज्य सरकारों के लिए भुगतान से पहले सही पोर्टल खोजें।',
  'Check jurisdiction →': 'अधिकार-क्षेत्र जाँचें →',
  'Already filed?': 'पहले आवेदन कर चुके हैं?',
  'Continue your case.': 'अपना मामला जारी रखें।',
  'Track a request': 'अनुरोध की स्थिति देखें',
  'Status, reply and days remaining.': 'स्थिति, उत्तर और शेष दिन।',
  'File a first appeal': 'प्रथम अपील दाखिल करें',
  'Delay, denial or an incomplete reply. ₹0.': 'देरी, इनकार या अधूरा उत्तर। ₹0।',
  'Fix a payment': 'भुगतान समस्या सुलझाएँ',
  'Money debited but no registration number.': 'पैसा कट गया, पंजीकरण संख्या नहीं मिली।',
  'The statutory clock': 'वैधानिक समय-सीमा',
  'Time should never be hidden.': 'समय-सीमा कभी छिपी नहीं होनी चाहिए।',
  'Filing essentials': 'आवेदन की मुख्य जानकारी',
  'Information and help': 'जानकारी और सहायता',
  'Describe the record in at least 12 characters.': 'अभिलेख का विवरण कम से कम 12 अक्षरों में लिखें।',
  'Draft restored from this browser.': 'इस ब्राउज़र से मसौदा पुनः प्राप्त हुआ।',
  'Review the details before continuing.': 'आगे बढ़ने से पहले विवरण जाँचें।',
  'Discard draft': 'मसौदा हटाएँ',
  'Appeal draft restored.': 'अपील का मसौदा पुनः प्राप्त हुआ।',
  'Review the original request details before retrieving it.': 'मूल अनुरोध प्राप्त करने से पहले विवरण जाँचें।',
  'Write at least 20 characters explaining the appeal': 'अपील समझाने के लिए कम से कम 20 अक्षर लिखें',
  'Confirm that the appeal details are correct': 'पुष्टि करें कि अपील का विवरण सही है',
  'Device-local history': 'इस डिवाइस का इतिहास',
  'Your cases': 'आपके मामले',
  'Sign out': 'साइन आउट',
  'No cases were found for that email on this device.': 'इस डिवाइस पर उस ईमेल से कोई मामला नहीं मिला।',
  'Manage existing cases': 'मौजूदा मामले सँभालें',
  'No cases match this filter.': 'इस फ़िल्टर से कोई मामला नहीं मिला।',
  'Choose All to see every case on this device.': 'इस डिवाइस के सभी मामले देखने के लिए सभी चुनें।',
  'An account is not required to file. Security code is': 'आवेदन के लिए खाता आवश्यक नहीं है। सुरक्षा कोड है',
  'An account is not required to file. Demo username': 'आवेदन के लिए खाता आवश्यक नहीं है। नमूना उपयोगकर्ता नाम',
  'Use the registration number and email from the receipt. The known demonstration does not send a code to a mailbox.': 'रसीद की पंजीकरण संख्या और ईमेल उपयोग करें। इस नमूने में ईमेल पर कोड नहीं भेजा जाता।',
  'Enter the email used to file. Security code is RTI26. Requests and appeals with these details stay on this device for three years.': 'आवेदन वाला ईमेल दर्ज करें। सुरक्षा कोड RTI26 है। इन विवरणों वाले अनुरोध और अपील इस डिवाइस पर तीन वर्ष रहते हैं।',
  'Enter the email used to file. History is kept for three years. Demo: aarav.demo@example.in · RTI26.': 'आवेदन वाला ईमेल दर्ज करें। इतिहास तीन वर्ष रखा जाता है। नमूना: aarav.demo@example.in · RTI26।',
  'No matching prototype payment. Use the demonstration transaction, email and security code RTI26.': 'कोई नमूना भुगतान नहीं मिला। नमूना लेनदेन, ईमेल और सुरक्षा कोड RTI26 उपयोग करें।',
  'Use the demonstration username, password and security code RTI26.': 'नमूना उपयोगकर्ता नाम, पासवर्ड और सुरक्षा कोड RTI26 उपयोग करें।',
  'Enter the demonstration security code RTI26.': 'नमूना सुरक्षा कोड RTI26 दर्ज करें।',
  'That prototype request was not found. Use the demo details or a receipt created on this device.': 'वह नमूना अनुरोध नहीं मिला। नमूना विवरण या इस डिवाइस पर बनी रसीद उपयोग करें।',
  'This request was routed to a State or local service. Continue the appeal in that receiving service.': 'यह अनुरोध राज्य या स्थानीय सेवा को भेजा गया था। अपील उसी सेवा में जारी रखें।',
  'An online first appeal needs the original registration number, applicant email and security code. No fee is charged for a Central first appeal.': 'ऑनलाइन प्रथम अपील के लिए मूल पंजीकरण संख्या, आवेदक ईमेल और सुरक्षा कोड चाहिए। केंद्रीय प्रथम अपील पर कोई शुल्क नहीं है।',
  'State what went wrong and the relief you want. The First Appellate Authority should decide within 45 days.': 'बताएँ कि क्या गलत हुआ और क्या राहत चाहिए। प्रथम अपीलीय प्राधिकारी को 45 दिनों में निर्णय देना चाहिए।',
  'State the response date, what is missing, and the relief requested.': 'उत्तर की तारीख, छूटी हुई जानकारी और माँगी गई राहत लिखें।',
  'No fee is charged for a Central first appeal. This prototype transmits nothing.': 'केंद्रीय प्रथम अपील पर कोई शुल्क नहीं है। यह प्रोटोटाइप कुछ नहीं भेजता।',
  'The appeal has been routed to the First Appellate Authority. No fee was charged.': 'अपील प्रथम अपीलीय प्राधिकारी को भेज दी गई है। कोई शुल्क नहीं लगा।',
  'The First Appellate Authority should decide within 45 days. If there is no decision, or you reject it, a second appeal may go to the Central Information Commission.': 'प्रथम अपीलीय प्राधिकारी को 45 दिनों में निर्णय देना चाहिए। निर्णय न मिले या अस्वीकार्य हो तो केंद्रीय सूचना आयोग में द्वितीय अपील की जा सकती है।',
  'This is a prototype receipt and is not valid for an official RTI appeal.': 'यह नमूना रसीद है और आधिकारिक आरटीआई अपील के लिए मान्य नहीं है।',
  'This is a prototype receipt and is not valid for an official RTI filing.': 'यह नमूना रसीद है और आधिकारिक आरटीआई आवेदन के लिए मान्य नहीं है।',
  'Do not pay again. Status uses this same registration number.': 'दोबारा भुगतान न करें। स्थिति देखने में यही पंजीकरण संख्या उपयोग होगी।',
  'Use this only when money was debited but no registration number was generated. Do not pay again.': 'केवल तब उपयोग करें जब पैसा कट गया लेकिन पंजीकरण संख्या नहीं बनी। दोबारा भुगतान न करें।',
  'Eligible BPL applicants do not pay the application fee when valid proof is attached.': 'वैध प्रमाण संलग्न होने पर पात्र बीपीएल आवेदक आवेदन शुल्क नहीं देते।',
  'Non-BPL applicants pay ₹10 once. Do not pay again if a previous attempt is pending. This demonstration does not charge a bank or UPI account.': 'गैर-बीपीएल आवेदक एक बार ₹10 देते हैं। पिछला प्रयास लंबित हो तो दोबारा भुगतान न करें। यह नमूना बैंक या यूपीआई खाते से राशि नहीं काटता।',
  'Valid BPL proof · PDF up to 1 MB. Do not upload Aadhaar or PAN.': 'वैध बीपीएल प्रमाण · अधिकतम 1 एमबी पीडीएफ। आधार या पैन अपलोड न करें।',
  'One PDF up to 1 MB. PDF name should be under 12 characters, with no spaces. Do not upload Aadhaar or PAN.': 'एक पीडीएफ, अधिकतम 1 एमबी। नाम 12 अक्षरों से कम और बिना खाली स्थान के हो। आधार या पैन अपलोड न करें।',
  'One PDF up to 1 MB. Do not upload Aadhaar or PAN.': 'एक पीडीएफ, अधिकतम 1 एमबी। आधार या पैन अपलोड न करें।',
  'What happens next': 'आगे क्या होगा',
  'The Nodal Officer transmits the request to the concerned CPIO. Open status for the days left, then file a first appeal at ₹0 if there is no reply.': 'नोडल अधिकारी अनुरोध संबंधित सीपीआईओ को भेजता है। शेष दिन स्थिति में देखें; उत्तर न मिले तो ₹0 में प्रथम अपील करें।',
  'Prepare first appeal': 'प्रथम अपील तैयार करें',
  'View appeal status': 'अपील की स्थिति देखें',
  'Original public authority': 'मूल लोक प्राधिकरण',
  'Not charged': 'शुल्क नहीं लिया गया',
  'Payment reconciliation': 'भुगतान मिलान',
  'Additional fee: ₹12': 'अतिरिक्त शुल्क: ₹12',
  'Six A4 pages at ₹2 per page. This is a synthetic payment.': 'छह A4 पृष्ठ, ₹2 प्रति पृष्ठ। यह नमूना भुगतान है।',
  'Mock fee paid. The case can continue.': 'नमूना शुल्क चुका दिया गया। मामला आगे बढ़ सकता है।',
  'Upload the requested PDF from the applicant. Maximum size: 1 MB.': 'आवेदक से माँगी गई पीडीएफ अपलोड करें। अधिकतम आकार: 1 एमबी।',
  'The request was split between the Railway Board and Northern Railway.': 'अनुरोध रेलवे बोर्ड और उत्तर रेलवे के बीच बाँटा गया।',
  'Thank you. Nothing was transmitted from this prototype.': 'धन्यवाद। इस प्रोटोटाइप से कुछ नहीं भेजा गया।',
  'What was unclear or did not work?': 'क्या अस्पष्ट था या काम नहीं किया?',
  'Searches synthetic proactive disclosures and authority topics in this prototype.': 'यह प्रोटोटाइप नमूना स्वप्रकाशित अभिलेख और प्राधिकरण विषय खोजता है।',
  'That does not mean the record does not exist. Find the likely public authority and file a precise request.': 'इसका अर्थ यह नहीं कि अभिलेख मौजूद नहीं है। संभावित लोक प्राधिकरण खोजें और सटीक अनुरोध करें।',
  'Search public authorities available on this portal': 'इस पोर्टल पर उपलब्ध लोक प्राधिकरण खोजें',
  'No matching public authority.': 'कोई मेल खाता लोक प्राधिकरण नहीं मिला।',
  'Search by ministry, department or the public service that holds the record. State and local authorities cannot be filed through this portal.': 'मंत्रालय, विभाग या अभिलेख रखने वाली सेवा से खोजें। राज्य और स्थानीय प्राधिकरणों के आवेदन इस पोर्टल से नहीं होते।',
  'Choose the right route': 'सही मार्ग चुनें',
  'CIC integration concept': 'सीआईसी एकीकरण अवधारणा',
  'Carry the case forward.': 'मामला आगे ले जाएँ।',
  'Never type it twice.': 'एक ही विवरण दोबारा न लिखें।',
  'Retrieve mock case →': 'नमूना मामला प्राप्त करें →',
  'Mock case retrieved': 'नमूना मामला मिल गया',
  'The record is ready for second appeal.': 'अभिलेख द्वितीय अपील के लिए तैयार है।',
  'No CIC or government system is contacted.': 'किसी सीआईसी या सरकारी प्रणाली से संपर्क नहीं होता।',
  'Start again': 'फिर शुरू करें',
  'Why this prototype exists': 'यह प्रोटोटाइप क्यों है',
  'The live portal is a transaction system. Citizens arrive with a sentence.': 'मौजूदा पोर्टल लेनदेन प्रणाली है। नागरिक एक सरल वाक्य लेकर आते हैं।',
  'Three details. One continuous case.': 'तीन विवरण। एक सतत मामला।',
  'Check public authorities →': 'लोक प्राधिकरण जाँचें →',
  'Search published records →': 'प्रकाशित अभिलेख खोजें →',
  'See the full process →': 'पूरी प्रक्रिया देखें →',
  'File a demo request →': 'नमूना अनुरोध करें →',
  'Aarav’s cases': 'आरव के मामले',
  'Appeal': 'अपील',
  'Authority': 'प्राधिकरण',
  'Fee': 'शुल्क',
  'Filed': 'दाखिल',
  'Prototype': 'प्रोटोटाइप',
  'CPIO': 'सीपीआईओ',
  'Nodal Officer': 'नोडल अधिकारी',
  'No fee.': 'कोई शुल्क नहीं।',
  'Try:': 'आज़माएँ:',
  'Glossary': 'शब्दावली',
  'Filter glossary terms': 'शब्दावली खोजें',
  'Open →': 'खोलें →',
  'View history': 'इतिहास देखें',
  'View status': 'स्थिति देखें',
  'View appeal': 'अपील देखें',
  'Retrieve first appeal': 'प्रथम अपील प्राप्त करें',
  'First appeal registration number': 'प्रथम अपील पंजीकरण संख्या',
  'Date first appeal was filed': 'प्रथम अपील दाखिल करने की तारीख',
  'Email used for the appeal': 'अपील में उपयोग किया गया ईमेल',
  'Railway Board': 'रेलवे बोर्ड',
  'Department of Personnel & Training': 'कार्मिक और प्रशिक्षण विभाग',
  'Under Secretary (IR-1)': 'अवर सचिव (IR-1)',
  'New Delhi – 110001': 'नई दिल्ली – 110001',
  'Official today / this prototype': 'आज की आधिकारिक सेवा / यह प्रोटोटाइप',
  'Sent to nodal officer': 'नोडल अधिकारी को भेजा गया',
  'Request related records →': 'संबंधित अभिलेख माँगें →',
  'Understand and create a mock first appeal →': 'प्रथम अपील समझें और नमूना बनाएँ →',
  'Find the right authority →': 'सही प्राधिकरण खोजें →',
  'Do not file here for State Governments, including NCT Delhi. Use the authority list to check before you pay.': 'दिल्ली सहित राज्य सरकारों के लिए यहाँ आवेदन न करें। भुगतान से पहले प्राधिकरण सूची जाँचें।',
  'The First Appellate Authority has 45 days. Demo: RTI/MORLY/2026/804271 · aarav.demo@example.in · RTI26.': 'प्रथम अपीलीय प्राधिकारी के पास 45 दिन हैं। नमूना: RTI/MORLY/2026/804271 · aarav.demo@example.in · RTI26।',
  'Use this if money was debited but no registration number arrived. Do not pay twice. Security code': 'पैसा कट गया लेकिन पंजीकरण संख्या नहीं मिली तो इसका उपयोग करें। दोबारा भुगतान न करें। सुरक्षा कोड',
  'This prototype creates a device-local demonstration receipt. Nothing is transmitted or charged.': 'यह प्रोटोटाइप केवल इस डिवाइस पर नमूना रसीद बनाता है। कुछ भेजा नहीं जाता और कोई शुल्क नहीं लगता।',
  'This synthetic catalogue entry demonstrates a published record. In a live service, the document, source URL, file format and accessibility details would appear here.': 'यह नमूना सूची एक प्रकाशित अभिलेख दिखाती है। वास्तविक सेवा में दस्तावेज़, स्रोत लिंक, फ़ाइल प्रारूप और सुगम्यता विवरण यहाँ होंगे।',
  'The official RTI Online portal says its first-appeal details can be retrieved in the CIC second-appeal filing portal. This demonstration shows how that handoff should feel.': 'आधिकारिक आरटीआई ऑनलाइन पोर्टल के अनुसार प्रथम अपील का विवरण सीआईसी द्वितीय अपील पोर्टल में प्राप्त किया जा सकता है। यह नमूना वही सहज हस्तांतरण दिखाता है।',
  'In a production integration, the CIC portal would receive the verified RTI request, reply and first-appeal record through an authorized data exchange.': 'वास्तविक एकीकरण में सीआईसी पोर्टल सत्यापित आरटीआई अनुरोध, उत्तर और प्रथम अपील अभिलेख अधिकृत डेटा विनिमय से प्राप्त करेगा।',
  'Silence or an incomplete reply is enough. Continue stays blocked until you confirm.': 'उत्तर न मिलना या अधूरा उत्तर पर्याप्त है। पुष्टि तक आगे बढ़ना बंद रहेगा।',
  '9:00 AM to 5:30 PM, Monday to Friday except public holidays.': 'सुबह 9:00 से शाम 5:30, सोमवार से शुक्रवार, सार्वजनिक अवकाश छोड़कर।',
  'Enter the registration number, applicant email and security code.': 'पंजीकरण संख्या, आवेदक ईमेल और सुरक्षा कोड दर्ज करें।',
  'Enter a valid applicant email address.': 'वैध आवेदक ईमेल पता दर्ज करें।',
};

const hindiMonths: Record<string, string> = {
  jan: 'जनवरी', january: 'जनवरी', feb: 'फ़रवरी', february: 'फ़रवरी', mar: 'मार्च', march: 'मार्च',
  apr: 'अप्रैल', april: 'अप्रैल', may: 'मई', jun: 'जून', june: 'जून', jul: 'जुलाई', july: 'जुलाई',
  aug: 'अगस्त', august: 'अगस्त', sep: 'सितंबर', sept: 'सितंबर', september: 'सितंबर', oct: 'अक्टूबर', october: 'अक्टूबर',
  nov: 'नवंबर', november: 'नवंबर', dec: 'दिसंबर', december: 'दिसंबर',
};

const patterns: Array<[RegExp, (...parts: string[]) => string]> = [
  [/^Step (\d+) of (\d+)$/, (_all, step, total) => `चरण ${step}, कुल ${total}`],
  [/^Step (\d+) of (\d+), (.+)$/, (_all, step, total, label) => `चरण ${step}, कुल ${total}: ${translateText(label)}`],
  [/^(\d+) days$/, (_all, count) => `${count} दिन`],
  [/^Use (.+)$/, (_all, name) => `${name} चुनें`],
  [/^Pay by (.+) · transaction (.+)$/, (_all, method, id) => `${translateText(method)} से भुगतान · लेनदेन ${id}`],
  [/^(\d+) \/ 3,000 characters.*$/, (_all, count) => `${count} / 3,000 अक्षर`],
  [/^(\d+) required items remaining$/, (_all, count) => `${count} आवश्यक जानकारी शेष`],
  [/^(\d+) days left$/, (_all, count) => `${count} दिन शेष`],
  [/^Attached: (.+)$/, (_all, file) => `संलग्न: ${file}`],
  [/^Enter security code (.+)$/, (_all, code) => `सुरक्षा कोड ${code} दर्ज करें`],
  [/^(\d{1,2}) ([A-Za-z]+) (\d{4})$/, (_all, day, month, year) => `${day} ${hindiMonths[month.toLowerCase()] || month} ${year}`],
];

export function translateText(value: string) {
  const trimmed = value.trim();
  if (!trimmed) return value;
  const direct = hindi[trimmed];
  let translated = direct;
  if (!translated) {
    for (const [pattern, replacement] of patterns) {
      const match = trimmed.match(pattern);
      if (match) {
        translated = replacement(...match);
        break;
      }
    }
  }
  if (!translated) return value;
  return value.replace(trimmed, translated);
}

const textOriginal = new WeakMap<Text, string>();
const attributeOriginal = new WeakMap<Element, Map<string, string>>();

function translateDocument(language: SiteLanguage) {
  const root = document.body;
  if (!root) return;
  let applying = false;

  const applyText = (node: Text) => {
    const current = node.nodeValue || '';
    const previousOriginal = textOriginal.get(node);
    if (language === 'en') {
      if (previousOriginal != null && current === translateText(previousOriginal) && current !== previousOriginal) node.nodeValue = previousOriginal;
      else textOriginal.set(node, current);
      return;
    }
    if (node.parentElement?.closest('script, style, [data-no-translate]')) return;
    const previousTranslation = previousOriginal == null ? null : translateText(previousOriginal);
    const source = previousOriginal != null && current === previousTranslation ? previousOriginal : current;
    textOriginal.set(node, source);
    const next = translateText(source);
    if (next !== current) node.nodeValue = next;
  };

  const applyAttributes = (element: Element) => {
    if (element.closest('[data-no-translate]')) return;
    const names = ['placeholder', 'aria-label', 'title'];
    const originals = attributeOriginal.get(element) || new Map<string, string>();
    names.forEach((name) => {
      const current = element.getAttribute(name);
      if (current == null) return;
      const previous = originals.get(name);
      if (language === 'en') {
        if (previous != null && current === translateText(previous) && current !== previous) element.setAttribute(name, previous);
        else originals.set(name, current);
        return;
      }
      const previousTranslation = previous == null ? null : translateText(previous);
      const source = previous != null && current === previousTranslation ? previous : current;
      originals.set(name, source);
      const next = translateText(source);
      if (next !== current) element.setAttribute(name, next);
    });
    attributeOriginal.set(element, originals);
  };

  const applyTree = (node: Node) => {
    if (node.nodeType === Node.TEXT_NODE) applyText(node as Text);
    if (node.nodeType === Node.ELEMENT_NODE) {
      const element = node as Element;
      applyAttributes(element);
      const walker = document.createTreeWalker(element, NodeFilter.SHOW_TEXT | NodeFilter.SHOW_ELEMENT);
      let child = walker.nextNode();
      while (child) {
        if (child.nodeType === Node.TEXT_NODE) applyText(child as Text);
        else applyAttributes(child as Element);
        child = walker.nextNode();
      }
    }
  };

  applying = true;
  applyTree(root);
  applying = false;
  const observer = new MutationObserver((mutations) => {
    if (applying) return;
    applying = true;
    mutations.forEach((mutation) => {
      if (mutation.type === 'characterData') applyText(mutation.target as Text);
      mutation.addedNodes.forEach(applyTree);
      if (mutation.type === 'attributes') applyAttributes(mutation.target as Element);
    });
    applying = false;
  });
  observer.observe(root, { subtree: true, childList: true, characterData: true, attributes: true, attributeFilter: ['placeholder', 'aria-label', 'title'] });
  return () => observer.disconnect();
}

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [language, setLanguage] = useState<SiteLanguage>('en');

  useEffect(() => {
    const saved = window.localStorage.getItem('rti-gov-language');
    if (saved !== 'hi') return;
    const frame = window.requestAnimationFrame(() => setLanguage('hi'));
    return () => window.cancelAnimationFrame(frame);
  }, []);

  useEffect(() => {
    document.documentElement.lang = language === 'hi' ? 'hi-IN' : 'en-IN';
    document.documentElement.dataset.language = language;
    window.localStorage.setItem('rti-gov-language', language);
    return translateDocument(language);
  }, [language]);

  const value = useMemo<LanguageContextValue>(() => ({
    language,
    setLanguage,
    toggleLanguage: () => setLanguage((current) => current === 'en' ? 'hi' : 'en'),
  }), [language]);

  return <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>;
}

export function useLanguage() {
  const value = useContext(LanguageContext);
  if (!value) throw new Error('useLanguage must be used within LanguageProvider');
  return value;
}
