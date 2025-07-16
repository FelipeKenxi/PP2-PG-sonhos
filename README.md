📌 Sonhos 3D
## Descrição do Projeto

Este projeto consiste na criação de um ambiente 3D interativo de uma fazenda com uma ovelha pulando uma cerca, utilizando a biblioteca Three.js. O objetivo principal foi aplicar conceitos de computação gráfica, como modelagem de objetos, iluminação, aplicação de texturas, manipulação de câmeras, animação e implementação de shaders personalizados. O cenário apresenta uma ovelha que se move por um caminho predefinido, uma cerca detalhada e um plano de chão com textura de grama, tudo sob um céu dinâmico gerado por um shader.

Modo de Interação
O usuário pode interagir com o projeto de algumas formas:

Controle de Câmera: A câmera principal (camera1) permite uma visualização mais geral da cena.

Troca de Câmera: Um botão "Mudar camera" na interface HTML permite alternar entre duas perspectivas de câmera distintas (camera1 e camera2), oferecendo diferentes visões do ambiente. A camera2 mostra uma perspectiva mais próxima da cerca que a ovelha pula.

Tecnologias Utilizadas
Three.js: Biblioteca JavaScript para criação e exibição de gráficos 3D no navegador.

JavaScript: Linguagem de programação principal para a lógica do projeto.

HTML: Estrutura da página web.

GLSL (OpenGL Shading Language): Utilizado para a criação do shader de nuvens.

Integrantes e Contribuições
Nome

Responsabilidades

Estratégias/Recursos usados

Dificuldades enfrentadas

Matteo Cileneo Savan

Criação da ovelha e da cerca, incluindo a modularização em funções (criarOvelha.js e criarCerca.js) para facilitar a adição de instâncias na cena principal.

Para a ovelha, utilizou THREE.Group para agrupar as partes (corpo, cabeça, patas, olhos, nariz, orelhas). Geometrias variadas como TorusKnotGeometry (corpo e "chapeuzinho" de lã), IcosahedronGeometry (cabeça e olhos), CylinderGeometry (patas e orelhas) e ExtrudeGeometry com THREE.Shape (nariz) foram empregadas. A cerca foi construída com BoxGeometry para as tábuas e THREE.MeshStandardMaterial para aplicação de textura de madeira.

Modelagem da ovelha: A complexidade de criar uma ovelha com várias partes e detalhes (nariz triangular, orelhas com interior) exigiu um posicionamento e escalonamento precisos de cada geometria. A modularização usando as funções criarOvelha e criarCerca que retornam grupos completos foi importante para fácil integração de objetos inteiros na cena principal.

Beatriz Rogers Tripoli Barbosa

Implementação dos Shaders para as nuvens.

Utilizou THREE.RawShaderMaterial para criar um shader de nuvens procedural. O fragmentShader incorpora uma função de ruído (noiseSmooth) e um círculo suave (drawSmoothCircle) para gerar a aparência das nuvens, com o tempo (uTime) para animar o movimento. Duas malhas de shader foram adicionadas em diferentes posições para cada câmera.

GLSL e Shaders: A curva de aprendizado para desenvolver shaders personalizados em GLSL, manipulando ruído e tempo para criar um efeito visual dinâmico de nuvens, pode ser complexa. Posicionamento dos shaders para que aparecessem corretamente em relação às câmeras.

Felipe Pregnolatto Melo

Desenvolvimento da lógica de movimento dos objetos.

Implementou o movimento da ovelha ao longo de um THREE.CatmullRomCurve3 para definir um caminho curvilíneo. A função animate atualiza continuamente a posição da ovelha ao longo da curva usando getPointAt. Também calculou a direção do movimento para que a ovelha lookAt o próximo ponto no caminho.

Animação de Caminho: Ajustar a velocidade e suavidade do movimento ao longo da curva, bem como garantir que a ovelha se orientasse corretamente na direção do movimento (usando lookAt). O código comentado do "pulo" indica uma tentativa de funcionalidade mais complexa.

Gabriela Aya Tiba

