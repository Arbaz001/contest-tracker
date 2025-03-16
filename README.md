# Coding Contest Tracker 🚀

A MERN stack application to track coding contests from **Codeforces**, **LeetCode**, and **CodeChef**. The app displays upcoming and past contests, allows filtering by platform, and supports desktop view on mobile devices.

---

## Features ✨
- **Fetch Contests**: Get all upcoming and past contests from Codeforces, LeetCode, and CodeChef.
- **Filters**: Filter contests by platform (Codeforces, LeetCode, CodeChef).
- **Desktop View on Mobile**: The app is optimized for desktop view even on mobile devices.
- **Responsive Design**: Works seamlessly on desktop, tablet, and mobile.

---

## Tech Stack 💻
- **Frontend**: React.js, Material-UI (MUI), Vite
- **Backend**: Node.js, Express.js
- **Deployment**:
  - Backend: [Render](https://render.com/)
  - Frontend: [Vercel](https://vercel.com/)

---

## Live Demo 🌐
- **Frontend**: [https://coding-contest-tracker.vercel.app](https://coding-contest-tracker.vercel.app)
- **Backend**: [https://contest-tracker-backend.onrender.com](https://contest-tracker-backend.onrender.com)

---

## Setup Instructions 🛠️

### 1. Clone the Repository
```bash
git clone https://github.com/your-username/coding-contest-tracker.git
cd coding-contest-tracker
```

### 2. Backend Setup
1. Navigate to the backend folder:
   ```bash
   cd backend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Create a `.env` file and add environment variables:
   ```env
   PORT=3000
   MONGO_URI=mongodb+srv://username:password@cluster0.mongodb.net/contest-tracker
   ```

4. Start the backend server:
   ```bash
   npm start
   ```

### 3. Frontend Setup
1. Navigate to the frontend folder:
   ```bash
   cd ../frontend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the frontend development server:
   ```bash
   npm run dev
   ```

---

## Deployment 🚀

### Backend on Render
1. Go to [Render](https://render.com/) and create a new **Web Service**.
2. Connect your GitHub repository.
3. Set the following:
   - **Build Command**: `npm install`
   - **Start Command**: `npm start`
   - **Environment Variables**: Add `PORT` and `MONGO_URI`.
4. Deploy the backend.

### Frontend on Vercel
1. Go to [Vercel](https://vercel.com/) and create a new project.
2. Connect your GitHub repository.
3. Set the following:
   - **Build Command**: `npm install && npm run build`
   - **Output Directory**: `frontend/build`
4. Deploy the frontend.

---

## Desktop View on Mobile 📱
The app is designed to display in **desktop view** even on mobile devices. This ensures a consistent user experience across all devices. Horizontal scrolling is enabled for better navigation.

---

## Contributing 🤝
Contributions are welcome! If you find any issues or want to add new features, feel free to open a pull request.

---

## License 📄
This project is licensed under the MIT License. See the [MIT](MIT) file for details.

---

## Contact 📧
For any queries or feedback, reach out to me at [arbazalisgl@gmail.com](mailto:arbazalisgl@gmail.com).

```