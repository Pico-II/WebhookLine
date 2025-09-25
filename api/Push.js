// api/Push.js
// 誰から来たリクエストかを Arduino 側が知らせることで
// 個別のユーザーに通知を送る仕組み。

export default async function handler(req, res) {
  if (req.method === "POST") {
    try {
      // Arduinoから送られてきたリクエストのbodyを取得
      const { userId } = req.body; 

      // userIdが無ければエラー
      if (!userId) {
        return res.status(400).json({ error: "userId is required" });
      }

      // 送信するメッセージ内容
      const message = {
        to: userId, // リクエストしてきたユーザーのID
        messages: [
          {
            type: "text",
            text: "⚠️ 勉強サボり検知！集中してください！",
          },
        ],
      };

      // LINE APIにプッシュ通知を送信
      const response = await fetch("https://api.line.me/v2/bot/message/push", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${process.env.LINE_CHANNEL_ACCESS_TOKEN}`, 
        },
        body: JSON.stringify(message),
      });

      // 失敗した場合
      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(errorText);
      }

      // 成功レスポンス
      res.status(200).json({ status: "ok" });

    } catch (error) {
      // サーバー側エラー
      res.status(500).json({ error: error.message });
    }
  } else {
    res.status(405).send("Method Not Allowed");
  }
}
