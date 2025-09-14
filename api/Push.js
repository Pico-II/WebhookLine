// api/Push.js
export default async function handler(req, res) {
  if (req.method === "POST") {
    try {
      const userId = "Ua75dbd3600023e3ab29c81db2cfebceb"; // 誰に送るか指定

      const message = {
        to: userId,
        messages: [
          {
            type: "text",
            text: "⚠️ 勉強サボり検知！集中してください！",
          },
        ],
      };

      const response = await fetch("https://api.line.me/v2/bot/message/push", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${process.env.LINE_CHANNEL_ACCESS_TOKEN}`,
        },
        body: JSON.stringify(message),
      });

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(errorText);
      }

      res.status(200).json({ status: "ok" });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  } else {
    res.status(405).send("Method Not Allowed");
  }
}
