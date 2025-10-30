import * as THREE from 'three'


//Cosas Para el 3D
  const canvas = document.querySelector('#fondo3D')
  canvas.width = window.innerWidth
  canvas.height = window.innerHeight

  let escena, camara, render;

  escena = new THREE.Scene()
  //escena.background = new THREE.Color(0x000000)

  camara = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000)
  camara.position.z = 6
  camara.position.y = -1

 render = new THREE.WebGLRenderer({
    canvas: canvas,
    antialias: true,
    alpha: false 
});

  const geometriaCubo = new THREE.BoxGeometry( 0.5, 0.5, 0.5)
  const materialBlanco = new THREE.MeshToonMaterial()
  //materialBlanco.color.set(0xFFFFFF)
  const materialRojo = new THREE.MeshToonMaterial()
  materialRojo.color.set(0xFF3D3D)

  let arreglo_cubos_rojos = new Array()
  let arreglo_cubos_blancos = new Array()

  for(let i = -30; i < 30; i++){
    for(let j = -30; j < 30; j++){
      if((i + j)%2 === 0){
        let otro_cubo = new THREE.Mesh(geometriaCubo, materialBlanco)
        otro_cubo.position.x = j * 0.5
        otro_cubo.position.y = i * 0.5
        escena.add(otro_cubo)
        arreglo_cubos_blancos.push(otro_cubo)
      }
      else{
        let otro_cubo = new THREE.Mesh(geometriaCubo, materialRojo)
        otro_cubo.position.x = j * 0.5
        otro_cubo.position.y = i * 0.5
        escena.add(otro_cubo)
        arreglo_cubos_rojos.push(otro_cubo)
      }
      
    }
  }
  
  const spotLight = new THREE.SpotLight( 0xffffff )
  spotLight.position.set( 0, 6, 7 )
  spotLight.intensity = 500
  escena.add( spotLight )

  const renderizar = (time) => {
    requestAnimationFrame(renderizar);
    for(let i = 0; i < arreglo_cubos_rojos.length; i++)
    {
      arreglo_cubos_rojos[i].position.z = Math.sin(time * 0.001 + i * 0.2) * 0.1
      arreglo_cubos_blancos[i].position.z = Math.cos(time * 0.001 + i * 0.2) * 0.1
    }
    render.setSize(window.innerWidth, window.innerHeight)
    render.render(escena, camara)
}
renderizar()