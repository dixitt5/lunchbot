from telegram import InlineKeyboardButton, InlineKeyboardMarkup
from telegram.ext import Updater, CommandHandler, CallbackQueryHandler, MessageHandler, Filters
import logging
import os
from dotenv import load_dotenv
load_dotenv()
logging.basicConfig(level=logging.DEBUG,
                    format='%(asctime)s - %(name)s - %(levelname)s - %(message)s')

TOKEN = os.environ.get('TELEGRAM_TOKEN')

users_eaten = {}
friends = ['Dixit', 'Sohil', 'Aditya','Dev','Akash']
PRICE_PER_LUNCH = 60

def display_main_menu(update, context):
    keyboard = [
        [InlineKeyboardButton("Start", callback_data="start")],
        [InlineKeyboardButton("Reset", callback_data="reset")],
        [InlineKeyboardButton("Report", callback_data="report")]
    ]
    reply_markup = InlineKeyboardMarkup(keyboard)
    update.message.reply_text('Choose an option:', reply_markup=reply_markup)

def start(update, context):
    keyboard = [
        [InlineKeyboardButton(name, callback_data=name) for name in friends]
    ]

    reply_markup = InlineKeyboardMarkup(keyboard)

    # Check if it's a direct command or a callback query
    if update.message:
        update.message.reply_text('Who ate today?', reply_markup=reply_markup)
    else:  # It's a callback query
        query = update.callback_query
        query.message.edit_text('Who ate today?', reply_markup=reply_markup)

def add_names(update, context):
    names = update.message.text.split(",")
    added_names = []  # To keep track of names that were successfully added
    logging.info(f"Received names: {names}")
    for name in names:
        name = name.strip()
        if name in friends and name not in users_eaten:
            users_eaten[name] = True
            added_names.append(name)

    if added_names:
        update.message.reply_text(f"Marked {', '.join(added_names)} as eaten today.")
    else:
        update.message.reply_text(f"No new names were added. Make sure the names are correct and haven't been added already.")
    
    display_main_menu(update, context)


def report(update, context):
    total_expense = len(users_eaten) * PRICE_PER_LUNCH
    report_text = "\n".join([name for name in users_eaten])
    if update.message:
        update.message.reply_text(f"Friends who ate today:\n{report_text}\n\nTotal Expense: {total_expense}")
    else:  # It's a callback query
        query = update.callback_query
        query.message.edit_text(f"Friends who ate today:\n{report_text}\n\nTotal Expense: {total_expense}")

def button(update, context):
    query = update.callback_query
    choice = query.data

    if choice in friends:
        if choice in users_eaten:
            query.edit_message_text(text=f"{choice} has already been marked as eaten today.")
        else:
            users_eaten[choice] = True
            query.edit_message_text(text=f"Marked {choice} as eaten today.")
        query.answer()  # Close the loading spinner
    elif choice == "start":
        start(update, context)
        query.answer()  # Close the loading spinner
    elif choice == "reset":
        reset(update, context)
        query.answer()  # Close the loading spinner
    elif choice == "report":
        report(update, context)
        query.answer()  # Close the loading spinner



def reset(update, context):
    users_eaten.clear()
    # Check if it's a direct command or a callback query
    if update.message:
        update.message.reply_text(f"List reset for the next day!")
    else:  # It's a callback query
        query = update.callback_query
        query.message.edit_text(f"List reset for the next day!")
    display_main_menu(update, context)  # Display the main menu after resetting


def main():
    updater = Updater(TOKEN, use_context=True)

    dp = updater.dispatcher
    dp.add_handler(CommandHandler("start", start))
    dp.add_handler(CommandHandler("add", add_names))
    dp.add_handler(CommandHandler("menu",display_main_menu))
    dp.add_handler(CallbackQueryHandler(button))
    dp.add_handler(MessageHandler(Filters.text & ~Filters.command, add_names))

    updater.start_polling()
    updater.idle()

if __name__ == '__main__':
    main()
