# 📌 TodyApp

A mobile application built with **Expo**, **React Native**, and **React Query** that allows users to create, view, and manage todos.  
The app features a **tab-based navigation** layout, todo filtering, and a clean, minimal UI styled with **Tailwind CSS**.

## 🚀 Setup Instructions

1. **Clone the repository**
   - git clone https://github.com/Modinat1/react-native-todyapp.git
   - cd react-native-todyapp
   - npm install
   - npx expo start

## 🎨 Design choices or assumptions made

# Architecture

- API requests are structured into a services layer (using axios) and consumed through hooks with React Query for caching, fetching, and mutation.

- UI is built using Tailwind for faster and utility-first styling.

- All colors used are configured in the tailwind.config.ts file for consistency

- Navigation is handled by expo-router, and Tabs layout.

# State Management

- Query and mutation states (loading, error, success) are handled through React Query.

- Zustand is used for global state management

# Icons

- All icons are SVGs stored in /assets/svgs for consistency and scalability.

# Filtering

- Todos are filtered into In Progress and Completed categories.

## ✨ Features Implemented

# 🖥 UI Features

- Onboarding – Designed onboarding flow for new users.

- Authentication – Designed register & login screens.

- Home & Todos – Home screen, upcoming todos screen, filter screens, and todo project management screens.

- Settings – Settings screen populated with authenticated user data from DummyJSON API.

# ⚙ Functional Features

- Authentication – Simulated login using DummyJSON Auth API.

- Todos API – Fetch todos from DummyJSON Todos.

- Filtering – Filtererd todos into In Progress & Completed.

- Card Layout – Todos displayed in a clean, card-based UI.

# 🗺 Navigation

- Tab-based navigation with active state indicators.

- Custom SVG icons for each tab.

# 🛠 API Integration

- Axios-based service layer for API requests.

- React Query for api consumption and caching.
