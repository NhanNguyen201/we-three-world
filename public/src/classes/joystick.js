class JoyStick {
    constructor({dom}){
        this.dom = dom
        this.joystick = nipplejs.create({
            zone: this.dom,
            size: 120,
            multitouch: true,
            maxNumberOfNipples: 2,
            mode: 'static',
            restJoystick: true,
            shape: 'circle',
            position: { top: '60px', left: '60px' },
            dynamicPage: true,
        })
        this.joyDirection = {
            forward: 0,
            backward: 0,
            left:0, 
            right:0
        }
    }
    addEvent(){
        this.joystick['0'].on('move', (evt, data) => {
            const forward = data.vector.y
            const turn = data.vector.x
            
            if (forward > 0) {
              this.joyDirection.forward = Math.abs(forward)
              this.joyDirection.backward = 0
            } else if (forward < 0) {
                this.joyDirection.forward = 0
                this.joyDirection.backward = Math.abs(forward)
            }
    
            if (turn > 0) {
                this.joyDirection.left = 0
                this.joyDirection.right = Math.abs(turn)
            } else if (turn < 0) {
                this.joyDirection.left = Math.abs(turn)
                this.joyDirection.right = 0
            }
        })
        this.joystick['0'].on('end',  (evt) => {
            this.joyDirection.backward = 0
            this.joyDirection.forward = 0
            this.joyDirection.left = 0
            this.joyDirection.right = 0
         })
    }
    getDirection(){
        return this.joyDirection
    }
}