"use client";

import { useState, ChangeEvent } from "react";
import QRCode from "qrcode.react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import html2canvas from "html2canvas";

const Home = () => {
  const [url, setUrl] = useState<string>("");
  const [fileUrl, setFileUrl] = useState<string>("");
  const [qrCodeUrl, setQrCodeUrl] = useState<string>("");

  const handleGenerateQRCode = () => {
    const selectedUrl = fileUrl || url;
    setQrCodeUrl(selectedUrl);
  };

  const handleDownloadQRCode = () => {
    const qrCodeElement = document.getElementById("qrcode");
    if (qrCodeElement) {
      html2canvas(qrCodeElement).then((canvas) => {
        const link = document.createElement("a");
        link.href = canvas.toDataURL("image/png");
        link.download = "qrcode.png";
        link.click();
      });
    }
  };

  return (
    <main className="flex flex-col items-center justify-center min-h-screen py-2 bg-slate-100">
      <h1 className="text-5xl font-bold mb-4 text-azure-radiance-600">
        Qrbuilder
      </h1>
      <div className="bg-white border border-azure-radiance-600 p-6 rounded-lg shadow-md justify-center flex flex-col">
        <Input
          type="url"
          placeholder="URL"
          value={url}
          onChange={(e: ChangeEvent<HTMLInputElement>) => {
            setUrl(e.target.value);
            setFileUrl(""); // Clear the file input to prioritize the URL
          }}
        />

        <Button
          onClick={handleGenerateQRCode}
          className="bg-azure-radiance-600 mt-5 hover:bg-azure-radiance-600/90"
        >
          Gerar QR Code
        </Button>
        {qrCodeUrl && (
          <div className="mt-4 flex flex-col items-center">
            <div id="qrcode">
              <QRCode value={qrCodeUrl} />
            </div>
            <Button onClick={handleDownloadQRCode} className="mt-4">
              Download QR Code
            </Button>
          </div>
        )}
      </div>
    </main>
  );
};

export default Home;
