const path = require('path')
const config = new Map()
const isDev = process.env.NODE_ENV === 'development';

const viewsDir = path.resolve(__dirname,'../../static/views')
const staticDir = path.resolve(__dirname,'../../static/assets')
const logDir = path.resolve(__dirname,'../../logs')
const varControls = ['[[',']]']

config.set('viewsDir',viewsDir)
config.set('staticDir',staticDir)
config.set('logDir',logDir)

if(isDev){
  config.set('port',3000);
  config.set('swig',{
    cache:false,
    varControls
  });
}else{
  config.set('port',80)
  config.set('swig',{
    cache:'memory',
    varControls
  });
}

module.exports = config;
