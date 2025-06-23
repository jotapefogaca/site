import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Foxy Lady | Encontre as melhores acompanhantes de Sorocaba e Campinas",
  description: "Bem-vindo à Foxy Lady, a principal plataforma de acompanhantes no interior de SP, com excelência, sensualidade e segurança para realizar seus desejos.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-br">
      <body
        className={`antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
