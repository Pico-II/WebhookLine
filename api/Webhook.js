// api/webhook.js
// ユーザーがボットに送った内容を受け取り、特定のコマンドなら返信する

export default async function handler(req, res) {
  if (req.method === "POST") {
    try {
      const events = req.body.events; // LINEから送られてきたイベント一覧

      // イベントがあるか確認
      if (!events || events.length === 0) {
        return res.status(200).send("No events");
      }

      // 複数イベントが送られてくる可能性があるのでループ
      for (const event of events) {
        // ユーザーIDを取得
        const userId = event.source.userId;

        // ユーザーが送ったテキスト
        const userMessage = event.message?.text;

        // コマンドが "/id" の場合
        if (userMessage === "/id") {
          // 返信メッセージ
          const replyMessage = {
            replyToken: event.replyToken, // このイベントに返信するためのトークン
            messages: [
              {
                type: "text",
                text: `あなたのユーザーIDは:\n${userId}`,
              },
            ],
          };

          // LINEのReply APIに送信
          await fetch("https://api.line.me/v2/bot/message/reply", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${process.env.LINE_CHANNEL_ACCESS_TOKEN}`,
            },
            body: JSON.stringify(replyMessage),
          });
        }
      }

      res.status(200).send("OK");
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  } else {
    res.status(405).send("Method Not Allowed");
  }
}
