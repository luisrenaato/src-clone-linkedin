import PostCard from "./PostCard.jsx";
import Cartao from "../ui/Cartao.jsx";
import { useDados } from "../../context/useDados.js";

export default function Feed() {
  const { posts } = useDados();
  if (posts.length === 0) {
    return <Cartao className="vazio">Seu feed está vazio. Que tal criar a primeira publicação?</Cartao>;
  }
  return (
    <div className="feed">
      {posts.map((post) => (
        <PostCard key={post.id} post={post} />
      ))}
    </div>
  );
}
