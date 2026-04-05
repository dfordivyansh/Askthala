# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Babel](https://babeljs.io/) (or [oxc](https://oxc.rs) when used in [rolldown-vite](https://vite.dev/guide/rolldown)) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## React Compiler

The React Compiler is not enabled on this template because of its impact on dev & build performances. To add it, see [this documentation](https://react.dev/learn/react-compiler/installation).

## Expanding the ESLint configuration

If you are developing a production application, we recommend using TypeScript with type-aware lint rules enabled. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) for information on how to integrate TypeScript and [`typescript-eslint`](https://typescript-eslint.io) in your project.


## Firebase Authentication (Email + OTP via Email)

This project includes a simple Firebase authentication integration with Email/Password and OTP verification sent via email (nodemailer).

Steps to enable Firebase Auth:
1. Create a Firebase project at https://console.firebase.google.com
2. Enable Email/Password sign-in method in Authentication > Sign-in method (Phone is not used anymore).
3. Add your web app and copy the Firebase configuration values.
Important: For the Admin Panel to publish blog posts you must sign in as a Firebase user (not just the demo admin token). Create an admin user in Firebase Console Authentication > Users and use those credentials to log in via the Admin Panel. Firestore security rules often require a signed-in user to write, so creating a Firebase auth user is required for publishing articles.

If you're only testing locally and want to allow unauthenticated writes, adjust your Firestore rules accordingly (not recommended for production). The recommended approach is to sign in with a Firebase-admin account and restrict writes using Firestore security rules.
4. Create a `.env` file based on `.env.example` and set the VITE_FIREBASE_* variables.
5. Install dependencies (client and server):

```bash
npm install firebase
npm install express nodemailer cors dotenv
```

6. Start the server and dev server:

```bash
# In one terminal, start the Node server (uses nodemailer)
node server.js

# In another terminal, start the client
npm run dev
```

Notes:
Notes:
- The signup flow sends a verification code to the user's email using nodemailer. Once verified, the user is created using Firebase email/password and redirected to `/dashboard`.
- For production, replace the in-memory OTP store with a proper DB or cache and add better rate limiting.
