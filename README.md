# 自娱自乐 -_- 开心就好

### `npm install`

In the project directory, you can run:

### `npm start`

### `npm test`


### `npm run build`


### `npm run eject`



## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).



- 在CRA中使用sass 只要安装node-sass 到--save下就可以进行编译了，需要启用对css或者sass启用模块化话，在修改需要模块化的文件的后缀名称为[name].module.css 和[name].module.scss，引入的时候需要按照模块化的引用方式进行使用。
- 启用模块化的css或者scss在引用的时候和引入js文件是差不多的，import css from './css.css' 这个时候引用的是css是个对象，使用的话使用{css.title,jsx中引入变量的方式就好了},不启用的直接引入这个文件就好，而且好像index中引入就是全局都可以使用的那种
- 在CRA中使用Autoprefixer不论是css还是scss只要在文件的头部添加 /* autoprefixer grid: on */  就能自动为添加前缀，关于前缀的配置可以修改package.json文件，比如这个scss文件就是启用了自动加前缀
- 引入静态文件，图像字体文件等，在js文件中使用这些的话，就和引入js组件一样使用，import logo from './logo.png'; 这个时候引用的这个logo是个字符串值，也就是说可以在需要它的地方直接使用{当做变量进行引用}，src href 都是可以的。
- 在css/scss文件中引用这些静态文件的时候，直接background: url(./logo.svg) no-repeat;正常书写就好了，这个js引用和css引用好像都是在使用相对路径./这个方式在引用，svg文件还有另外的一种引用方式就像组件一样可以参看官网；
- 公共文件夹public 这里边的文件是不会得到webpack处理的，所以可以放置一些静态资源，要引用public文件夹先的资源需要使用%PUBLIC_URL%作为路径的开始
- 配置代理的话应该是在package.json这个文件中配置 "proxy": "http://localhost:4000"而且好像只有在dev模式下才能起作用,主要意思是build之后防止在服务器上就没有跨域问题了.可以手动的配置代理，npm install http-proxy-middleware --save  --> 创建src/setupProxy.js -->  const proxy = require('http-proxy-middleware');  -->  module.exports = function(app) {app.use(proxy('/api', { target: 'http://localhost:5000/' }));};