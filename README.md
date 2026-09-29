# 👀 Eye Reminder

A small dark-themed desktop app that reminds you to take care of yourself while using your computer: take screen breaks, drink water, and use eye drops.

Built with Electron. Available in **English** and **Arabic** (with automatic RTL layout).

## Features

- 🔭 **20-20-20 rule**: every 20 minutes, look at something 20 ft (6 m) away for 20 seconds
- 🧘 **Screen breaks**: reminds you to stand up and stretch
- 💧 **Water reminders**: stay hydrated
- 👁️ **Eye drops reminders**: prevent dry eyes
- ⏱️ Session timer showing how long you have been on screen
- ⚙️ Customizable interval for each reminder, with individual on/off switches
- 📊 Daily progress stats (reset automatically each day)
- 🔔 Native system notifications with a sound alert
- 🖥️ Runs in the system tray, with an optional launch-at-startup setting
- 🌗 Dark UI, with English/Arabic language switch

## Getting started

Requires [Node.js](https://nodejs.org) 18 or newer.

```bash
npm install
npm start
```

## Build an installer

```bash
npm run dist
```

The installer will be created in the `dist/` folder.

A GitHub Actions workflow (`.github/workflows/build.yml`) also builds the Windows installer automatically on every push to `main`. Download it from the **Actions** tab under **Artifacts**.

## Project structure

| File | Purpose |
| --- | --- |
| `main.js` | Electron main process: window, tray, startup settings |
| `preload.js` | Secure bridge between the app UI and the main process |
| `index.html` | App interface, timers and translations |
| `assets/icon.png`, `icon.ico` | App and tray icons |

## License

MIT

---

## 🇸🇦 بالعربية

تطبيق سطح مكتب صغير بتصميم داكن يذكّرك أثناء استخدام الحاسوب بأخذ استراحة من الشاشة، وشرب الماء، ووضع قطرة مرطب للعين. يدعم العربية والإنجليزية.
