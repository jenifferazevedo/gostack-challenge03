import React, { useState, useEffect } from "react";
import api from './services/api';

import "./styles.css";

function App() {
  const [repositories, setRepositories] = useState([]);

  useEffect(() => {
    api.get('repositories').then(response => {
      setRepositories( response.data);
    });
  }, []);

  async function handleAddRepository() {
    const response = await api.post('repositories', {
      title: `Projeto Teste ${Date.now()}`,
      url: "https://github.com/josepholiveira",
      techs: ["React", "Node.js"]
    });
    const repository = response.data;

    setRepositories([...repositories, repository]);
  }

  async function handleRemoveRepository(id) {
    await api.delete(`repositories/${id}`);
    setRepositories(repositories.filter(repository => repository.id !== id))
  }

  return (
    <div>
      <h1>Front-end challenge!</h1>
      <ul data-testid="repository-list">
      {repositories.map(repository => <li key={repository.id}>
        <div>
        <p>{repository.title}</p>
        <a href={repository.url} target="_blank" rel="noopener noreferrer">{repository.url}</a>
        <p className="techs">{repository.techs.map(tech => (
          <p key={tech}>{tech}</p>
      ))}</p>
        </div>
        <button onClick={() => handleRemoveRepository(repository.id)}>
            Remover
        </button>
      </li>)}
      </ul>
      <button onClick={handleAddRepository}>Adicionar</button>
      <footer>Codigo feito para o desafio 03 do GoStack!
        Veja mais na <a href="https://github.com/jenifferazevedo/gostack-challenge03">documentação</a>!
      </footer>
    </div>
  );
}

export default App;
