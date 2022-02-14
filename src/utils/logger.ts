
  export default class Logger {
    level: DebugLevelShape
    constructor(level:DebugLevelShape = false) {
      this.level = level ? level : false;
    }
    log(msg:any, always = false) {
      if ((always && this.level) || this.level == 'verbose') {
          console.log(msg);
      }
    }
  }