"use client";
import { ChangeEvent, memo, useState } from "react";
import { ValidateInput } from "./validate-input";
import { Button } from "./ui/button";
import QRCode from "qrcode.react";
import html2canvas from "html2canvas";
import { UrlSchema, UrlSchemaProps } from "@/validations/url-validate";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import Wrapper from "./wrapper";
import { DownloadIcon } from "@radix-ui/react-icons";


const Generator: React.FC = () => {
  const [qrCodeUrl, setQrCodeUrl] = useState<string>("");

  const {
    handleSubmit,
    register,
    formState: { errors },
    reset,
    setValue,
    watch,
  } = useForm<UrlSchemaProps>({
    criteriaMode: "all",
    mode: "all",
    resolver: zodResolver(UrlSchema),
    defaultValues: {
      url: "",
    },
  });

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

  const handleGenerateQRCode = async (data: UrlSchemaProps) => {
    setQrCodeUrl(data.url);
  };

  return (
    <Wrapper>
      <div className="bg-white max-w-3xl p-6 gap-6 rounded-lg mt-8 shadow-lg dark:shadow-secondary  items-center mx-auto flex-col md:flex-row flex">
        <div className="flex flex-col gap-4">
          <ValidateInput
            placeholder="Digite uma URL"
            {...register("url")}
            errorMessage={errors.url?.message}
          />

          <Button
            variant="default"
            onClick={handleSubmit(handleGenerateQRCode)}
            className="dark:text-white"
          >
            Gerar QR Code
          </Button>
        </div>
        {qrCodeUrl && (
          <div className="mt-4 flex flex-col items-center">
            <div id="qrcode" className="p-3 border border-primary rounded-lg">
              <QRCode value={qrCodeUrl} />
            </div>
            <Button
              onClick={handleDownloadQRCode}
              variant="default"
              className="mt-4 gap-3 dark:text-white"
            >
              <DownloadIcon className="w-5 h-5"/>
              Download
            </Button>
          </div>
        )}
      </div>
    </Wrapper>
  );
};

export default memo(Generator);
