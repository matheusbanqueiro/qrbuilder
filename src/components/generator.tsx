"use client";
import { memo, useState } from "react";
import { ValidateInput } from "./validate-input";
import { Button } from "./ui/button";
import QRCode from "qrcode.react";
import html2canvas from "html2canvas";
import { UrlSchema, UrlSchemaProps } from "@/validations/url-validate";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import Wrapper from "./wrapper";
import { DownloadIcon } from "@radix-ui/react-icons";
import { handleDownloadQRCodePNG, handleDownloadQRCodeSVG } from "@/lib/helper";

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

  const handleGenerateQRCode = async (data: UrlSchemaProps) => {
    setQrCodeUrl(data.url);
  };

  return (
    <Wrapper>
      <div className="bg-white border border-secondary max-w-3xl p-6 gap-6 rounded-lg mt-8 shadow-lg dark:shadow-secondary md:items-start items-center mx-auto flex-col md:flex-row flex">
        <div className="flex flex-col gap-4">
          <ValidateInput
            placeholder="Digite uma URL"
            {...register("url")}
            errorMessage={errors.url?.message}
          />

          <Button
            variant="default"
            onClick={handleSubmit(handleGenerateQRCode)}
            className=""
          >
            Gerar QR Code
          </Button>
        </div>
        {qrCodeUrl && (
          <div className="md:mt-0 mt-4 flex flex-col items-center">
            <div id="qrcode" className="p-3 border border-primary rounded-lg">
              <QRCode value={qrCodeUrl} size={256} renderAs="svg" />
            </div>
            <h2 className="text-neutral-400 text-sm py-3">Download:</h2>
            <div className="gap-4 flex justify-between">
              <Button
                onClick={handleDownloadQRCodePNG}
                variant="primary"
                className="gap-3"
              >
                <DownloadIcon className="w-5 h-5" />
                png
              </Button>
              <Button
                onClick={handleDownloadQRCodeSVG}
                variant="primary"
                className="gap-3"
              >
                <DownloadIcon className="w-5 h-5" />
                svg
              </Button>
            </div>
          </div>
        )}
      </div>
    </Wrapper>
  );
};

export default memo(Generator);
