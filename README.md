# 🍽️ Meal Explorer App

A modern web application to explore meals and ingredients using the **TheMealDB API**.
Built with **Next.js**, **TypeScript**, and optimized UI/UX for fast performance.

---

## ✨ Features

* 🔍 Search ingredients in real-time (debounced)
* 🍳 Browse meals by ingredient
* 📄 Detailed meal page (ingredients, instructions, video)
* 🎥 Embedded YouTube cooking tutorials
* ⚡ Optimized image loading with Next.js
* 📱 Fully responsive design
* 📄 Pagination for better performance
* 🧠 Type-safe API integration (no `any`)

---

## 🛠️ Tech Stack

* **Framework**: Next.js (App Router)
* **Language**: TypeScript
* **Styling**: Tailwind CSS
* **Data Fetching**: Custom Hooks
* **API**: TheMealDB

---

## 📁 Project Structure

```
src/
├── app/
│   ├── page.tsx                # Dashboard (ingredients)
│   ├── ingredients/
│   │   └── [name]/page.tsx    # Meals by ingredient
│   ├── meals/
│   │   └── [id]/page.tsx      # Meal detail
│
├── features/
│   ├── ingredient/
│   │   ├── hooks/
│   │   └── types/
│   ├── meal/
│   │   ├── hooks/
│   │   └── types/
│
├── shared/
│   ├── components/
│   │   └── Breadcrumb.tsx
│   └── utils/
│       └── useDebounce.ts
```

---

## 🚀 Getting Started

### 1. Clone Repository

```bash
git clone https://github.com/Dmarcellakbar/cmlabs-frontend-parttime-test.git
cd cmlabs-frontend-parttime-test
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Run Development Server

```bash
npm run dev
```

App will run on:

```
http://localhost:3000
```

---

## ⚙️ Configuration

### Enable external images (Next.js)

```js
// next.config.js
module.exports = {
  images: {
    domains: ['www.themealdb.com'],
  },
};
```

---

## ⚡ Performance Optimization

* Pagination to limit DOM rendering
* Debounced search input
* `next/image` with `unoptimized` for faster dev experience
* Lazy rendering for better UX

---

## 📌 Future Improvements

* 🔄 Infinite scroll
* ⚡ React Query integration
* 🎨 Advanced UI (shimmer loading, skeleton)
* ⭐ Favorites / Bookmark feature
* 🌐 Deployment (Vercel)

---

## 🤝 Contributing

Contributions are welcome!

1. Fork the project
2. Create your feature branch
3. Commit your changes
4. Push to your branch
5. Open a Pull Request

---

## 📄 License

This project is open source and available under the MIT License.

---

## 👨‍💻 Author

**Marcell**
GitHub: https://github.com/Dmarcellakbar

---

## ⭐ Support

If you like this project, give it a ⭐ on GitHub!
