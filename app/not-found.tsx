import Link from "next/link";

export default function NotFound() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center text-center">
      <h1 className="text-4xl font-bold text-black">
        404 - Página Não Encontrada
      </h1>
      <p className="mt-4 text-black">
        A página que você está procurando não existe.
      </p>
      <Link href="/" className="mt-6 text-blue-500 hover:underline">
        Voltar para a Home
      </Link>
    </div>
  );
}
