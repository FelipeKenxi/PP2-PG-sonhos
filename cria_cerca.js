import * as THREE from 'three';

export function criarCerca() {
    const cerca = new THREE.Group();

    //////////////////////////////////////////////////////
    //eixos para auxiliar:
    const tamanho = 2; // tamanho das linhas dos eixos
    const eixos = new THREE.AxesHelper(tamanho);
    cerca.add(eixos);

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
    cerca.add(tabua_vertical);
    const tabua_vertical2 = tabua_vertical.clone();
    tabua_vertical2.position.x = 1;
    cerca.add(tabua_vertical2);
    const tabua_vertical3 = tabua_vertical.clone();
    tabua_vertical3.position.x = -1;
    cerca.add(tabua_vertical3);


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


    cerca.add(tabua_horizontal);
    cerca.add(tabua_horizontal2);

    return cerca;
}