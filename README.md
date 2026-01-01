<h1 align="center">💰 Sistema de vendas</h1>

<h2> 💻 Sobre o projeto</h2>

<p>Este é um sistema (ERP) para gestão de um estabelecimento destinado à comércios em geral, construído com o intuito de facilitar e otimizar os processos de vendas, gerenciamento de produtos e estoques, cadastros de clientes, contas de despesas e entradas, cadastro de fornecedores, etc.</p>

<h2>🚀 Tecnologias utilizadas </h2>
<h4>Frontend </h4>
<ul>
  
    - NextJS 12 / ReactJS,
    - React Hook Form;
    - Zod;
    - Context API;
    - Sass / CSS (Modules);
    - Typescript / Javascript;
    - Axios;
    - Material UI;
</ul>
  
<h4>Backend</h5>
<ul>
  
    - Node;
    - Express;
    - Typescript / Javascript;
    - JWT (Controle de tokens/refresh-tokens);
    - JEST (Testes unitários);
    - MongoDB (Banco de dados NoSQL)
</ul>

<h3>📝 O sistema possui as seguintes funcionalidades:</h3>

 <h4>Dashboard</h4>
 <li>Filtros de data;</li>
 <li>Cards com informações de vendas (Quantidade e valores);</li>
 <li>Cards com informações de contas (Valores de entrada, saída e total). *OBS: Ao clicar em cada card, o usuário é redirecionado para a tela do respectivo card com o filtro da informação aplicado. Exemplo: Caso clique no card de 'Contas de entrada', será redirecionado para a tela de contas, e as contas serão filtradas somente com as que possuem o tipo "Entrada";
 </li>
 <li>Gráfico em barras com os tipos de pagamento utilizados na vendas;</li>
 <li>Gráfico de pizza com a quantidade de vendas de cada produto;</li>

 <h4>Vendas</h4>
 <li>Filtros de data;</li>
 <li>Lista de vendas;</li>
 <li>Cancelamento de venda;</li>
 <li>Cadastro de uma nova venda;</li>
 <li>
  Ao clicar em 'Nova venda', abrirá um modal com um formulário para ser preenchido com as informações da nova venda. *OBS: É necessário cadastrar um produto antes de realizar uma venda;
 </li>

 <h4>Produtos</h4>
 <li>Filtro por nome do produto;</li> 
 <li>Lista de produtos;</li>
 <li>Cadastro de um novo produto.*OBS: Ao deixar a opção 'Produto padrão', este produto será selecionado automaticamente quando o formulário de 'Nova venda' for aberto lá na tela de vendas;
 </li>
 <li>Edição de produto;</li>
 <li>Exclusão de produto;</li>

 <h4>Contas</h4>
 <li>Filtro por tipo de conta (Entrada ou saída);</li>
 <li>Lista de contas;</li>
 <li>Criação de uma nova conta;</li>
 <li>Edição de uma conta;</li>
 <li>Exclusão de uma conta;</li>
 <br>
 
<br>

<h2>👷 Como testar? </h2>
<h3>Entre com o seguinte link: </h3>
<a href="https://vendas-e-estoque.vercel.app/" target="_blank">
  https://vendas-e-estoque.vercel.app/
</a>

<li> Execute o servidor na pasta back-end e depois o front-end
<li> Crie uma nova conta
<li> Teste as funcionalidades de cadastrar e editar produtos, clientes, contas e lançamento de vendas;
<li> Verifique também as informações resumidas no Dashboard se correspondem com os dados cadastrados nas outras páginas.
