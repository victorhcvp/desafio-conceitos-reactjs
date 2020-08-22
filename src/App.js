import React, { useState, useEffect } from "react";
import api from './services/api';
import "./styles.css";

function App() {
  const [repositories, setRepositories] = useState([]);

  useEffect(() => {
    api.get('/repositories').then(res => {
        setRepositories(res.data);
        console.log(repositories);
        console.log(res);
    });
  }, []);

  async function handleAddRepository() {
    const response = await api.post('/repositories', {
        title: `Repo ${Date.now()}`,
        url: "github.com",
        techs: ["PHP", "React", "Node"]
    });

    const repo = response.data;

    setRepositories([... repositories, repo]);
  }

  async function handleRemoveRepository(id) {
    const response = await api.delete(`/repositories/${id}`);

    setRepositories(repositories.filter(
      repository => repository.id != id
    ));
  }

  return (
    <div>
      <ul data-testid="repository-list">
        {repositories.map(repo => (
          <li key={repo.id}>
            {repo.title}
            <button onClick={() => handleRemoveRepository(repo.id)}>Remover</button>
          </li>
        ))}
      </ul>

      <button onClick={handleAddRepository}>Adicionar</button>
    </div>
  );
}

export default App;
