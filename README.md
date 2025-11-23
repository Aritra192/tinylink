Here is the **English version** of your TinyLink README.

---

# 🚀 TinyLink – Simple URL Shortener

TinyLink is a fast, lightweight, and easy-to-use URL shortener application.
It converts long URLs into short ones and also provides click analytics.

---

## ✨ Features

* 🔗 Convert **long URLs into short URLs**
* ✏️ **Custom short code** (optional)
* 📊 Track **click count**
* 🕒 Track **last clicked time**
* 🖥️ Clean and simple **dashboard UI**
* 🔐 Uses **environment variables** ( `.env` is NOT uploaded to GitHub )
* ⚡ Built with Node.js (very fast and lightweight)

---

## 🛠 Tech Stack

| Part       | Technology                             |
| ---------- | -------------------------------------- |
| Backend    | Node.js, Express                       |
| Frontend   | HTML, CSS, JavaScript                  |
| Database   | JSON file store                        |
| Deployment | (Optional — Render / Vercel in future) |

---

## 📥 Installation & Setup

```bash
git clone https://github.com/Aritra192/tinylink.git
cd tinylink
npm install
```

---

## 🔐 Environment Variables

Create a `.env` file (this file is ignored by GitHub):

```
PORT=3000
BASE_URL=http://localhost:3000
```

---

## ▶️ Run the Project

```bash
npm start
```

Your server will run at:

```
http://localhost:3000
```

---

## 📌 API Endpoints

| Method | Endpoint  | Description                       |
| ------ | --------- | --------------------------------- |
| POST   | `/create` | Create a short URL                |
| GET    | `/:code`  | Redirect to the original long URL |

---

## 🖼 Optional: Add Screenshot

If you want, you can add a screenshot of your dashboard here:

```
![TinyLink UI](screenshot.png)
```

---

## 👨‍💻 Author

**Aritra Mandal**
GitHub: [https://github.com/Aritra192](https://github.com/Aritra192)

---

## ⭐ Support

If you like this project, don't forget to **star ⭐ the repository on GitHub!**

---

