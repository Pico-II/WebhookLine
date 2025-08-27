// api/Webhook.js
export default function handler(req, res) {
  if (req.method === "POST") {
    const body = req.body;

    // イベントがあればループ（複数来る可能性があるため）
    if (body.events) {
      body.events.forEach((event) => {
        console.log("ユーザーID:", event.source.userId);
        console.log("送られたメッセージ:", event.message?.text);
      });
    }

    res.status(200).send("OK");
  } else {
    res.status(405).send("Method Not Allowed");
  }
}
