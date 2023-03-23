class PhysicObject {
    constructor({ mesh }){
        this.mesh = mesh
    }   
    center(){

        var geometry = this.mesh.geometry;
        geometry.computeBoundingBox();
        var center = new THREE.Vector3();
        geometry.boundingBox.getCenter( center );
        return center;
    }
}

class AnimateObject  {
    constructor({mesh, animateCallback }) {
        this.mesh = mesh
        this.animateCallback = animateCallback
    }
    center(){
        var geometry = this.mesh.geometry;
        geometry.computeBoundingBox();
        var center = new THREE.Vector3();
        geometry.boundingBox.getCenter( center );
        return center;
    }
}