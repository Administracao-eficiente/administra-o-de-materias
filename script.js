const form = document.getElementById('materialForm');
const tabela = document.querySelector('#tabela tbody');
const buscar = document.getElementById('buscar');
const limparTudo = document.getElementById('limparTudo');
const exportar = document.getElementById('exportar');

let materiais = JSON.parse(localStorage.getItem('materiais')) || [];

function atualizarTabela(filtro = '') {
  tabela.innerHTML = '';

  const filtrados = materiais.filter(m =>
    m.nome.toLowerCase().includes(filtro.toLowerCase()) ||
    m.categoria.toLowerCase().includes(filtro.toLowerCase())
  );

  if (filtrados.length === 0) {
    const row = document.createElement('tr');
    row.innerHTML = `<td colspan="6" style="text-align:center; color:#777;">Nenhum material cadastrado.</td>`;
    tabela.appendChild(row);
    return;
  }

  filtrados.forEach((mat, index) => {
    const row = document.createElement('tr');
    row.innerHTML = `
      <td>${mat.nome}</td>
      <td>${mat.categoria}</td>
      <td>${mat.quantidade}</td>
      <td>${mat.local}</td>
      <td>${mat.fornecedor}</td>
      <td>
        <button class="btn-danger" onclick="removerMaterial(${index})">🗑️</button>
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
  if (confirm('Deseja remover este material?')) {
    materiais.splice(index, 1);
    localStorage.setItem('materiais', JSON.stringify(materiais));
    atualizarTabela(buscar.value);
  }
}

buscar.addEventListener('input', (e) => {
  atualizarTabela(e.target.value);
});

limparTudo.addEventListener('click', () => {
  if (confirm('Tem certeza que deseja apagar todos os materiais?')) {
    materiais = [];
    localStorage.removeItem('materiais');
    atualizarTabela();
  }
});

exportar.addEventListener('click', () => {
  if (materiais.length === 0) {
    alert('Não há materiais para exportar.');
    return;
  }

  const linhas = materiais.map(m => [m.nome, m.categoria, m.quantidade, m.local, m.fornecedor]);
  const csv = ["Nome,Categoria,Quantidade,Local,Fornecedor", ...linhas.map(l => l.join(','))].join('\n');
  const blob = new Blob([csv], { type: 'text/csv' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = 'materiais.csv';
  a.click();
});

atualizarTabela();

