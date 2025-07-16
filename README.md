<<<<<<< Updated upstream
# PP2-PG
PP2 para matéria de PG.
=======
# Sonhos 3D
## Descrição do Projeto

Este projeto consiste na criação de um ambiente 3D interativo de uma fazenda ovelhas pulando uma cerca, utilizando a biblioteca Three.js. O objetivo principal foi aplicar conceitos de computação gráfica, como modelagem de objetos, iluminação, aplicação de texturas, manipulação de câmeras, animação e implementação de shaders personalizados. O cenário apresenta duas ovelhas que se movem por um caminho predefinido, uma cerca detalhada e um plano de chão com textura de grama, tudo sob ambiente dinâmico que simula um sonho gerado por um shader e um fundo estrelado.

## Modo de Interação
O usuário pode interagir com o projeto. A câmera principal (camera1) permite uma visualização mais geral da cena. O botão "Mudar camera" na interface HTML permite alternar entre duas perspectivas de câmera distintas (camera1 e camera2), oferecendo diferentes visões do ambiente. A camera2 mostra uma perspectiva mais próxima da cerca que a ovelha pula.

## Tecnologias Utilizadas
Os recursos utilizados foram:
- [Three.js](https://threejs.org/): Biblioteca JavaScript para criação e exibição de gráficos 3D no navegador.
- [JavaScript](https://developer.mozilla.org/pt-BR/docs/Web/JavaScript): Linguagem de programação principal para a lógica do projeto.
- [HTML](https://developer.mozilla.org/pt-BR/docs/Web/HTML): Estrutura da página web.
- [GLSL (OpenGL Shading Language)](https://thebookofshaders.com/): Utilizado para a criação do shader de nuvens.

## Integrantes e Contribuições
| Nome                                | Responsabilidades                                                                                           | Estratégias/Recursos usados                                                                                                                                                                                                                                                                                                                                                                                     | Dificuldades enfrentadas                                                                                                                                                                                                                      |
|-------------------------------------|-------------------------------------------------------------------------------------------------------------|------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
 Beatriz Rogers Tripoli Barbosa     | Implementação dos shaders para as nuvens                                                                  | Uso de `THREE.RawShaderMaterial` com `fragmentShader` contendo `noiseSmooth` e `drawSmoothCircle`. Animação das nuvens via uniform `uTime`. Malhas posicionadas separadamente para cada câmera.                                                                                                                                                                                                            | Curva de aprendizado com GLSL e shaders personalizados. Dificuldades no posicionamento e sincronização visual dos efeitos com as câmeras.                                                                                                       || 
| Felipe Pregnolatto Melo            | Desenvolvimento da lógica de movimento da ovelha e criação inicial das câmeras                                                           | Criação de um caminho com `THREE.CatmullRomCurve3` e moveu a ovelha com `getPointAt`. Direção ajustada com `lookAt` para alinhar o olhar ao percurso. Além disso criou o botão e a versão inicial da função `mudarCamera`.                                                                                                                                                                                                                                                              | Ajustar velocidade e suavidade do movimento e a orientação precisa da ovelha ao longo do caminho. Tentativa de implementar salto comentada no código.                                                                                           |
| Gabriela Aya Tiba                  | Inserção e configuração de texturas                                                                        | Uso de `THREE.TextureLoader` para carregar texturas (`grama.jpg`, `madeira.jpg`). Configurou `THREE.RepeatWrapping` e `repeat.set` para cobrir corretamente o plano do chão. Aplicou texturas com `THREE.MeshStandardMaterial`. Definiu `scene.background` com cor sólida.                                                                                                                                        | Garantir aplicação correta das texturas e configuração de repetição para evitar distorções.     
Matteo Cileneo Savan               | Criação da ovelha e da cerca, incluindo modularização em funções (`criarOvelha.js` e `criarCerca.js`)     | Utilização de `THREE.Group` para agrupar partes da ovelha. Geometrias como `TorusKnotGeometry`, `IcosahedronGeometry`, `CylinderGeometry` e `ExtrudeGeometry` com `THREE.Shape`. A cerca foi feita com `BoxGeometry` e `THREE.MeshStandardMaterial` com textura de madeira.                                                                                                   | Modelagem complexa da ovelha com múltiplas partes exigiu posicionamento e escalonamento cuidadoso. Modularização facilitou a integração com a cena principal.                                                                                  ||                                                                                                                                               |

Reunidos em grupo foram adicionados mais alguns elementos como um ponto de luz um pouco acima da cerca.


## Como Executar o Projeto
Para visualizar este projeto em seu ambiente local, os seguintes pré-requisitos são recomendados:
- uso do Visual Studio Code;
- instalação da extensão Live Server no Visual Studio Code;
- uso de algum navegador de sua preferência.

Para executar o projeto, siga os passos:
1) Clone o Repositório. Você pode fazer isto abrindo o Prompt de Comando de digitando:
    ```bash
    git clone https://github.com/FelipeKenxi/PP2-PG-sonhos.git
2) Abra o projeto no Visual Studio Code;
3) Clique com o botão direito no arquivo index.html e selecione "Open with Live Server" (ou clique no ícone "Go Live" na barra inferior). O navegador abrirá automaticamente o projeto.

## Possíveis complicações
A maior complicação que pode acontecer ao tentar rodar o código na sua máquina é a posição dos shaders em relação às câmeras, como os shaders são dois `PlaneGeometry` que foram posicionados manualmente em frente às câmeras, é possível que, dependendo da tela de resolução do seu computador, ele fique desalinhado.
Se este for o caso é possível ajustando o valor da escala da geometria do shader, na linha 108 do arquivo [index.js](https://github.com/FelipeKenxi/PP2-PG-sonhos/blob/main/index.js).
Os valores para algumas reoluções conhecidas:

 - 2560 x 1600 -> ( w/100, h/100);
 - 1366 x 768 -> ( w/70, h/70);
 - 1920 x 1080 -> ( w/70, h/70);

## Especificações Atendidas
| Especificação                                         | Atendida? | Observações                                                                                                                                                                                                                       |
|-------------------------------------------------------|-----------|------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| Visualização de pelo menos um objeto 3D por membro do grupo | SIM        | A ovelha (Matteo), a cerca (Matteo), o plano de chão (Gabriela) e os planos de nuvens com shader (Beatriz) são objetos 3D distintos e foram individualmente redimensionados e posicionados na cena principal.                      |
| Utilização de um shader próprio em um dos objetos     | SIM       | Um `RawShaderMaterial` foi implementado em `index.js` para criar o efeito de nuvens no céu, com lógica de ruído e animação por tempo. (Responsável: Beatriz)                                                                      |
| Definição de pelo menos duas câmeras                  | SIM       | Duas câmeras (`camera1` e `camera2`) foram definidas em `index.js`. Há um botão na interface HTML para alternar entre elas.                                                                                                       |
| Movimento simples de pelo menos um objeto             | SIM       | A ovelha se move continuamente ao longo de um caminho definido por uma `CatmullRomCurve3` e se orienta na direção do movimento. (Responsável: Felipe)                                                                             |
| Aplicação de textura em pelo menos um objeto          | SIM       | A textura de grama foi aplicada ao `planoChao` e a textura de madeira à cerca (ambas em `index.js` e carregadas em `cria_cerca.js`). (Responsável: Gabriela)          
>>>>>>> Stashed changes

## Créditos do shader
O shader criado foi uma adaptação/modificação do código apresentado no vídeo ["Making Clouds in a Shader"](https://youtu.be/hwa6XRXd1xQ?si=nOUUFalA0cVI7pFM) do canal Darko Supe, além de conceitos introduzidos no vídeo ["Three.js Shaders (GLSL) Crash Course For Absolute Beginners"](https://youtu.be/oKbCaj1J6EI?si=noQjfjEsayKIi085) do canal Visionary 3D.                                                             

## Bibliografia
Os seguintes materiais foram consultados para o desenvolvimento do projeto:
* ["Getting Started with Three.js: A Beginner's Tutorial"](https://youtu.be/XPhAR1YdD6o?si=slnQ4ROx1Us_xNWY)
* ["Create a 3D Web App in 5 MINUTES! // Three.js Tutorial for Beginners"](https://www.youtube.com/watch?app=desktop&v=QCS1DOu2IzU&ab_channel=DanGreenheck)
* ["How To Make An Object Rotate Around Another Object In Three.js - Create A Solar System"](https://www.youtube.com/watch?v=XXzqSAt3UIw&ab_channel=WaelYasmina)
* ["Build a Mindblowing 3D Portfolio Website // Three.js Beginner’s Tutorial"](https://www.youtube.com/watch?v=Q7AOvWpIVHU&ab_channel=Fireship)
* ["How To Make An Object Follow A Path In Three.js"](https://www.youtube.com/watch?v=nwiaqLGAyjo&ab_channel=WaelYasmina)
* ["Texture"](https://threejs.org/docs/#api/en/textures/Texture)
* ["Three.js Texture Mapping Tutorial | How to Add Textures to 3D Geometry"](https://www.youtube.com/watch?v=vLz2Rk1r_gQ&ab_channel=SuboptimalEngineer)
* ["Documentação Three.js"](https://www.youtube.com/watch?v=vLz2Rk1r_gQ&ab_channel=SuboptimalEngineer)
* ["Primitives"](https://threejs.org/manual/#en/primitives)


Para rodar, use o visual studio code com a extensão live server (https://marketplace.visualstudio.com/items?itemName=ritwickdey.LiveServer.
