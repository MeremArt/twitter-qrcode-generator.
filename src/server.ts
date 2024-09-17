import express, { Request, Response } from "express";
import QRCode from "qrcode";

const app = express();
const port = 5500; // You can change the port

// Define the Twitter URL as a constant
const TWITTER_URL = "https://x.com/DeCharge__";

// Endpoint to generate a QR code for the Twitter URL
app.get("/", async (req: Request, res: Response) => {
  try {
    // Generate QR code as a Data URL
    const qrCodeDataURL = await QRCode.toDataURL(TWITTER_URL);

    // Set response content type to image (PNG)
    res.setHeader("Content-Type", "image/png");

    // Remove the Data URL prefix (base64)
    const base64Image = qrCodeDataURL.split(",")[1];

    // Send the base64 decoded image as a buffer
    const imgBuffer = Buffer.from(base64Image, "base64");
    res.send(imgBuffer);
  } catch (error) {
    console.error("QR Code generation failed:", error);
    res.status(500).json({ message: "Failed to generate QR code" });
  }
});

// Start the Express server
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
