class Player {
    constructor({camera, gravity, octree, originalPos}) {
            this.camera = camera
            this.gravity = gravity
            this.octree = octree
            this.originalPos = originalPos
			this.playerCollider = new THREE.Capsule( 
                new THREE.Vector3( this.originalPos.x, this.originalPos.y + 1.5, this.originalPos.z ), 
                new THREE.Vector3( this.originalPos.x, this.originalPos.y + 2, this.originalPos.z ), 
                0.075 
            );

			this.playerVelocity = new THREE.Vector3();
			this.playerDirection = new THREE.Vector3();

			this.playerOnFloor = false;
			this.keyStates = {};
			
            this.playerVisions = new THREE.Vector3(0,0, 0);
    }
    getForwardVector() {

        this.camera.getWorldDirection( this.playerDirection );
        this.playerDirection.y = 0;
        this.playerDirection.normalize();

        return this.playerDirection;

    }

    getSideVector() {

        this.camera.getWorldDirection( this.playerDirection );
        this.playerDirection.y = 0;
        this.playerDirection.normalize();
        this.playerDirection.cross( this.camera.up );

        return this.playerDirection;

    }
    controls( deltaTime ) {

        const speedDelta = deltaTime * ( this.playerOnFloor ? 8 : 3 );

        if ( this.keyStates[ 'KeyW' ] ) {

            this.playerVelocity.add( this.getForwardVector().multiplyScalar( speedDelta ) );

        }

        if ( this.keyStates[ 'KeyS' ] ) {

            this.playerVelocity.add( this.getForwardVector().multiplyScalar( - speedDelta ) );

        }

        if ( this.keyStates[ 'KeyA' ] ) {
            this.playerVisions.x += 0.0075
            this.playerVisions.z += 0.0075 
        }

        if ( this.keyStates[ 'KeyD' ] ) {

            this.playerVisions.x -= 0.0075
            this.playerVisions.z -= 0.0075 
        }

        if ( this.keyStates[ 'KeyQ' ] ) {
            this.playerVisions.y -= this.playerVisions.y > -0.45 ? 0.005 : 0
        }
        if ( this.keyStates[ 'KeyE' ] ) {
            this.playerVisions.y += this.playerVisions.y < 0.75 ? 0.005 : 0
        }

        if ( this.playerOnFloor ) {

            if ( this.keyStates[ 'Space' ] ) {

                this.playerVelocity.y = 5;

            }

        }

    }
    updatePlayer( deltaTime ) {

        let damping = Math.exp( - 4 * deltaTime ) - 1;

        if ( ! this.playerOnFloor ) {

            this.playerVelocity.y -= this.gravity * deltaTime;

            // small air resistance
            damping *= 0.1;

        }

        this.playerVelocity.addScaledVector( this.playerVelocity, damping );

        const deltaPosition = this.playerVelocity.clone().multiplyScalar( deltaTime );
        this.playerCollider.translate(deltaPosition)  ;

        this.playerCollisions();

        this.camera.position.copy( this.playerCollider.end );
        let dir = new THREE.Vector3(
            Math.sin(this.playerVisions.x), 
            Math.sin(this.playerVisions.y) * 0.5, 
            Math.cos(this.playerVisions.z)
        ).normalize()
        // console.log(this.playerCollider.end + dir)
        let cameraLookAt = new THREE.Vector3(this.playerCollider.end.x + dir.x, this.playerCollider.end.y + dir.y, this.playerCollider.end.z + dir.z)
        this.camera.lookAt(cameraLookAt)
        
    }
    playerCollisions() {

        const result = this.octree.capsuleIntersect( this.playerCollider );

        this.playerOnFloor = false;

        if ( result ) {

            this.playerOnFloor = result.normal.y > 0;

            if ( ! this.playerOnFloor ) {

                this.playerVelocity.addScaledVector( result.normal, - result.normal.dot( this.playerVelocity ) );

            }

            this.playerCollider.translate( result.normal.multiplyScalar( result.depth ) );

        }

    }
    animate(delta) {
        this.controls(delta)
        this.updatePlayer(delta)
    }
}