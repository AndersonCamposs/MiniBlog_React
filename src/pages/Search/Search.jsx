// CSS
import styles from './Search.module.css';

import { Link } from 'react-router-dom';

//hooks
import { useFetchDocuments } from '../../hooks/useFetchDocuments';
import { useQuery } from '../../hooks/useQuery';
//components
import PostDetail from '../../components/PostDetail';

const Search = () => {
  const query = useQuery();
  const search = query.get('q');

  const { documents: posts } = useFetchDocuments('posts', search);

  return (
    <div className={styles.search_container}>
      <h2>Pesquisa</h2>
      {posts && posts.length === 0 && (
        <div className={styles.no_posts}>
          <p>Não foram encontrados posts relacionados a sua busca...</p>
          <Link to="/" className="btn btn-dark">
            Voltar
          </Link>
        </div>
      )}
      {posts && posts.map((post) => <PostDetail post={post} key={post.id} />)}
    </div>
  );
};

export default Search;
