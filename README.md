# Todo App with Vue 3 + TypeScript + Vite

![Todo App Screenshot](./public/screenshot.png)

## Table of contents

- [Overview](#overview)
  - [The challenge](#the-challenge)
  - [Links](#links)
- [My process](#my-process)
  - [Built with](#built-with)
  - [Features](#features)
  - [What I learned](#what-i-learned)
  - [Useful resources](#useful-resources)
- [Getting Started](#getting-started)
  - [Prerequisites](#prerequisites)
  - [Installation](#installation)
  - [Development](#development)
  - [Building for Production](#building-for-production)
- [Author](#author)

## Overview

### The Challenge

Users should be able to:

- View the optimal layout for the app depending on their device's screen size
- Add new todos to the list
- Mark todos as complete
- Delete todos from the list
- Filter by all/active/complete todos
- Clear all completed todos
- Toggle light and dark mode (optional)
- **Bonus**: Drag and drop to reorder items on the list

### Links

- [Live Demo](https://flippant-act.pipeops.net/) 

## My process

### Built With

- [Vue 3](https://vuejs.org/) - JavaScript framework
- [TypeScript](https://www.typescriptlang.org/) - Type checking
- [Vite](https://vitejs.dev/) - Build tool
- [Tailwind CSS](https://tailwindcss.com/) - For styles
- [Vue Router](https://router.vuejs.org/) - For page routing
- [VueUse](https://vueuse.org/) - Collection of Vue composition utilities

### Features

- **Modern Vue 3 Composition API** with `<script setup>` syntax
- **Type Safety** with TypeScript
- **Responsive Design** that works on mobile, tablet, and desktop
- **Dark/Light Mode** toggle
- **Toast Notifications** for user feedback
- **Form Validation** for better user experience
- **Persistent Storage** using localStorage
- **Clean Code** with proper TypeScript types and interfaces

### What I Learned

- How to use Vue 3's Composition API with TypeScript
- Implementing state management with reactive references and computed properties
- Creating reusable composables for common functionality
- Working with Vue Router for navigation
- Using Tailwind CSS for responsive design
- Implementing form validation and error handling
- Creating custom hooks with VueUse

### Useful Resources

- [Vue 3 Documentation](https://v3.vuejs.org/) - Official Vue 3 documentation
- [TypeScript with Vue](https://v3.vuejs.org/guide/typescript/overview.html) - TypeScript support in Vue
- [VueUse](https://vueuse.org/) - Collection of Vue composition utilities
- [Tailwind CSS Documentation](https://tailwindcss.com/docs) - For styling components

## Getting Started

### Prerequisites

- Node.js (v16 or later recommended)
- npm or yarn package manager

### Installation

1. Clone the repository
   ```bash
   git clone https://github.com/yourusername/todo-app-vue.git
   cd todo-app-vue
   ```

2. Install dependencies
   ```bash
   npm install
   # or
   yarn
   ```

### Development

Start the development server:

```bash
npm run dev
# or
yarn dev
```

### Building for Production

To create a production build:

```bash
npm run build
# or
yarn build
```

Preview the production build:

```bash
npm run preview
# or
yarn preview
```
