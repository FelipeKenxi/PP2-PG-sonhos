import * as THREE from 'three';

export function criarCerca() {
    const cerca = new THREE.Group();


    //////////////////////////////////////////////////////
    // carregar textura de madeira:
    const loader = new THREE.TextureLoader();
    const texturaMadeira = loader.load('texturas/madeira.jpg');
    texturaMadeira.wrapS = THREE.RepeatWrapping;
    texturaMadeira.wrapT = THREE.RepeatWrapping;
    texturaMadeira.repeat.set(1, 1);

    const material_tabua = new THREE.MeshStandardMaterial({
        map: texturaMadeira,
        flatShading: true
    });

    //////////////////////////////////////////////////////
    // tábuas verticais:
    const width = 0.2;
    const height = 1.2;
    const depth = 0.1;

    const forma_geometrica_tabuas_verticais = new THREE.BoxGeometry(width, height, depth);
    const tabua_vertical = new THREE.Mesh(forma_geometrica_tabuas_verticais, material_tabua);
    cerca.add(tabua_vertical);

    const tabua_vertical2 = tabua_vertical.clone();
    tabua_vertical2.position.x = 1;
    cerca.add(tabua_vertical2);

    const tabua_vertical3 = tabua_vertical.clone();
    tabua_vertical3.position.x = -1;
    cerca.add(tabua_vertical3);

    //////////////////////////////////////////////////////
    // tábuas horizontais:
    const larg = 0.2;
    const alt = 3;
    const espessura = 0.1;

    const forma_geometrica_tabuas_horizontais = new THREE.BoxGeometry(larg, alt, espessura);
    const tabua_horizontal = new THREE.Mesh(forma_geometrica_tabuas_horizontais, material_tabua);

    // tábua horizontal superior
    tabua_horizontal.position.set(0, 0.30, 0.1);
    tabua_horizontal.rotation.z = Math.PI / 2;

    const tabua_horizontal2 = tabua_horizontal.clone();

    // tábua horizontal inferior
    tabua_horizontal2.position.set(0, -0.30, 0.1);
    tabua_horizontal2.rotation.z = Math.PI / 2;

    cerca.add(tabua_horizontal);
    cerca.add(tabua_horizontal2);

    return cerca;
}