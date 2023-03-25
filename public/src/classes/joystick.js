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
            fwdValue: 0,
            bkdValue: 0,
            lftValue:0, 
            rgtValue:0
        }
    }
    addEvent(){
        this.joystick['0'].on('move', (evt, data) => {
            const forward = data.vector.y
            const turn = data.vector.x
            
            if (forward > 0) {
              this.joyDirection.fwdValue = Math.abs(forward)
              this.joyDirection.bkdValue = 0
            } else if (forward < 0) {
                this.joyDirection.fwdValue = 0
                this.joyDirection.bkdValue = Math.abs(forward)
            }
    
            if (turn > 0) {
                this.joyDirection.lftValue = 0
                this.joyDirection.rgtValue = Math.abs(turn)
            } else if (turn < 0) {
                this.joyDirection.lftValue = Math.abs(turn)
                this.joyDirection.rgtValue = 0
            }
        })
        this.joystick['0'].on('end',  (evt) => {
            this.joyDirection.bkdValue = 0
            this.joyDirection.fwdValue = 0
            this.joyDirection.lftValue = 0
            this.joyDirection.rgtValue = 0
         })
    }
    getDirection(){
        return this.joyDirection
    }
}