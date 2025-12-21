
This document explains **where things live** in the React (Vite) frontend and **why**.

---

## High-level idea

We separate code by *purpose*:

- **pages/**: route-level screens (URL pages)
- **components/**: reusable UI building blocks
- **layouts/**: shared page shells (Navbar/Sidebar wrappers)
- **routes/**: routing rules + route guards + where the user goes
- **services/**: API calls + local storage helpers
- **assets/**: images + global styles


---

## Folder guide

---

### `src/assets/`
Non-code resources used by the app.

**`assets/images/`**
- logos, icons, UI images, illustrations

**`assets/styles/`**
- global CSS (e.g., `globals.css`)
- CSS variables, fonts, base resets

Rule:
- **assets are not components** — keep them out of `components/`.

---

### `src/components/`
Reusable UI building blocks that can be shared across pages.

**`components/common/`**
Shared “app-level” UI used in many screens:
- `Navbar.jsx`

Guideline:
- Components should be **mostly presentational**
- Avoid placing route-level logic here
- Avoid heavy API calls in these files (keep data fetching in pages)

---

### `src/layouts/`
Page shells that define the overall structure of a set of screens.

Examples:
- `AppLayout.jsx`: pages that require Navbar + Sidebar
- `AuthLayout.jsx`: login/register pages (simple, centered layout)

Rule:
- Layouts should mostly contain structure and shared UI chrome.
- The main content comes from children:
  - `<AppLayout><Dashboard /></AppLayout>`

---

### `src/pages/`
Route-level screens (each page typically maps to a URL route).

Folders are grouped by domain:
- `pages/auth/`
- `pages/dashboard/`
- `pages/projects/`
- `pages/tasks/`
- `pages/teams/`

Pages typically:
- call APIs (via `services/api`)
- handle loading/error state
- compose components together

Rule of thumb:
- If it has a URL, it belongs in `pages/`.

---

### `src/routes/`
Routing configuration & access rules.

---

### `src/services/`
Code for side effects (data & storage). Keeps API logic out of UI.

**`services/api/`**
- endpoints (where the data comes from)

**`services/storage/`**
- localStorage/sessionStorage helpers
- token save/get/remove

Rule:
- UI should call a small function like `getProjects()`, not build fetch logic inline everywhere.

---

## Common workflow examples

### Where does a new "Project Details" screen go?
- UI route screen: `src/pages/projects/ProjectDetails.jsx`
- reusable pieces (cards, modals): `src/components/...` OR `src/pages/projects/components/` if only used there
- API call: `src/services/api/projects.api.js` (or in your existing api folder style)
- layout wrapper: `src/layouts/AppLayout.jsx`

---

## Rules for teammates (consistency)

1. **Do not put route screens inside `components/`.** Use `pages/`.
2. **Do not put API calls inside random components.** Put them under `services/api/`.
3. Shared UI (Navbar/Sidebar/Loader) goes in `components/common/`.
4. Layouts define page structure; pages define page content.
5. If a file is reused in multiple places, move it upward into shared folders.

---

## Naming conventions

- Components: `PascalCase.jsx` (e.g., `TaskCard.jsx`)
- Hooks: `camelCase.js` starting with `use...` (e.g., `useTasks.js`)
- Service modules: `something.api.js` (e.g., `tasks.api.js`)
- Route files: keep names obvious (`ProtectedRoute.jsx`)


---
