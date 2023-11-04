
# Tiffin Lunch Tracking Bot 🍱

This repository contains the code for a Telegram bot designed to track and manage lunch (tiffin) expenses among friends or small groups.

## Overview

The Tiffin Lunch Tracking Bot allows you to record who has partaken in a shared lunch on a given day, tallying up the costs and managing dues effortlessly. The bot supports multiple entries at once and can report the day's expenses with simplicity and ease.

## Features

- **Inline Keyboard Interface**: For ease of use, the bot features a simple tap-to-mark attendance interface.
- **Expense Tracking**: The bot calculates and reports the day's total expenses dynamically.
- **Bulk Additions**: Multiple users can be added to the day's count with a single command.
- **Daily Reset**: Clears the day's records with a click to start fresh the next day.

## Local Development and Setup

Here's how you can run this bot locally:

1. **Clone the repository:**
   ```sh
   git clone https://github.com/dixitt5/lunchbot.git
   ```
2. **Navigate to your project directory:**
   ```sh
   cd lunchbot
   ```
3. **Install dependencies:**
   ```sh
   npm install
   ```
4. **Set up environment variables:**
   Create a `.env` file in the root of your project and add the following:
   ```plaintext
   TELEGRAM_TOKEN=your_telegram_bot_token
   ```
5. **Start the application:**
   ```sh
   node app.js  # Or whatever your start script is
   ```

   Note: Ensure you have `node` installed on your system.

## Usage Instructions

After setup, assign your bot's webhook to the local server using `ngrok` and Telegram's setWebhook method.

1. **Run ngrok to expose your server:**
   ```sh
   ngrok http 3000
   ```

2. **Copy the https URL given by ngrok and set the webhook with Telegram API:**
   Replace `YOUR_TELEGRAM_BOT_TOKEN` and `https_ngrok_url` accordingly and visit:
   ```
   https://api.telegram.org/botYOUR_TELEGRAM_BOT_TOKEN/setWebhook?url=https_ngrok_url
   ```

3. **Interact with the bot using the following commands:**
   - `/start` - To start the bot and see the main menu.
   - `/add Name1, Name2, ...` - To add the names of the friends who ate.

## Contributing

Contributions are what make the open-source community such a fantastic place to learn, inspire, and create. Any contributions you make are **greatly appreciated**.

1. Fork the Project
2. Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3. Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the Branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License

Distributed under the MIT License. See `LICENSE` for more information.
