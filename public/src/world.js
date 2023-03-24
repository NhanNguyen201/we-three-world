class World {
    constructor({ managers, octree, worldImgs, imgPerRound, imgPerFloor}) {
        
        this.loader  = new THREE.GLTFLoader()
        this.octree = octree
        this.managers = managers
        this.worldImgs = worldImgs
        this.imgPerRound = imgPerRound
        this.imgPerFloor = imgPerFloor
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
            let range = (4 + 1 * Math.floor(i / this.imgPerFloor) + 3 * Math.floor((i % this.imgPerFloor) / this.imgPerRound))
            let angle = ((i % this.imgPerRound) + Math.floor(i / this.imgPerRound) / 2 ) * Math.PI / (this.imgPerRound / 2)  + (Math.floor(i / this.imgPerFloor) * Math.PI /(this.imgPerRound * 2))
            let statueImage = new StatueImage({
                texture:  texture.texture,
                position: {
                    x: range * Math.sin(angle), 
                    y: 2 * Math.floor(i / this.imgPerFloor), 
                    z: range * Math.cos(angle)
                },
                rotation: {
                    y: angle
                },
                opacityDelay: (i % this.imgPerRound)
            })
            this.octree.fromBasicNode(statueImage.boxMesh)
            this.octree.fromBasicNode(statueImage.bottomBoxMesh)
            this.group.add(statueImage.group)
            this.managers.animatorManager.addAnimation(() => statueImage.animate())
        }
        

    }
}