const log4js = require('log4js');
const config = require('~/config')

// 配置日志 
// 批量定义多个级别的 logger，不同的 logger 存放在不同的目录
log4js.configure({
  appenders: { 
    error: { type: 'file', filename: config.get('logDir') + '/error.log' },
    warn: { type: 'file', filename: config.get('logDir') + '/warn.log' },
    debug: { type: 'file', filename: config.get('logDir') + '/debug.log' },
  },
  categories: { 
    error: { appenders: ['error'], level: 'error' },
    warn: { appenders: ['warn'], level: 'warn' },
    debug: { appenders: ['debug'], level: 'debug' },
    default: { appenders: ['error'], level: 'error' },
  }
});

function getLogger(){
  // 获取不同 level 的 logger
  const errorLogger = log4js.getLogger('error');
  const warnLogger = log4js.getLogger('warn');
  const debugLogger = log4js.getLogger('debug');
  return {
    errorLogger,
    warnLogger,
    debugLogger,
  }
}

module.exports = getLogger();