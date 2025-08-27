// api/webhook.js
export default function handler(req, res) {
  if (req.method === "POST") {
    console.log(req.body); // LINEから送られてきたデータを確認
    res.status(200).send("OK");
  } else {
    res.status(405).send("Method Not Allowed");
  }
}
