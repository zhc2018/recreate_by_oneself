import React, { Component } from 'react';
import '../scss/App.scss';
import FirstPage from './FirstPage.jsx';
import SecondPage from './SecondPage.jsx';
import ThirdPage from './ThirdPage.jsx';
import FourthPage from './FourthPage.jsx';

Component.prototype.debounce = ( func, Await = 100) => {
  let debounce_timer;
  return function ( ...args ){
    if(debounce_timer){
      clearTimeout(debounce_timer);
    };
    debounce_timer = setTimeout(()=>{
      func.apply(this, args);
    },Await)
  }
};
Component.prototype.throttle = ( func, Await = 100) =>{
  var lastTime = Date.now();
  return function(...args){
    const nowTime = Date.now();
    if(nowTime - lastTime > Await){
      func.call(this, ...args);
      lastTime = nowTime;
    }
  };
};

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      fullPage: [ //  滚动屏幕详情数组用来创建全屏滚动，可以包括一些设置和滚动屏内组件；
        {
          pageID:1,
          background: '#987654',
          // component:< FirstPage />   //  这个方式也可以渲染出组件来，但是我没没有找到好的方式去像子组件传递参数，所以改变了写法 
        },
        {
          pageID:2,
          background: '#87d9e1',
          // component:< SecondPage />
        },
        {
          pageID:3,
          background: '#8185d7',
          // component:< ThirdPage />
        },
        {
          pageID:4,
          background: '#e187cf',
          // component:< FourthPage />
        }
      ],
      clientHeight: document.documentElement.clientHeight, // 获取可是窗口高度，用来设置每屏幕的高度
      pageCurrent: 0, // 默认设置当前屏索引为0
      pageSlide: false,  // 设置是否正在滑动的标志，false表示不滑动
    };
    this.pageScroll = this.pageScroll.bind(this); //  绑定滚动切换函数this
    this.pageResize = this.pageResize.bind(this); //  绑定屏幕视口切换函数this
    this.fullPageItem = this.fullPageItem.bind(this); //  绑定当前屏为哪一屏函数this
    this.pageScrollSet = this.pageScrollSet.bind(this); //  绑定滚动屏函数this
  }

  render() {
    let Pages = this.state.fullPage.map((item, index) => {
      //  return (<div key={item.pageID} style={{ height: this.state.clientHeight + 'px', background: item.background }}>{item.component}</div>);
      let Component;
      switch(index){
        case 0:
        Component=FirstPage;
        break;
        case 1:
        Component=SecondPage;
        break;
        case 2:
        Component=ThirdPage;
        break;
        case 3:
        Component=FourthPage;
        break;
        default:
        break;
      };
      return (<div key={item.pageID} style={{ height: this.state.clientHeight + 'px', background: item.background }}><Component itemIndex={this.state.pageCurrent} /></div>);
    });
    let Lists = this.state.fullPage.map((item,index)=>{
      return (<div key={item.pageID} className={ ['fullPage_listItem',(this.state.pageCurrent===index) && 'fullPage_listItemActive' ].join(' ') } onClick={ ()=>{ this.fullPageItem(index) } } >{ +index+1 }</div>);
    });

    return (
      <div className="fullPage_content" style={{ height: this.state.clientHeight + 'px' }}>
        <div className="fullPage_box" style={{ transform:`translate(0px, -${this.state.pageCurrent*this.state.clientHeight}px)` }}>
          { Pages }
        </div>
        <div className="fullPage_list" style={{ marginTop:`-${(this.state.fullPage.length)*20-10}px` }} >
          { Lists }
        </div>
      </div>
    );
  };

  componentDidMount(){
    window.onmousewheel = document.onmousewheel= this.pageScroll;
    window.onresize = this.debounce( this.pageResize, 200);
  };

  pageScroll(e){
    if(this.state.pageSlide){
      return false;
    };
    if(e.wheelDelta < 0 ){
      if(this.state.pageCurrent >= this.state.fullPage.length-1 ){
        return false;
      };
      this.pageScrollSet(this.state.pageCurrent + 1)
    }else{
      if(this.state.pageCurrent <=0 ){
        return false;
      };
      this.pageScrollSet(this.state.pageCurrent - 1);
    };
  };
  pageScrollSet(itemIndex){
    this.setState({
      pageSlide:true,
      pageCurrent : itemIndex
    });
    setTimeout(()=>{
      this.setState({
        pageSlide:false
      })
    },1000);
  }
  pageResize(){
    this.setState({
      clientHeight:document.documentElement.clientHeight
    })
  };
  fullPageItem(index){
    this.setState({
      pageCurrent : index
    })
  }

};

export default App;
