const form = document.getElementById('materialForm');
const tabela = document.querySelector('#tabela tbody');

let materiais = JSON.parse(localStorage.getItem('materiais')) || [];

function atualizarTabela() {
  tabela.innerHTML = '';
  materiais.forEach((mat, index) => {
    const row = document.createElement('tr');
    row.innerHTML = `
      <td>${mat.nome}</td>
      <td>${mat.categoria}</td>
      <td>${mat.quantidade}</td>
      <td>${mat.local}</td>
      <td>${mat.fornecedor}</td>
      <td>
        <button onclick="removerMaterial(${index})">🗑️</button>
      </td>
    `;
    tabela.appendChild(row);
  });
}

form.addEventListener('submit', (e) => {
  e.preventDefault();
  const novo = {
    nome: document.getElementById('nome').value,
    categoria: document.getElementById('categoria').value,
    quantidade: document.getElementById('quantidade').value,
    local: document.getElementById('local').value,
    fornecedor: document.getElementById('fornecedor').value
  };
  materiais.push(novo);
  localStorage.setItem('materiais', JSON.stringify(materiais));
  form.reset();
  atualizarTabela();
});

function removerMaterial(index) {
  materiais.splice(index, 1);
  localStorage.setItem('materiais', JSON.stringify(materiais));
  atualizarTabela();
}

atualizarTabela();
