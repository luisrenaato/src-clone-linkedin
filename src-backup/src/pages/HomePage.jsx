import Composer from "../components/feed/Composer.jsx";
import Feed from "../components/feed/Feed.jsx";
import ProfileCard from "../components/sidebar/ProfileCard.jsx";
import HashtagsCard from "../components/sidebar/HashtagsCard.jsx";
import NewsCard from "../components/sidebar/NewsCard.jsx";
import SugestoesCard from "../components/sidebar/SugestoesCard.jsx";
import RodapeLinks from "../components/sidebar/RodapeLinks.jsx";

export default function HomePage() {
  return (
    <div className="layout">
      <aside className="layout__esq" aria-label="Seu perfil">
        <ProfileCard />
        <HashtagsCard />
      </aside>
      <main className="layout__centro">
        <Composer />
        <Feed />
      </main>
      <aside className="layout__dir" aria-label="Notícias e sugestões">
        <NewsCard />
        <SugestoesCard />
        <RodapeLinks />
      </aside>
    </div>
  );
}
