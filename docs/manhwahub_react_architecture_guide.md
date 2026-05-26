# ManhwaHub React Project Structure

This document outlines the component architecture and file structure for the "Modern Parchment" ManhwaHub application, optimized for React, Tailwind CSS, and future AWS S3 deployment.

## 1. Project Directory Structure

```text
manhwahub-frontend/
├── public/
│   └── assets/
│       └── images/
│           ├── covers/          # Manhwa cover art
│           ├── placeholders/    # Profile/System placeholders
│           └── brand/           # Logos and icons
├── src/
│   ├── components/              # Reusable UI components
│   │   ├── layout/
│   │   │   ├── Header.jsx       # Top navigation bar
│   │   │   ├── Sidebar.jsx      # Left desktop navigation
│   │   │   ├── MobileNav.jsx    # Bottom mobile navigation
│   │   │   └── Shell.jsx        # Main layout wrapper
│   │   └── common/
│   │       ├── Button.jsx       # Standardized "Inked" buttons
│   │       ├── Card.jsx         # Content containers
│   │       └── PollCard.jsx     # Voting component
│   ├── pages/                   # Main page views
│   │   ├── Home.jsx             # Community Feed
│   │   ├── ManhwaDetail.jsx     # Interaction/Reader page
│   │   ├── Polls.jsx            # Community Polls
│   │   └── Profile.jsx          # User Dashboard
│   ├── theme/
│   │   └── tailwind.config.js   # Synchronized design tokens
│   ├── App.jsx                  # Routing and global state
│   └── main.jsx                 # Entry point
└── package.json
```

## 2. Reusable Component Definitions

### `Header.jsx`
- **Responsibility**: Global top bar with search and account actions.
- **Key Classes**: `w-full max-w-7xl mx-auto flex justify-between items-center px-4 h-16 border-b-2 border-black bg-[#fcf9f8]`

### `Sidebar.jsx`
- **Responsibility**: Primary desktop navigation.
- **Key Classes**: `w-64 h-screen fixed left-0 top-0 border-r-2 border-black bg-[#fcf9f8] shadow-[4px_0_0_0_#000]`

### `MobileNav.jsx`
- **Responsibility**: Bottom navigation for small screens.
- **Key Classes**: `fixed bottom-0 w-full h-16 border-t-2 border-black bg-[#fcf9f8] flex justify-around items-center md:hidden`

### `Shell.jsx`
- **Responsibility**: The high-level layout wrapper that includes the Header, Sidebar, and MobileNav, providing a consistent `main` content area.
- **Structure**:
  ```jsx
  <div className="min-h-screen bg-[#fcf9f8] text-[#455859]">
    <Sidebar />
    <div className="md:ml-64 flex flex-col min-h-screen">
      <Header />
      <main className="flex-grow p-6">
        {children}
      </main>
      <MobileNav />
    </div>
  </div>
  ```

## 3. Tailwind Configuration (`tailwind.config.js`)
The following tokens are baked into the theme:
- **Colors**:
  - `primary`: `#455859` (Inked Teal)
  - `background`: `#fcf9f8` (Parchment)
  - `surface`: `#ffffff`
- **Borders**: `2px solid #000` (Sharp Inked Box)
- **Shadows**: `4px 4px 0px 0px #000` (Hard Shadow)
- **Typography**: Hanken Grotesk / Inter (Clean Sans-Serif)