Inserção de texturas no projeto.

Utilizou THREE.TextureLoader para carregar as texturas de grama (grama.jpg) e madeira (madeira.jpg). Aplicou THREE.RepeatWrapping e repeat.set para que a textura da grama cobrisse adequadamente o planoChao. As texturas foram usadas com THREE.MeshStandardMaterial para o chão e a cerca. O fundo da cena (scene.background) foi definido com uma cor sólida.

Mapeamento de Texturas: Garantir que as texturas fossem aplicadas corretamente aos objetos e que o repeat estivesse configurado para evitar distorções ou repetições indesejadas.

----------------------------------------------------------------------------------
Exportar para as Planilhas
Como Executar o Projeto
Para visualizar este projeto em seu ambiente local, siga os passos abaixo:

Pré-requisitos: Certifique-se de ter o Node.js e o npm (ou yarn) instalados em sua máquina.

Clone o Repositório:

Bash

git clone <URL_DO_SEU_REPOSITORIO>
cd <NOME_DO_SEU_REPOSITORIO>
Instale as Dependências (se aplicável):
Este projeto utiliza módulos ES6 e importa diretamente do CDN da Three.js, o que geralmente dispensa a necessidade de npm install para a maioria das dependências principais da Three.js. No entanto, se você tiver outros módulos Node.js no futuro, pode ser necessário:

Bash

npm install
# ou
yarn install
Execute com Live Server (recomendado):
O projeto utiliza importações de módulos JavaScript (type="module") e, para que funcionem corretamente em um navegador local, é necessário servir os arquivos através de um servidor web. A maneira mais simples é usando a extensão Live Server para Visual Studio Code:

Instale a extensão Live Server no VS Code.

No VS Code, abra a pasta do projeto.

Clique com o botão direito no arquivo index.html e selecione "Open with Live Server" (ou clique no ícone "Go Live" na barra inferior).

O navegador abrirá automaticamente o projeto.

Especificações Atendidas
Especificação

Atendida?

Observações

Visualização de pelo menos um objeto 3D por membro do grupo

✅

A ovelha (Matteo), a cerca (Matteo), o plano de chão (Gabriela) e os planos de nuvens com shader (Beatriz) são objetos 3D distintos e foram individualmente redimensionados e posicionados na cena principal.

Utilização de um shader próprio em um dos objetos

✅

Um RawShaderMaterial foi implementado em index.js para criar o efeito de nuvens no céu, com lógica de ruído e animação por tempo. (Responsável: Beatriz)

Definição de pelo menos duas câmeras

✅

Duas câmeras (camera1 e camera2) foram definidas em index.js. Há um botão na interface HTML para alternar entre elas.

Movimento simples de pelo menos um objeto

✅

A ovelha (ovelha em index.js) se move continuamente ao longo de um caminho definido por uma CatmullRomCurve3. A ovelha também se orienta na direção de seu movimento. (Responsável: Felipe)

Aplicação de textura em pelo menos um objeto

✅

A textura de grama foi aplicada ao planoChao e a textura de madeira foi aplicada à cerca (ambas em index.js e carregadas em cria_cerca.js). (Responsável: Gabriela)


Exportar para as Planilhas
Sugestões de Melhoria para o README:

Captura de Tela: Recomendo fortemente substituir o placeholder da "Capa do Projeto" por uma captura de tela real do seu projeto em execução. Isso é crucial para dar uma ideia imediata do que o projeto faz.

Seção de Créditos/Agradecimentos: Se houver alguma inspiração externa para o shader (como mencionado nos comentários do código) ou outras contribuições relevantes, uma seção de agradecimentos pode ser adicionada.

Funcionalidades Futuras (Opcional): Se vocês pensaram em adicionar mais recursos, mas não houve tempo, uma seção "Funcionalidades Futuras" pode mostrar o potencial do projeto. Por exemplo, o pulo da ovelha que está comentado.

Estrutura de Pastas: Para projetos maiores, uma breve descrição da estrutura de pastas (/texturas, /js, etc.) pode ser útil.