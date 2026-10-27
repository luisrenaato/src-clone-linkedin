import Cartao from "../components/ui/Cartao.jsx";
import Icon from "../components/ui/Icon.jsx";
import PostCard from "../components/feed/PostCard.jsx";
import { useDados } from "../context/useDados.js";

export default function PostPage({ id }) {
  const { posts } = useDados();
  const post = posts.find((p) => p.id === id);
  return (
    <main className="coluna-unica">
      <a className="voltar" href="#/inicio"><Icon nome="arrowLeft" tamanho={18} /> Voltar ao feed</a>
      {post ? <PostCard post={post} /> : <Cartao className="vazio">Publicação não encontrada.</Cartao>}
    </main>
  );
}
