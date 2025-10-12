export default async function handler(req, res) {
  if (req.method === "POST") {
    const { name, email, message } = req.body;

    console.log("Form submitted:", { name, email, message });

    // For now, just send success without email service
    res.status(200).json({ success: true, message: "Message sent!" });
  } else {
    res.status(405).json({ error: "Method not allowed" });
  }
}
