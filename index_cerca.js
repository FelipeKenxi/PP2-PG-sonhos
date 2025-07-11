import * as THREE from "three"; //para importar a biblioteca three do javascript
import { OrbitControls } from "jsm/controls/OrbitControls.js";
//////////////////////////////////////////////////////
// criando um renderizador:
const largura = window.innerWidth;
const altura = window.innerHeight;
const renderizador = new THREE.WebGLRenderer({antialias: true});
renderizador.setSize(largura, altura);
document.body.appendChild(renderizador.domElement);

//////////////////////////////////////////////////////
// criando uma câmera:
const campo_de_visao = 75; //75 graus
const aspecto = largura/altura;
const proximidade = 0.1; //vai renderizar qualquer coisa distante da camera em mais de 0.1. Menos que isso o objeto fica invisível
const distante = 10; //não vai renderizar coisas distante da camera em mais de 10 unidades
const camera = new THREE.PerspectiveCamera(campo_de_visao, aspecto, proximidade, distante);
camera.position.z = 2; //para dar uma afastada e conseguir ver, algo assim

//////////////////////////////////////////////////////
// criando a cena:
const cena = new THREE.Scene();
cena.background = new THREE.Color(0xeeeeee); // cinza claro, por exemplo

//////////////////////////////////////////////////////
// luz:
const hemiLight = new THREE.HemisphereLight(0xffffff, 0x000000); //em cima branco e em baixo preto
cena.add(hemiLight); //adicionando à cena

//////////////////////////////////////////////////////
//eixos para auxiliar:
const tamanho = 2; // tamanho das linhas dos eixos
const eixos = new THREE.AxesHelper(tamanho);
cena.add(eixos);

//////////////////////////////////////////////////////
//tabuas verticais:
const width =  0.2;  
const height = 1.2;  
const depth =  0.1;  

const forma_geometrica_tabuas_verticais = new THREE.BoxGeometry( width, height, depth );
const material_tabua = new THREE.MeshStandardMaterial({
    color: 0Xff4600,
    flatShading: true
});

const tabua_vertical = new THREE.Mesh(forma_geometrica_tabuas_verticais, material_tabua);
cena.add(tabua_vertical);
const tabua_vertical2 = tabua_vertical.clone();
tabua_vertical2.position.x = 1;
cena.add(tabua_vertical2);
const tabua_vertical3 = tabua_vertical.clone();
tabua_vertical3.position.x = -1;
cena.add(tabua_vertical3);


//////////////////////////////////////////////////////
//tabuas horizontais:
const larg =  0.2;  
const alt = 3;  
const espessura =  0.1;  

const forma_geometrica_tabuas_horizontais = new THREE.BoxGeometry( larg, alt, espessura );
const tabua_horizontal = new THREE.Mesh(forma_geometrica_tabuas_horizontais, material_tabua);

// tábua horizontal superior
tabua_horizontal.position.set(0, 0.30, 0.1); // centralizada entre as verticais
tabua_horizontal.rotation.z = Math.PI / 2;

const tabua_horizontal2 = tabua_horizontal.clone();

// tábua horizontal inferior
tabua_horizontal2.position.set(0, -0.30, 0.1);
tabua_horizontal2.rotation.z = Math.PI / 2;


cena.add(tabua_horizontal);
cena.add(tabua_horizontal2);




//////////////////////////////////////////////////////
//para dar controle:
const controle = new OrbitControls (camera, renderizador.domElement);
controle.enableDamping = true;
controle.dampingFactor = 0.03;

//////////////////////////////////////////////////////
// função que anima e renderiza:
animate();

function animate(t=0){
    requestAnimationFrame(animate);
    controle.update(); //para que o controle funcione
    renderizador.render(cena, camera);
}
 