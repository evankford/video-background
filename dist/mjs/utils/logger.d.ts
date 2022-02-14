export default class Logger {
    level: DebugLevelShape;
    constructor(level?: DebugLevelShape);
    log(msg: any, always?: boolean): void;
}
