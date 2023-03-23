class ImageManager { 
    constructor() {
        this.group = new THREE.Group()
        this.loader = new THREE.TextureLoader()
    }
    loadImage(link){
        const size = {}
        const texture = this.loader.load(link, tex => {
            size.height = tex.image.height
            size.width = tex.image.width
        })
        
        return {
            texture,
            size
        }
        
    }
    addImage(link){
        let texture = this.loader.load(link)
        let geo = new THREE.PlaneGeometry( 1, 1 )
        let mat = new THREE.MeshBasicMaterial( { map: texture, side: THREE.DoubleSide} );
        let plane = new THREE.Mesh( geo, mat )
        // plane.rotation.x = Math.PI / 2
        this.group.add(plane)
    }
   
}

class StatueImage {
    constructor({texture, position, rotation, opacityDelay}) {
        this.texture = texture 
        this.position = position
        this.rotation = rotation
        this.group = new THREE.Group()
        this.bordersPoints = []
        this.opacityDelay = opacityDelay
        this.imageSize = {
            width: 0.7,
            height: 0.7
        }
        this.borderSize = {
            range: 0.6,
            height: 1.5
        }
        this.group.position.x = this.position.x
        this.group.position.y = this.position.y
        this.group.position.z = this.position.z
        this.group.rotation.y = this.rotation.y
        this.image = new THREE.Mesh(
            new THREE.PlaneGeometry(this.imageSize.width, this.imageSize.height),
            new THREE.MeshBasicMaterial( { 
                map: this.texture, 
                side: THREE.DoubleSide
            } )
        )

        this.boxMesh = new THREE.Mesh(
            new THREE.BoxGeometry( this.borderSize.range / Math.sin(Math.PI / 4),this.borderSize.height, this.borderSize.range / Math.sin(Math.PI / 4)),
            new THREE.MeshPhongMaterial({
                transparent: true,
                opacity: 0.8,
                color: new THREE.Color(0xdcc6f5)
            })
        )
        this.bottomBoxMesh = new THREE.Mesh(
            new THREE.BoxGeometry( 2 * this.borderSize.range * Math.sin( Math.PI / 2 + Math.PI / 4), 0.125, 2 * this.borderSize.range * Math.sin( Math.PI / 2 + Math.PI / 4)),
            new THREE.MeshPhongMaterial({
                transparent: false,
                opacity: 0.8,
                color: new THREE.Color(0xffe7e6)
            })
        )
        this.#createImage()
    }
    #createImage(){
        
        this.image.position.y = this.borderSize.height / 2 + .3 + .25
        this.group.add(this.image)
        this.boxMesh.position.y = this.borderSize.height / 2 + 0.3 + .25
        this.group.add(this.boxMesh)
        this.bottomBoxMesh.position.y = 0.6
        this.group.add(this.bottomBoxMesh)
        for(let i =0; i < 4; i++){
            this.bordersPoints.push(
                new THREE.Vector3( 0, 0.3, 0 ),
                new THREE.Vector3( this.borderSize.range * Math.sin(i* Math.PI / 2 + Math.PI / 4), 0.3, this.borderSize.range * Math.cos(i* Math.PI / 2 + Math.PI / 4)),
                new THREE.Vector3( this.borderSize.range * Math.sin(i* Math.PI / 2+ Math.PI / 4), this.borderSize.height + .31, this.borderSize.range * Math.cos(i* Math.PI / 2+ Math.PI / 4)),
                new THREE.Vector3( this.borderSize.range * Math.sin(i* Math.PI / 2+ Math.PI / 4), 0.3, this.borderSize.range * Math.cos(i* Math.PI / 2+ Math.PI / 4)),
                new THREE.Vector3( 0, 0.3, 0 ),
            )
        }

        this.borderLine = new THREE.Line( 
            new THREE.BufferGeometry().setFromPoints( this.bordersPoints ),
            new THREE.LineBasicMaterial({
                color: new THREE.Color('white')
            }) 
        )
        this.borderLine.position.y = 0.24
        this.group.add(this.borderLine)
    }
    animate(){
        this.image.rotation.y += 0.01
        this.image.position.y = this.borderSize.height / 2 + .3 + .25 + .1 * Math.sin(new Date() * 0.001 + this.opacityDelay * Math.PI / 2)
        this.boxMesh.material.opacity = 0.5 * Math.pow(Math.sin(new Date() * 0.001 + this.opacityDelay * Math.PI / 2), 2)
    }
}