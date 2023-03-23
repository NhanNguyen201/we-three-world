class AnimatorManager {
    constructor(){
        this.animationGroup = []
    }
    addAnimation(aniCallback){
        this.animationGroup.push(aniCallback)
    }
    animate(){
        for(let i= 0; i < this.animationGroup.length ; i++){
            this.animationGroup[i]()
        }
    }
}