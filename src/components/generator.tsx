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

const Generator: React.FC = () => {
  const {
    handleSubmit,
    register,
    formState: { errors },
    watch,
    reset,
    setValue,
  } = useForm<UrlSchemaProps>({
    criteriaMode: "all",
    mode: "all",
    resolver: zodResolver(UrlSchema),
    defaultValues: {
      url: "",
    },
  });
  const qrCodeUrl = watch("url");

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
    setValue("url", data.url);
  };

  return (
    <Wrapper>
      <div className="bg-white max-w-3xl p-6 gap-6 rounded-lg mt-8 shadow-md items-center mx-auto flex-col md:flex-row flex">
        <div className="flex flex-col">
          <ValidateInput
            placeholder="Digite uma URL"
            {...register("url")}
            errorMessage={errors.url?.message}
          />

          <Button
            variant="default"
            onClick={handleSubmit(handleGenerateQRCode)}
          >
            Gerar QR Code
          </Button>
        </div>
        {qrCodeUrl && (
          <div className="mt-4 flex flex-col items-center">
            <div id="qrcode">
              <QRCode value={qrCodeUrl} />
            </div>
            <Button
              onClick={handleDownloadQRCode}
              variant="default"
              className="mt-4"
            >
              Download QR Code
            </Button>
          </div>
        )}
      </div>
    </Wrapper>
  );
};

export default memo(Generator);
