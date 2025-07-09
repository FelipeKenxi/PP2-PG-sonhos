import * as THREE from "three"; //para importar a biblioteca three do javascript
import { OrbitControls } from "jsm/controls/OrbitControls.js";


// criando um renderizador:
const largura = window.innerWidth;
const altura = window.innerHeight;
const renderizador = new THREE.WebGLRenderer({antialias: true});
renderizador.setSize(largura, altura);
document.body.appendChild(renderizador.domElement);

// criando uma câmera:
const campo_de_visao = 75; //75 graus
const aspecto = largura/altura;
const proximidade = 0.1; //vai renderizar qualquer coisa distante da camera em mais de 0.1. Menos que isso o objeto fica invisível
const distante = 10; //não vai renderizar coisas distante da camera em mais de 10 unidades
const camera = new THREE.PerspectiveCamera(campo_de_visao, aspecto, proximidade, distante);
camera.position.z = 2; //para dar uma afastada e conseguir ver, algo assim

// criando a cena:
const cena = new THREE.Scene();

const tamanho = 2; // tamanho das linhas dos eixos
const eixos = new THREE.AxesHelper(tamanho);
cena.add(eixos);


//////////////////////////////////////////////////////
// para o corpo:
// primitiva geométrica para o corpo:
const raio_corpo = 1; 
const detalhe_corpo = 4; //quanto maior mais faces
const material = new THREE.MeshStandardMaterial({
    color: 0xffffff,
    flatShading: true
});


// primitiva geométrica: Tetraedro com mais detalhes
const forma_geometrica_corpo = new THREE.TetrahedronGeometry(raio_corpo, detalhe_corpo); 

// mesh combinando forma e material
const corpo = new THREE.Mesh(forma_geometrica_corpo, material);
corpo.position.set(0, 0, 0);

// achatando nos eixos X e Y (deixa o tetraedro mais ovalado horizontalmente)
corpo.scale.set(0.8, 0.7, 0.85); // X = 0.6, Y = 0.6, Z = 1

// adicionar à cena
cena.add(corpo);


//////////////////////////////////////////////////////
// para a cabeça:
const forma_geometrica_cabeca = new THREE.IcosahedronGeometry(0.3, 18);
const material_cabeca = new THREE.MeshStandardMaterial({
    color: 0xd1bed1,
    flatShading: true
});

const cabeca = new THREE.Mesh (forma_geometrica_cabeca, material_cabeca);
cabeca.position.set(0, 0, 0.9);
cabeca.scale.set(0.6, 0.6, 0.6);

cena.add(cabeca);

//////////////////////////////////////////////////////
// "chapeuzinho" de lã:

//////////////////////////////////////////////////////
// "rabinho" de lã:


//////////////////////////////////////////////////////
// para dar uma luz:
const hemiLight = new THREE.HemisphereLight(0xffffff, 0x000000); //em cima branco e em baixo preto
cena.add(hemiLight); //adicionando à cena

//////////////////////////////////////////////////////
// para auxiliar as patas:
const coord_x_pata = 0.4;
const coord_y_pata = 0.5;
const coord_z_pata = 0.3;

// para a pata1:
const forma_geometrica_pata = new THREE.CylinderGeometry(0.1, 0.1, 0.35, 16);
const material_pata = new THREE.MeshStandardMaterial({
    color: 0xd1bed1,
    flatShading: true
});
const pata1 = new THREE.Mesh(forma_geometrica_pata, material_pata);
pata1.position.y = -coord_y_pata;
pata1.position.z = -coord_z_pata;
pata1.position.x = coord_x_pata;
cena.add(pata1);

// para a pata2:
const pata2 = new THREE.Mesh(forma_geometrica_pata, material_pata);
pata2.position.y = -coord_y_pata;
pata2.position.z = -coord_z_pata;
pata2.position.x = -coord_x_pata;
cena.add(pata2);

// para a pata3:
const pata3 = new THREE.Mesh(forma_geometrica_pata, material_pata);
pata3.position.y = -coord_y_pata;
pata3.position.z = coord_z_pata;
pata3.position.x = coord_x_pata;
cena.add(pata3);

// para a pata4:
const pata4 = new THREE.Mesh(forma_geometrica_pata, material_pata);
pata4.position.y = -coord_y_pata;
pata4.position.z = coord_z_pata;
pata4.position.x = -coord_x_pata;
cena.add(pata4);


//////////////////////////////////////////////////////
//para dar controle:
const controle = new OrbitControls (camera, renderizador.domElement);
controle.enableDamping = true;
controle.dampingFactor = 0.03;

// função que anima e renderiza:
animate();

function animate(t=0){
    requestAnimationFrame(animate);
    controle.update(); //para que o controle funcione
    renderizador.render(cena, camera);
}
 