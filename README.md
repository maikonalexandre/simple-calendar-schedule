![dashboard](https://github.com/maikonalexandre/simple-calendar-schedule-/assets/86725282/a1e9da88-23ec-45cd-ad8f-04f90c8bd745)

<div align="center">
<p></p>

<a href="#-install">📌 Install</a>
<span>&nbsp;&nbsp;•&nbsp;&nbsp;</span>
<a href="#-stack">🛠️ Stack</a>
<span>&nbsp;&nbsp;•&nbsp;&nbsp;</span>
<a href="https://twitter.com/maikonalx">🐦 Twitter</a>

![GitHub stars](https://img.shields.io/github/stars/maikonalexandre/simple-calendar-schedule-)
![GitHub issues](https://img.shields.io/github/issues/maikonalexandre/simple-calendar-schedule-)
![GitHub license](https://img.shields.io/github/license/maikonalexandre/simple-calendar-schedule-)
[![Required Node.JS >=18.0.0](https://img.shields.io/static/v1?label=node&message=%20%3E=18.0.0&logo=node.js&color=3f893e)](https://nodejs.org/about/releases)

</div>

## 👋 Introduction

[**simple-calendar-schedule**]() is simple browser extension that gives you quick access to emojis

- Several emojis separated by category.
- Support for Google Chrome, Brave, Firefox and others.
- Saves the most used emogis

## 📌 Install

You will need:

- [Node.js 18+ (recommended 20 LTS)](https://nodejs.org/en/).
- [Git](https://git-scm.com/).

1. Clone this repo locally:

```bash
git clone git@github.com:maikonalexandre/simple-calendar-schedule-.git
```

2. Install dependencies:

```bash
#run
npm install
# or
pnpm install
# or
yarn install
```

3. Setup backend:

```bash
cd packages/backend
# run 
npx prisma generate
# and
npx prisma migrate dev --name init
```

4. Run backend:

```bash
#on root directory run or dev on backend directory
npm backend
# or
pnpm backend
# or
yarn backend
```

5. Run frontend:

```bash
#run on root directory or dev on frontend directory
npm front end
# or
pnpm front end
# or
yarn front end
```



## 🛠️ Stack
- [**Typescript**](https://www.typescriptlang.org/) - JavaScript with syntax for types.
- [**Tailwindcss**](https://tailwindcss.com/) - A utility-first CSS framework for rapidly building custom designs
- [**Prettier**](https://prettier.io/) - An opinionated code formatter.
- [**shadcn-ui**](https://ui.shadcn.com/) - An style library
- [**Vite**](https://vitejs.dev/) - A build tool that aims to provide a faster and leaner development experience for modern web projects.
- [**Fastify**](https://vitejs.dev/) - is a web framework highly focused on providing the best developer experience with the least overhead and a powerful plugin architecture.
- [**Prisma**](https://vitejs.dev/) - is a data base orm for javascript

**And more**




