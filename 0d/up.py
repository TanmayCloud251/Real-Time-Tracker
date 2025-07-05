from telegram import Update
from telegram.ext import ApplicationBuilder, CommandHandler, ContextTypes

VIDEO_FILE_ID = "your_video_file_id_here"  # Replace with actual file_id

async def start(update: Update, context: ContextTypes.DEFAULT_TYPE):
    await update.message.reply_text("Here is your video:")
    await context.bot.send_video(chat_id=update.effective_chat.id, video=VIDEO_FILE_ID)

app = ApplicationBuilder().token("7611455936:AAFwEIRgRAwWfb2hq-IiMV1VUBs0Lqknc3M").build()
app.add_handler(CommandHandler("start", start))
app.run_polling()
