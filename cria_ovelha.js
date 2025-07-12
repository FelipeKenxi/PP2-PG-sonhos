import * as THREE from 'three';

export function criarOvelha() {
  const ovelha = new THREE.Group();

    //////////////////////////////////////////////////////
    // para o corpo:
    // primitiva geométrica para o corpo:
    const material_corpo = new THREE.MeshStandardMaterial({
        color: 0xffffff,
        flatShading: true,
    });

    const raio_corpo =  0.05;  
    const tubeRadius =  0.75;  
    const radialSegments =  3;  
    const tubularSegments =  57;  
    const p = 10;  
    const q = 14; 

    // primitiva geométrica: Tetraedro com mais detalhes
    const forma_geometrica_corpo = new THREE.TorusKnotGeometry(raio_corpo, tubeRadius, tubularSegments, radialSegments, p, q );

    // mesh combinando forma e material
    const corpo = new THREE.Mesh(forma_geometrica_corpo, material_corpo);
    corpo.position.set(0, -0.12, 0);

    // achatando nos eixos 
    corpo.scale.set(1, 0.8, 1); 

    //////////////////////////////////////////////////////
    // para a cabeça:
    const raio_cabeca = 0.4;
    const forma_geometrica_cabeca = new THREE.IcosahedronGeometry(raio_cabeca, 18);
    const material_cabeca = new THREE.MeshStandardMaterial({
        color: 0xd1bed1,
        flatShading: true
    });


    const cabeca = new THREE.Mesh (forma_geometrica_cabeca, material_cabeca);
    cabeca.position.set(0, 0.15, 0.65);
    cabeca.scale.set(0.6, 0.6, 0.65); //para achatar a cabeça

    //////////////////////////////////////////////////////
    // "chapeuzinho" de lã:

    const raio_chapeuzinho = 0.3;
    const tubeRadius_chapeuzinho =  0.75;  
    const radialSegments_chapeuzinho =  3;  
    const tubularSegments_chapeuzinho =  57;  
    const p_chapeuzinho = 10;  
    const q_chapeuzinho = 14; 

    // primitiva geométrica: Tetraedro com mais detalhes
    const forma_geometrica_chapeuzinho = new THREE.TorusKnotGeometry(raio_chapeuzinho, tubeRadius_chapeuzinho, tubularSegments_chapeuzinho, radialSegments_chapeuzinho, p_chapeuzinho, q_chapeuzinho );

    // mesh combinando forma e material
    const chapeuzinho = new THREE.Mesh(forma_geometrica_chapeuzinho, material_corpo);

    // achatando nos eixos 
    chapeuzinho.scale.set(0.3, 0.2, 0.3); 

    // posicionando 
    chapeuzinho.position.set(0, 0.35, 0.08);

    //////////////////////////////////////////////////////
    // "rabinho" de lã:

    const raio_rabinho = 0.1;
    const tubeRadius_rabinho =  0.1;  
    const radialSegments_rabinho =  3;  
    const tubularSegments_rabinho =  57;  
    const p_rabinho = 10;  
    const q_rabinho = 14; 

    // primitiva geométrica: Tetraedro com mais detalhes
    const forma_geometrica_rabinho = new THREE.TorusKnotGeometry(raio_rabinho, tubeRadius_rabinho, tubularSegments_rabinho, radialSegments_rabinho, p_rabinho, q_rabinho );

    // mesh combinando forma e material
    const rabinho = new THREE.Mesh(forma_geometrica_rabinho, material_corpo);
    rabinho.position.set(0, 0, 0);

    // achatando nos eixos 
    rabinho.scale.set(0.8, 0.8, 0.8); 

    // posicionando 
    rabinho.position.set(0, 0, -0.8);

    // adicionar ao corpo 
    corpo.add(rabinho);

    //////////////////////////////////////////////////////
    // patas:

    // para auxiliar as patas:
    const coord_x_pata = 0.25;
    const coord_y_pata = 0.5;
    const coord_z_pata = 0.2;

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

    // para a pata2:
    const pata2 = new THREE.Mesh(forma_geometrica_pata, material_pata);
    pata2.position.y = -coord_y_pata;
    pata2.position.z = -coord_z_pata;
    pata2.position.x = -coord_x_pata;

    // para a pata3:
    const pata3 = new THREE.Mesh(forma_geometrica_pata, material_pata);
    pata3.position.y = -coord_y_pata;
    pata3.position.z = coord_z_pata;
    pata3.position.x = coord_x_pata;

    // para a pata4:
    const pata4 = new THREE.Mesh(forma_geometrica_pata, material_pata);
    pata4.position.y = -coord_y_pata;
    pata4.position.z = coord_z_pata;
    pata4.position.x = -coord_x_pata;
    ovelha.add(pata1);
    ovelha.add(pata2);
    ovelha.add(pata3);
    ovelha.add(pata4);

    //////////////////////////////////////////////////////
    //olhos:
    const raio_olho = 0.04;
    const forma_geometrica_olho = new THREE.IcosahedronGeometry(raio_olho, 18);
    const material_olho = new THREE.MeshStandardMaterial({
        color: 0x000000,
        flatShading: true
    });


    const olho_direito = new THREE.Mesh (forma_geometrica_olho, material_olho);
    olho_direito.position.set(0.09, 0.09, 0.35);

    const olho_esquerdo = new THREE.Mesh (forma_geometrica_olho, material_olho);
    olho_esquerdo.position.set(-0.09, 0.09, 0.35);

    cabeca.add(olho_direito)
    cabeca.add(olho_esquerdo)

    //////////////////////////////////////////////////////
    //nariz:
    // 1. Criar uma forma triangular 2D
    const formaTriangular = new THREE.Shape();
    formaTriangular.moveTo(0, 0);
    formaTriangular.lineTo(0.1, 0);
    formaTriangular.lineTo(0.1, 0.1);
    formaTriangular.lineTo(0, 0); // fecha o triângulo

    // 2. Configurar a extrusão (espessura no eixo Z)
    const extrudeConfig = {
        depth: 0.05,      // espessura
        bevelEnabled: false // sem bordas chanfradas
    };

    // 3. Criar a geometria extrudada
    const geometriaTriangulo = new THREE.ExtrudeGeometry(formaTriangular, extrudeConfig);

    // 4. Criar o material
    const material_nariz = new THREE.MeshStandardMaterial({ color: 0x000000 });

    // 5. Mesh
    const triangulo = new THREE.Mesh(geometriaTriangulo, material_nariz);

    // 6. Ajustar posição (opcional)
    triangulo.rotation.x = Math.PI ; // para ficar "em pé" na horizontal
    triangulo.position.set(0.07, 0, 0.4); // centraliza melhor
    triangulo.rotation.z = (3.0/4)*Math.PI ; // para ficar "em pé" na horizontal


    // 7. Adiciona à cena
    cabeca.add(triangulo);


    //////////////////////////////////////////////////////
    //orelhas:
    const raio_orelha = 0.17

    // 1. Criar a geometria de um cilindro (forma circular)
    const forma_geometrica_orelha = new THREE.CylinderGeometry(raio_orelha, raio_orelha, 0.05, 64); 
    // raio topo, raio base, altura (espessura), segmentos

    // 2. Criar o material
    const material_orelha = new THREE.MeshStandardMaterial({ color: 0xffffff });

    // 3. Mesh
    const orelha_direita = new THREE.Mesh(forma_geometrica_orelha, material_orelha);

    // 4. Achatar no eixo X ou Z para fazer ele mais oval
    orelha_direita.scale.set(1.2, 1, 0.8); // ovalado em X/Z

    // 5. (Opcional) Rotacionar para deitar
    orelha_direita.rotation.x = Math.PI /2;
    orelha_direita.rotation.y = Math.PI /4;
    orelha_direita.rotation.y =  1* Math.PI ;


    const orelha_esquerda = orelha_direita.clone();
    orelha_esquerda.rotation.y = -Math.PI/4;
    orelha_esquerda.rotation.y =  -1* Math.PI ;


    orelha_esquerda.position.set(-0.3, 0.3, 0.1);

    orelha_direita.position.set(0.3, 0.3, 0.1); 

    // 6. Adicionar à cena
    cabeca.add(orelha_direita);
    cabeca.add(orelha_esquerda);

    //////////////////////////////////////////////////////
    //parte preta da pata:
    const coord_x_pe = 0.25;
    const coord_y_pe = 0.7;
    const coord_z_pe = 0.2;

    // para a pata1:
    const forma_geometrica_pe = new THREE.CylinderGeometry(0.105, 0.105, 0.1, 16);
    const material_pe = new THREE.MeshStandardMaterial({
        color: 0x000000,
        flatShading: true
    });
    const pe1 = new THREE.Mesh(forma_geometrica_pe, material_pe);
    pe1.position.y = -coord_y_pe;
    pe1.position.z = -coord_z_pe;
    pe1.position.x = coord_x_pe;

    // para a pata2:
    const pe2 = new THREE.Mesh(forma_geometrica_pe, material_pe);
    pe2.position.y = -coord_y_pe;
    pe2.position.z = -coord_z_pe;
    pe2.position.x = -coord_x_pe;

    // para a pata3:
    const pe3 = new THREE.Mesh(forma_geometrica_pe, material_pe);
    pe3.position.y = -coord_y_pe;
    pe3.position.z = coord_z_pe;
    pe3.position.x = coord_x_pe;

    // para a pata4:
    const pe4 = new THREE.Mesh(forma_geometrica_pe, material_pe);
    pe4.position.y = -coord_y_pe;
    pe4.position.z = coord_z_pe;
    pe4.position.x = -coord_x_pe;
    ovelha.add(pe1);
    ovelha.add(pe2);
    ovelha.add(pe3);
    ovelha.add(pe4);

    //////////////////////////////////////////////////////
    //dentro da orelha:
    const raio_dentro_orelha = 0.128

    // 1. Criar a geometria de um cilindro (forma circular)
    const forma_geometrica_dentro_orelha = new THREE.CylinderGeometry(raio_dentro_orelha, raio_dentro_orelha, 0.05, 64); 
    // raio topo, raio base, altura (espessura), segmentos

    // 2. Criar o material
    const material_dentro_orelha = new THREE.MeshStandardMaterial({ color: 0xff5cba });

    // 3. Mesh
    const dentro_orelha_direita = new THREE.Mesh(forma_geometrica_dentro_orelha, material_dentro_orelha);

    // 4. Achatar no eixo X ou Z para fazer ele mais oval
    dentro_orelha_direita.scale.set(1.2, 1, 0.8); // ovalado em X/Z

    // 5. (Opcional) Rotacionar para deitar
    dentro_orelha_direita.rotation.x = Math.PI /2;
    dentro_orelha_direita.rotation.y = 1*Math.PI ;

    const dentro_orelha_esquerda = dentro_orelha_direita.clone();
    dentro_orelha_esquerda.rotation.y = -1 * Math.PI;

    dentro_orelha_esquerda.position.set(-0.3, 0.3, 0.11); 

    dentro_orelha_direita.position.set(0.3, 0.3, 0.11); 

    // 6. Adicionar à cena
    cabeca.add(dentro_orelha_direita);
    cabeca.add(dentro_orelha_esquerda);

    ovelha.add(cabeca);
    ovelha.add(corpo);


  return ovelha;
}