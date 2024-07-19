import { z } from "zod";

export const UrlSchema = z.object({
  url: z.string()
    .nonempty("O campo URL é obrigatório.")
    .url("URL inválida. Por favor, insira uma URL válida."),
});

export type UrlSchemaProps = z.infer<typeof UrlSchema>;
