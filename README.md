# Tiffin Lunch Tracking Bot 🍱

A simple Telegram bot for tracking lunch expenses among friends.

## Overview

This bot allows a group of friends to track who ate lunch each day and calculates the total expenses based on a fixed price for each lunch. The primary functionalities include marking individual friends who ate, viewing the report for the day, and resetting the data for the next day.

## Features

- **Simple Interaction**: The bot uses inline keyboards for easy and intuitive interactions.
- **Track Expenses**: Automatically calculates the total expense for the day based on the number of friends who ate.
- **Add Names**: Ability to add multiple names in a single command.
- **Reset Data**: Clears the data for the next day with a single click.

## Setup and Installation

1. **Clone the Repository**:
git clone https://github.com/dixitt5/lunchbot.git

2. **Set up a Virtual Environment** (optional but recommended):
```bash
python -m venv venv
source venv/bin/activate  # On Windows use: .\venv\Scripts\activate
```
3. Install required Packages
```bash
pip install -r requirements.txt
```
4. Setup Enviroment Variables
 - Either set up a system environment variable named TELEGRAM_TOKEN with your bot token or
 - Use a .env file in the root directory with the content:
   ```TELEGRAM_TOKEN=your_token_here```
5. Run the Bot
  - ```python tiffin_bot.py```
   
## Usage

1. /start: Starts the bot and displays the main menu.
2. /add Name1, Name2,...: Adds the names of friends who ate.
3. Use inline buttons for interaction like viewing report or resetting data.
   
## Contributing
Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change.

## License
[MIT](https://choosealicense.com/licenses/mit/)
