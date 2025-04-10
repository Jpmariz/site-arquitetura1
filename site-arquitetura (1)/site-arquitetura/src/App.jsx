
import { useState } from "react";
import { Card, CardContent } from "./components/ui/card";
import { Button } from "./components/ui/button";
import { ShoppingCart, Building2, LogIn } from "lucide-react";

const projetos = [
  {
    id: 1,
    nome: "Casa Moderna",
    preco: "R$ 1.500,00",
    imagem: "https://source.unsplash.com/featured/?modern-house",
    descricao: "Projeto completo de uma casa moderna com 3 quartos e piscina."
  },
  {
    id: 2,
    nome: "Apartamento Compacto",
    preco: "R$ 900,00",
    imagem: "https://source.unsplash.com/featured/?apartment",
    descricao: "Planta funcional de um apartamento de 50m²."
  }
];

export default function SiteArquitetura() {
  const [carrinho, setCarrinho] = useState([]);
  const [usuario, setUsuario] = useState(null);
  const [mostrarCheckout, setMostrarCheckout] = useState(false);

  const adicionarAoCarrinho = (projeto) => {
    setCarrinho([...carrinho, projeto]);
  };

  const loginSimples = () => {
    setUsuario({ nome: "João Cliente" });
  };

  const finalizarCompra = () => {
    alert("Compra realizada com sucesso!");
    setCarrinho([]);
    setMostrarCheckout(false);
  };

  return (
    <div className="p-4 max-w-7xl mx-auto">
      <header className="flex items-center justify-between py-4 border-b">
        <h1 className="text-3xl font-bold flex items-center gap-2">
          <Building2 className="w-6 h-6" /> Studio Arquitetura
        </h1>
        <div className="flex items-center gap-4">
          {usuario ? (
            <span className="text-sm">Bem-vindo, {usuario.nome}</span>
          ) : (
            <Button variant="outline" onClick={loginSimples} className="flex gap-2">
              <LogIn className="w-4 h-4" /> Entrar
            </Button>
          )}
          <Button
            variant="outline"
            className="flex gap-2"
            onClick={() => setMostrarCheckout(true)}
          >
            <ShoppingCart className="w-4 h-4" /> Carrinho ({carrinho.length})
          </Button>
        </div>
      </header>

      <main className="my-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {projetos.map((proj) => (
          <Card key={proj.id} className="hover:shadow-xl transition-shadow">
            <img src={proj.imagem} alt={proj.nome} className="rounded-t-2xl h-48 w-full object-cover" />
            <CardContent className="p-4 space-y-2">
              <h2 className="text-xl font-semibold">{proj.nome}</h2>
              <p className="text-sm text-gray-600">{proj.descricao}</p>
              <p className="font-bold text-lg">{proj.preco}</p>
              <Button onClick={() => adicionarAoCarrinho(proj)}>Adicionar ao Carrinho</Button>
            </CardContent>
          </Card>
        ))}
      </main>

      {mostrarCheckout && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white rounded-2xl p-6 w-full max-w-md shadow-xl">
            <h2 className="text-2xl font-bold mb-4">Checkout</h2>
            {carrinho.length === 0 ? (
              <p>Seu carrinho está vazio.</p>
            ) : (
              <div className="space-y-2">
                {carrinho.map((item, idx) => (
                  <div key={idx} className="flex justify-between">
                    <span>{item.nome}</span>
                    <span>{item.preco}</span>
                  </div>
                ))}
                <Button className="mt-4 w-full" onClick={finalizarCompra}>
                  Finalizar Compra
                </Button>
              </div>
            )}
            <Button variant="ghost" className="mt-2 w-full" onClick={() => setMostrarCheckout(false)}>
              Cancelar
            </Button>
          </div>
        </div>
      )}

      <footer className="text-center text-sm text-gray-500 border-t py-4">
        © 2025 Studio Arquitetura. Todos os direitos reservados.
      </footer>
    </div>
  );
}
