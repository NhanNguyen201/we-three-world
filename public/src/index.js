class App {
    constructor({imgs}) {
      this.imgs = JSON.parse(imgs);
      this.scene = new THREE.Scene();
      this.textureLoaders = new THREE.TextureLoader();
      
      this.speed =  Math.PI / 180;
      this.boxGroups = []
      this.camera = new THREE.PerspectiveCamera(
        45,
        window.innerWidth / window.innerHeight,
        0.001, 
        100000000
      );
      let ambientLight = new THREE.AmbientLight(0x999999 );
      this.scene.add(ambientLight);
      let lights = [];
      lights[0] = new THREE.DirectionalLight( 0xffffff, 0.7 );
      lights[0].position.set( -2, 6, -4 );
      lights[1] = new THREE.HemisphereLight( 0xffffbb, 0x080820, 1 );
      lights[1].position.set( -5, 2, -10 );
      lights[2] = new THREE.SpotLight( 0xffffff, 0.9, 60, Math.PI / 4 )
      lights[2].position.set(0, 12, -15)
      let target = new THREE.Object3D()
      target.position.set(0,3, 12)
      lights[2].target = target
      this.scene.add(target)
      // this.scene.add( lights[0] );
      this.scene.add( lights[1] );
      this.scene.add( lights[2] )
      this.renderer = new THREE.WebGLRenderer({
        canvas: document.querySelector("#scene"),
        antialias: true
      });
      this.renderer.setSize(window.innerWidth, window.innerHeight);
      
      this.renderer.setClearColor(0x000000, 1);

      this.effectComposer = false
     
      this.clock = new THREE.Clock();
  
      this.setting = {
        joystick: false,
        GRAVITY: 15,
        STEPS_PER_FRAME: 3,
        mapDev: false
      }
      if(this.setting.mapDev) {
        this.controls = new THREE.OrbitControls(this.camera, this.renderer.domElement);
      }
      this.onResize();
    }
  
    init({isMobile}) {
      let worldImgs = this.imgs.length > 0 ? this.imgs.map(i => i.asset.url) : []
      let imgPerRound = 6
      let imgPerFloor = 12
      if(!isMobile) {
        document.getElementById('mobileInterface').style.display = "none"
      } else {
        this.setting.joystick = new JoyStick({dom: document.getElementById('joystickWrapper1')})
        this.setting.joystick.addEvent()
      }
      this.worldManagers = {
        cityManager : new CityManager(),
        animatorManager : new AnimatorManager(),
        imgManager: new ImageManager(),
        joystickManager: this.setting.joystick
      }
      this.octree = new THREE.Octree()

      this.world = new World({
        scene: this.scene, 
        managers: this.worldManagers,
        octree: this.octree,
        worldImgs,
        imgPerRound,
        imgPerFloor
      })
      this.world.init()
      this.scene.add(this.world.group)

      this.player = new Player({
        originalPos: {x: 1, y: 3, z: 1},
        camera: this.camera,
        gravity: this.setting.GRAVITY,
        octree: this.octree,
        joystick: this.worldManagers.joystickManager

      })
      this.addEvents();
    }
   
   
   
    addEvents(){
      window.requestAnimationFrame(this.run.bind(this));
      window.addEventListener("resize", this.onResize.bind(this), false);
      window.addEventListener( 'keydown', ( event ) => {

				this.player.keyStates[ event.code ] = true;

			} );

			window.addEventListener( 'keyup', ( event ) => {

				this.player.keyStates[ event.code ] = false;

			} );
      document.getElementById("up").addEventListener("pointerdown", e => {
        this.player.keyStates['up'] = true;
      })
      document.getElementById("up").addEventListener("pointerup", e => {
        this.player.keyStates['up'] = false;
      })
      document.getElementById("down").addEventListener("pointerdown", e => {
        this.player.keyStates['down'] = true;
      })
      document.getElementById("down").addEventListener("pointerup", e => {
        this.player.keyStates['down'] = false;
      })
      document.getElementById("JumpB").addEventListener("pointerdown", e => {
        this.player.keyStates['jump'] = true;
      })
      document.getElementById("JumpB").addEventListener("pointerup", e => {
        this.player.keyStates['jump'] = false;
      })
    }
  
    run() {
      requestAnimationFrame(this.run.bind(this));
      this.render();
    }
  
    render() {
      const deltaTime = Math.min( 0.05, this.clock.getDelta() ) / this.setting.STEPS_PER_FRAME;
          
      if(!this.setting.mapDev){
        for ( let i = 0; i < this.setting.STEPS_PER_FRAME; i ++ ) {
          this.player.animate(deltaTime)
        }
      }
      this.worldManagers.animatorManager.animate()
      if(this.effectComposer) {
        this.effectComposer.render()
      } else {
        this.renderer.render(this.scene, this.camera);
      }
    }
  
    onResize() {
      const w = window.innerWidth;
      const h = window.innerHeight;
      this.camera.aspect = w / h;
      this.camera.updateProjectionMatrix();
      this.renderer.setSize(w, h);
      if(this.effectComposer){
        this.effectComposer.setSize(w, h)
      }
    }
  }
  
  