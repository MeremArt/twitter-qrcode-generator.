"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const qrcode_1 = __importDefault(require("qrcode"));
const app = (0, express_1.default)();
const port = 5500; // You can change the port
// Define the Twitter URL as a constant
const TWITTER_URL = "https://x.com/DeCharge__";
// Endpoint to generate a QR code for the Twitter URL
app.get("/", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // Generate QR code as a Data URL
        const qrCodeDataURL = yield qrcode_1.default.toDataURL(TWITTER_URL);
        // Set response content type to image (PNG)
        res.setHeader("Content-Type", "image/png");
        // Remove the Data URL prefix (base64)
        const base64Image = qrCodeDataURL.split(",")[1];
        // Send the base64 decoded image as a buffer
        const imgBuffer = Buffer.from(base64Image, "base64");
        res.send(imgBuffer);
    }
    catch (error) {
        console.error("QR Code generation failed:", error);
        res.status(500).json({ message: "Failed to generate QR code" });
    }
}));
// Start the Express server
app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
});
