class World {
    constructor({ managers, octree, worldImgs, imgDivide}) {
        
        this.loader  = new THREE.GLTFLoader()
        this.octree = octree
        this.managers = managers
        this.worldImgs = worldImgs
        this.imgDivide = imgDivide
        this.worldImgMeshs = []
        this.group = new THREE.Group()
    }
    #calcScale(obj, dim) {
        return  obj.scale[dim] || obj.scale || 1
    }
    init(){
        this.loader.load('/assets/platform/scene.gltf' , gltf => {
            gltf.scene.traverse( (child) => {

                if ( child.isMesh ) {
                    this.managers.cityManager.meshs[child.name] = child
                }

            } );

            this.managers.cityManager.meshMap.forEach(meshObj => {
                let mesh = this.managers.cityManager.meshs[meshObj.name].clone()
                if(meshObj.animation) {

                    let meshInst = new AnimateObject({mesh: mesh, animateCallback: () => meshObj.animation(mesh)})
                    let center = meshInst.center()
                    meshInst.mesh.position.set(meshObj.position.x, meshObj.position.y, meshObj.position.z)
                    meshInst.mesh.translateX(-center.x * this.#calcScale(meshObj, "x"))
                    meshInst.mesh.translateY(-center.y * this.#calcScale(meshObj, "y"))
                    meshInst.mesh.translateZ(-center.z * this.#calcScale(meshObj, "z"))
                    meshInst.mesh.rotation.set(meshObj.rotation.x, meshObj.rotation.y, meshObj.rotation.z)
                    meshInst.mesh.scale.x = this.#calcScale(meshObj, "x")
                    meshInst.mesh.scale.y = this.#calcScale(meshObj, "y")
                    meshInst.mesh.scale.z = this.#calcScale(meshObj, "z")
                    this.managers.animatorManager.addAnimation(meshInst.animateCallback)
                    this.group.add(meshInst.mesh)
                    this.octree.fromGraphNode(meshInst.mesh)
                } else {
                    let meshInst = new PhysicObject({mesh})
                    let center = meshInst.center()
                    meshInst.mesh.position.set(meshObj.position.x, meshObj.position.y, meshObj.position.z)
                    meshInst.mesh.translateX(-center.x * this.#calcScale(meshObj, "x"))
                    meshInst.mesh.translateY(-center.y * this.#calcScale(meshObj, "y"))
                    meshInst.mesh.translateZ(-center.z * this.#calcScale(meshObj, "z"))
                    meshInst.mesh.rotation.set(meshObj.rotation.x, meshObj.rotation.y, meshObj.rotation.z)
                    meshInst.mesh.scale.x = this.#calcScale(meshObj, "x")
                    meshInst.mesh.scale.y = this.#calcScale(meshObj, "y")
                    meshInst.mesh.scale.z = this.#calcScale(meshObj, "z")
                    this.group.add(meshInst.mesh)
                    this.octree.fromGraphNode(meshInst.mesh)
                }
                
            })
        })
        this.handleImage()
    }
    handleImage() {
        for(let i = 0; i < this.worldImgs.length; i++) {
            const texture =  this.managers.imgManager.loadImage(this.worldImgs[i]) 
            let statueImage = new StatueImage({
                texture:  texture.texture,
                position: {
                    x: (4 + 3 * Math.floor(i / this.imgDivide)) * Math.sin((i+ Math.floor(i / this.imgDivide) / 2) * Math.PI / 5 ), 
                    y: 0, 
                    z: (4 + 3 * Math.floor(i / this.imgDivide)) * Math.cos((i+ Math.floor(i / this.imgDivide) / 2) * Math.PI / 5 )
                },
                rotation: {
                    y: (i+ Math.floor(i / this.imgDivide) / 2) * Math.PI / 5  + Math.PI , 
                },
                opacityDelay: i
            })
            this.octree.fromBasicNode(statueImage.boxMesh)
            this.octree.fromBasicNode(statueImage.bottomBoxMesh)
            this.group.add(statueImage.group)
            this.managers.animatorManager.addAnimation(() => statueImage.animate())
        }
        

    }
}