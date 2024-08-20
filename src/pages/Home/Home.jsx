// CSS
import styles from './Home.module.css';
// hooks
import { useNavigate, Link } from 'react-router-dom';
import { useState } from 'react';
//pages
import { useFetchDocuments } from '../../hooks/useFetchDocuments';
// components
import PostDetail from '../../components/PostDetail';

const Home = () => {
  const [query, setQuery] = useState();
  const { documents: posts, loading, error } = useFetchDocuments('posts');

  const handleSubmit = (e) => {
    e.preventDefault();
  };

  return (
    <div className={styles.home}>
      <h1>Veja os nossos posts mais recentes</h1>
      <form className={styles.search_form} onSubmit={(e) => handleSubmit(e)}>
        <input type="text" placeholder="Ou busque por tags..." onChange={(e) => setQuery(e.target.value)} />
        <button className="btn btn-dark">Pesquisar</button>
      </form>
      <div>
        {loading && <p>Carregando...</p>}
        {posts && posts.map((post) => <PostDetail post={post} key={post.id} />)}
        {posts && posts.length === 0 && (
          <div>
            <div className={styles.no_posts}>
              <p>Não foram encontrados posts</p>
              <Link to="/posts/create" className="btn">
                Criar novo post
              </Link>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Home;
