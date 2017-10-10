import * as Timer from './timer';

const GAME_STATE = {
    UNINITIALIZED: 0,
    RUNNING: 1,
    PAUSED: 2
}

export default {
    state: {

    },

    /**
     * initialize the game, and start to run it
     */ 
    start(context) {
        Timer.startTimer();
        Timer.addTimer(0, this, this.update, true);
        Timer.addTimer(0, this, this.render, true);

        // 初始化各个系统
    },

    /**
     * pause the game
     */ 
    pause() {
        Timer.pauseTimer();
    },

    /**
     * resume after pause the game
     */ 
    resume() {
        Timer.resumeTimer();
    },

    /**
     * exit the game, and destory the instance
     */
    exit() {
        Timer.endTimer();
    }

    /**
     * 
     */ 
    update(elapsedTime) {

    },

    /**
     *
     */ 
    render(elapsedTime) {

    },
}

