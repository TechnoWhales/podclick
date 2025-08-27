# **Podclick** <svg width="28" height="28" viewBox="0 0 108 108" fill="none" xmlns="http://www.w3.org/2000/svg"><rect width="108" height="108" rx="15" fill="#333333"/><circle cx="54" cy="54" r="25" fill="#4C8DFF" stroke="white" stroke-width="10"/></svg>

**Podclick** is a full-stack social media application inspired by Instagram, built with modern web technologies and following best practices in architecture, performance, and maintainability.

## ✨ Key Features

✅ Authentication (JWT, OAuth)  
✅ FSD (Feature-Sliced Design) architecture  
✅ Internationalization (i18n) with language switching  
✅ Storybook for UI component documentation  
✅ Form validation with Zod  
✅ Accessible UI built with Radix UI components  
✅ TypeScript for type safety  
✅ State management with RTK Query

## 📂 Project Structure (FSD)

src/

| folder                      | description                               |
| --------------------------- | ----------------------------------------- |
| ├── app/                    | # Next.js app router                      |
| ├── features/               | # Feature-based logic (e.g., auth, posts) |
| <pre> ├── auth/</pre>       | # Auth forms, hooks, API calls            |
| <pre> └── posts/</pre>      | # Post creation, feed, interactions       |
| ├── shared/                 | # Reusable utilities & components         |
| <pre> ├── api/</pre>        | # API clients, RTK Query config           |
| <pre> ├── components/</pre> | # UI Kit: foundational components         |
| <pre> ├── constants/</pre>  | # Static application data                 |
| <pre> ├── hooks/</pre>      | # Shared custom hooks                     |
| <pre> ├── model/</pre>      | # Business logic models                   |
| <pre> ├── providers/</pre>  | # Context providers                       |
| <pre> ├── schemas/</pre>    | # Zod schemas                             |
| <pre> ├── store/</pre>      | # Redux store configuration               |
| <pre> ├── styles/</pre>     | # Global styling                          |
| <pre> └── types/</pre>      | # Global TypeScript types                 |

## 🛠 Tech Stack

- Frontend: Next.js, TypeScript
- Styling: CSS Modules / SCSS
- State Management: RTK Query
- UI Components: Radix UI + Storybook
- Forms & Validation: React Hook Form + Zod
- Internationalization: i18n
- Testing: Jest
- Package Manager: PNPM

# **🚀 Getting Started**

### **1\. Clone Repository**

`git clone https://github.com/TechnoWhales/podclick.git`

`cd podclick`

### **2\. Install dependencies**

`pnpm install`

### **3\. Environment Setup**

The project uses multiple environment files:

- .env.local - For local development (git-ignored)
- .env.production - Production variables (committed with safe defaults)

### **4\. Run the development server**

`pnpm dev`

### **5\. (Optional) Launch Storybook**

`pnpm storybook`

### **6\. Build for production**

`pnpm build`

# **📜 Scripts**

| Command               | Description                     |
| --------------------- | ------------------------------- |
| pnpm dev              | Start dev server                |
| pnpm build            | Build for production            |
| pnpm start            | Run production server           |
| pnpm test             | Run Next.js linting             |
| pnpm build:production | Alias for build (compatibility) |

### **Linting & Formatting**

| Command                 | Description                                     |
| ----------------------- | ----------------------------------------------- |
| pnpm lint               | Run all linters (Prettier + ESLint + Stylelint) |
| pnpm lint:fix           | Auto-fix all linting issues                     |
| pnpm lint:prettier      | Check code formatting with Prettier             |
| pnpm lint:eslint        | Run ESLint static analysis                      |
| pnpm lint:stylelint     | Check CSS/SCSS/LESS styles                      |
| pnpm lint:prettier:fix  | Auto-format files with Prettier                 |
| pnpm lint:eslint:fix    | Auto-fix ESLint issues                          |
| pnpm lint:stylelint:fix | Auto-fix Stylelint issues                       |

### **Storybook**

| Command              | Description                              |
| -------------------- | ---------------------------------------- |
| pnpm storybook       | Launch Storybook dev server on port 6006 |
| pnpm build-storybook | Build static Storybook for deployment    |

# **Useful Links**

- [FSD Documentation](https://feature-sliced.design/)
- [Radix UI](https://www.radix-ui.com/)[RTK Query](https://redux-toolkit.js.org/rtk-query/overview)
- [Zod Validation](https://zod.dev/)
- [i18n](https://next-intl.dev/docs/getting-started/app-router/with-i18n-routing)

---

Podclick is designed for scalability and maintainability, making it a great reference for full-stack developers 🎉
