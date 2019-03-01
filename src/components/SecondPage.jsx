import React, { Component } from 'react';
import Music from './music/Music.jsx';

export default class SecondPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      musicActive:0,
      musicList: []
    };
    this.musicListSelect = this.musicListSelect.bind(this);
  }
  UNSAFE_componentWillMount() {
    // 走ajax拿去数据然后放到musicList中，我怎么感觉这东西需要我从上边的父组件传递过来不需要，在这边操作
    this.setState({
      musicList: [
        {
          id: "1330348068",
          lrc: "https://api.bzqll.com/music/netease/lrc?id=1330348068&key=579621905",
          name: "起风了",
          pic: "https://api.bzqll.com/music/netease/pic?id=1330348068&imgSize=400&key=579621905",
          singer: "买辣椒也用券",
          time: 325,
          url: "https://api.bzqll.com/music/netease/url?id=1330348068&key=579621905",
        }, {
          id: "1313354324",
          lrc: "https://api.bzqll.com/music/netease/lrc?id=1313354324&key=579621905",
          name: "出山",
          pic: "http://p2.music.126.net/xUAfdMHdXhu3BmO4g8nOYA==/109951163573311341.jpg?param=400y400",
          singer: "花粥/胜娚",
          time: 200,
          url: "https://api.bzqll.com/music/netease/url?id=1313354324&key=579621905",
        }, {
          id: "1348568908",
          lrc: "https://api.bzqll.com/music/netease/lrc?id=1348568908&key=579621905",
          name: "蜂鸟",
          pic: "http://p2.music.126.net/rQw-f1jS2PIDnY2DoYlO7w==/109951163890222255.jpg?param=400y400",
          singer: "吴青峰",
          time: 225,
          url: "https://api.bzqll.com/music/netease/url?id=1348568908&key=579621905",
        }, {
          id: "574566207",
          lrc: "https://api.bzqll.com/music/netease/lrc?id=574566207&key=579621905",
          name: "盗将行",
          pic: "http://p2.music.126.net/-qHPT3rhxDlu5zQV9NcQ-A==/109951163555860423.jpg?param=400y400",
          singer: "花粥/马雨阳",
          time: 198,
          url: "https://api.bzqll.com/music/netease/url?id=574566207&key=579621905",
        }, {
          id: "534542079",
          lrc: "https://api.bzqll.com/music/netease/lrc?id=534542079&key=579621905",
          name: "侧脸",
          pic: "http://p2.music.126.net/FWR6RWtqhljoKR0QyRhQzQ==/109951163127272432.jpg?param=400y400",
          singer: "于果",
          time: 217,
          url: "https://api.bzqll.com/music/netease/url?id=534542079&key=579621905",
        }, {
          id: "449818741",
          lrc: "https://api.bzqll.com/music/netease/lrc?id=449818741&key=579621905",
          name: "光年之外",
          pic: "http://p1.music.126.net/fkqFqMaEt0CzxYS-0NpCog==/18587244069235039.jpg?param=400y400",
          singer: "G.E.M.邓紫棋",
          time: 235,
          url: "https://api.bzqll.com/music/netease/url?id=449818741&key=579621905",
        }, {
          id: "513360721",
          lrc: "https://api.bzqll.com/music/netease/lrc?id=513360721&key=579621905",
          name: "云烟成雨",
          pic: "http://p1.music.126.net/DSTg1dR7yKsyGq4IK3NL8A==/109951163046050093.jpg?param=400y400",
          singer: "房东的猫",
          time: 240,
          url: "https://api.bzqll.com/music/netease/url?id=513360721&key=579621905",
        }, {
          id: "187672",
          lrc: "https://api.bzqll.com/music/netease/lrc?id=187672&key=579621905",
          name: "烦恼歌",
          pic: "http://p1.music.126.net/YxjQpND8glWia55x6v280g==/107752139534181.jpg?param=400y400",
          singer: "张学友",
          time: 254,
          url: "https://api.bzqll.com/music/netease/url?id=187672&key=579621905",
        }, {
          id: "554242032",
          lrc: "https://api.bzqll.com/music/netease/lrc?id=554242032&key=579621905",
          name: "飞云之下",
          pic: "http://p1.music.126.net/YsQrEZ_M6kduwN2zh6Q6kg==/109951163311406661.jpg?param=400y400",
          singer: "韩红/林俊杰",
          time: 266,
          url: "https://api.bzqll.com/music/netease/url?id=554242032&key=579621905",
        }
      ]
    })
  }

  render() {
    return (
      <div className="everyPage_content two_page">

        <div className="two_page_box">

          <div className="two_page_top">
            <div className="two_page_part1">
              <p>曾以为生活规规矩矩</p>
              <p>那些年做过的美梦</p>
              <p>曾经向往的地方</p>
              <p>如今所处之地</p>
              <p>有同感吗</p>
              <p>心痛吗</p>
              <p>稔知</p>
              <span className="shadow_dot"></span>
            </div>
          </div>

          <div className="two_page_bottom">
            <div className="two_page_part2">
              <ul className="page_list_ul" style={{"transform":`translate(0px, -${this.state.musicActive-5>0 && this.state.musicList.length > 15 ? (this.state.musicActive-5)*24 : 0}px`}}>
                {
                  this.state.musicList.map((item,index)=>{
                    return(
                      <li key={ item.id } ><a href="javascript:void(0)" className={`${this.state.musicActive === index? 'page_list_a':''} two_page_list_a`} onClick={()=>this.musicListSelect(index)} > { item.name } -- {item.singer} </a> <span className="right_dot"></span></li>
                    )
                  })
                }
              </ul>
            </div>
          </div>

          < Music musicList={this.state.musicList} nowActive={this.state.musicActive} musicListSelect={this.musicListSelect} />

        </div>

      </div>
    )
  };
  musicListSelect(index){
    this.setState({
      musicActive:index
    })
  };
}
