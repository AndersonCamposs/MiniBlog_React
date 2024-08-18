import styles from './Login.module.css';

import { useAuthentication } from '../../hooks/useAuthentication';

import { useState, useEffect } from 'react';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const { login, error: authError, loading } = useAuthentication();

  const handleSubmit = async (e) => {
    e.preventDefault();

    setError('');

    const user = {
      email,
      password,
    };

    const res = await login(user);
    console.log(res);
  };

  useEffect(() => {
    /*Se acontecer algum erro no back end, o state de error do front end será
    alterado para aquele erro vindo do back end, para que seja exibido ao usuáro*/
    if (authError) {
      setError(authError);
    }
  }, [authError]);

  return (
    <div className={styles.login}>
      <h1>Entrar</h1>
      <p>Faça seu login para poder utilizar o sistema</p>
      <form onSubmit={(e) => handleSubmit(e)}>
        <label>
          <span>Email:</span>
          <input
            type="email"
            name="email"
            required
            placeholder="E-mail do usuário"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </label>
        <label>
          <span>Senha</span>
          <input
            type="password"
            name="password"
            required
            placeholder="Insira sua senha"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </label>
        {!loading && <button className="btn">Cadastrar</button>}
        {loading && (
          <button className="btn" disabled>
            Aguarde...
          </button>
        )}
        {error && <p className="error">{error}</p>}
      </form>
    </div>
  );
};

export default Login;
