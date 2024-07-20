import html2canvas from "html2canvas";

export function handleDownloadQRCodePNG(): void {
  const qrCodeElement = document.getElementById("qrcode");
  if (qrCodeElement) {
    html2canvas(qrCodeElement, { scale: 3 }).then((canvas) => {
      const link = document.createElement("a");
      link.href = canvas.toDataURL("image/png");
      link.download = "qrcode.png";
      link.click();
    });
  }
}

export function handleDownloadQRCodeSVG(): void {
  const qrCodeElement = document.getElementById("qrcode");
  if (qrCodeElement) {
    const svgElement = qrCodeElement.querySelector("svg");
    if (svgElement) {
      const serializer = new XMLSerializer();
      const svgString = serializer.serializeToString(svgElement);
      const blob = new Blob([svgString], { type: "image/svg+xml" });
      const url = URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.download = "qrcode.svg";
      link.click();
      URL.revokeObjectURL(url);
    }
  }
}
