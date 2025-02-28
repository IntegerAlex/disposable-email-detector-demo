# Disposable Email Detector Demo

[![Next.js](https://img.shields.io/badge/Next.js-14.0-black?style=flat&logo=next.js)](https://nextjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue?style=flat&logo=typescript)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-3.0-38B2AC?style=flat&logo=tailwind-css)](https://tailwindcss.com/)
[![NPM Package](https://img.shields.io/badge/NPM-disposable--email--detector-red?style=flat&logo=npm)](https://www.npmjs.com/package/disposable-email-detector)
[![License](https://img.shields.io/badge/License-MIT-green.svg)](https://opensource.org/licenses/MIT)

A demonstration web application showcasing the functionality of the [disposable-email-detector] npm package. 
This tool helps identify disposable/temporary email addresses in real-time.

NPM Package: https://www.npmjs.com/package/disposable-email-detector 

FEATURES
--------
* Real-time email validation
* Simple and intuitive user interface
* Server-side email checking
* Responsive design
* Loading states and error handling
* Clear visual feedback

TECH STACK
----------
* Next.js 14
* TypeScript
* Tailwind CSS
* disposable-email-detector

INSTALLATION
-----------
# Clone the repository
git clone https://github.com/IntegerAlex/disposable-email-detector-demo

# Navigate to project directory
cd disposable-email-detector-demo

# Install dependencies
npm install

# Start the development server
npm run dev

USAGE
-----
1. Visit the application in your browser
2. Enter an email address in the input field
3. Click "Check Email"
4. Get instant feedback on whether the email is disposable

API ENDPOINT
-----------
The application exposes a simple API endpoint:

POST /api/checkEmail
Content-Type: application/json

Request body:
{
  "email": "test@example.com"
}

Response:
{
  "isDisposable": true|false
}

EXAMPLE
-------
const response = await fetch('/api/checkEmail', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({ email: 'test@mailinator.com' })
});

const data = await response.json();
// data.isDisposable will be true for disposable emails

CONTRIBUTING
-----------
Contributions, issues, and feature requests are welcome! 
Feel free to check the issues page: https://github.com/IntegerAlex/disposable-email-detector/issues

LICENSE
-------
This project is GPL-3.0 licensed.


AUTHOR
------
Akshat Kotpalliwar
Portfolio: https://realtalkportfolio.vercel.app/
GitHub: https://github.com/IntegerAlex

ACKNOWLEDGMENTS
--------------
* disposable-email-detector npm package
* Next.js team for the amazing framework
* Tailwind CSS for the utility-first CSS framework

-------------------
If you found this helpful, please star the repository!

NPM Package: https://www.npmjs.com/package/disposable-email-detector 
