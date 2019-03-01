import React, { Component } from 'react';
import '../../scss/music.scss';
import pause from '../../img/pause.svg';
import play from '../../img/play.svg';
import previous from '../../img/previous.svg';
import next from '../../img/next.svg';
import volume_shut from '../../img/volume_shut.svg';
import volume_open from '../../img/volume_open.svg';
import Progress from './Progress.jsx';

export default class Music extends Component {

  constructor(props){
    super(props);
    this.state = {
      playStatus:false,
      volumeStatus:true,
      volumeSet:1,
      copyVolumeSet:1,
      proBarWidth:0,
      currentTime:0,
      currentNum:0,
      musicTotleNum:1,
      //musicList:[   //使用播放器本身参数类型事使用，现使用props的数据，记得把props的恢复
        // {
        //   time:325,
        //   url:'https://api.bzqll.com/music/netease/url?id=1330348068&key=579621905'
        // },
        // {
        //   time:200,
        //   url:'https://api.bzqll.com/music/netease/url?id=1313354324&key=579621905'
        // },
        // {
        //   time:225,
        //   url:'https://api.bzqll.com/music/netease/url?id=1348568908&key=579621905'
        // },
      //],
      playState:{}
    };
    this.timer = null;
    this.audioPlayer = React.createRef();
    this.bgProgress = React.createRef();
    this.playChange = this.playChange.bind(this);
    this.volumeChange = this.volumeChange.bind(this);
    this.volumeSliding = this.volumeSliding.bind(this);
    this.ratePro = this.ratePro.bind(this);
    this.moveRatePro = this.moveRatePro.bind(this);
    this.nextButton = this.nextButton.bind(this);
    this.previousButton = this.previousButton.bind(this);
    this.switcher = this.switcher.bind(this);
  };

  componentDidMount(){
    this.setState({
      // 使用播放器本省时使用的参数。
      // playState:this.state.musicList[0],
      // musicTotleNum:this.state.musicList.length
      playState:this.props.musicList[0],
      musicTotleNum:this.props.musicList.length

    })
  };
  UNSAFE_componentWillReceiveProps(nextProps){
    if(this.state.currentNum !== nextProps.nowActive){
      this.setState({
        currentNum:nextProps.nowActive
      },()=>{
        this.switcher();
      })
    }
  };
  componentWillUnmount(){
    this.timer && clearInterval(this.timer)
  };
  render() {
    return (
      <div className="music_main">
        <div className="play_bgPro" onClick={this.ratePro} ref={this.bgProgress}>
          <div className="play_bgPro_bar" style={{width:this.state.proBarWidth}}></div>
        </div>
        <div className="play_control">
          <div className="play_pause">
            <img src={this.state.playStatus?pause:play} alt="pause-play" className={["play_pause_img",this.state.playStatus?"play_pause_img_site":null].join(' ')} onClick={this.playChange} />
          </div>
          <div className="play_previous pushButton" onClick={ this.previousButton }>
            <img src={previous} alt="previous"/>
          </div>
          <div className="play_next pushButton" onClick={ this.nextButton }>
            <img src={next} alt="next"/>
          </div>
          <div className="volume_control">
            <img src={this.state.volumeStatus?volume_open:volume_shut} alt="volume_control" onClick={this.volumeChange} />
            <Progress style={{display:"inline-block",verticalAlign:"middle"}} volumeFn={this.volumeSliding} volumeStatus={this.state.volumeStatus} widthSet={ this.state.volumeSet} />
          </div>

        </div>
        <audio src={this.state.playState.url} ref={this.audioPlayer} onError={this.nextButton}></audio>
      </div>
    )
  };

  playChange(){
    this.setState({
      playStatus:!this.state.playStatus,
    },()=>{
      if(this.state.playStatus){
        this.moveRatePro()
      }else{
        this.timer && clearInterval(this.timer);
        this.audioPlayer.current.pause();
      }
    });   
  };
  moveRatePro(){
    this.timer && clearInterval(this.timer);
    this.props.musicListSelect(this.state.currentNum);
    if(!this.state.playStatus){
      this.setState({
        proBarWidth:0,
        currentTime:0
      });
      return;
    } 
    this.audioPlayer.current.play();
    this.timer=setInterval(()=>{
      if(this.state.currentTime >= this.state.playState.time){
        this.timer && clearInterval(this.timer);
        this.setState({
          currentTime:0
        });
        this.nextButton();
        return false;
      }
      this.setState({
        currentTime:this.audioPlayer.current.currentTime,
        proBarWidth:parseFloat(this.audioPlayer.current.currentTime/this.state.playState.time*this.bgProgress.current.offsetWidth)
      })
    },500)
  };
  nextButton(){
    if(this.state.currentNum >= this.state.musicTotleNum - 1){
      this.setState({
        currentNum:0,
      },()=>{
        this.switcher()
      })
    }else{
      this.setState((proState)=>{
        return{
          currentNum:proState.currentNum + 1,
        }
      },()=>{
        this.switcher();
      })
    }
  };
  previousButton(){
    if(this.state.currentNum === 0){
      this.setState({
        currentNum:this.state.musicTotleNum - 1
      },()=>{
        this.switcher();
      });
    }else{
      this.setState((proState)=>{
        return{
          currentNum:proState.currentNum - 1
        }
      },()=>{
        this.switcher();
      })
    }
  };
  switcher(){
    this.audioPlayer.current.pause();
    this.setState((proState)=>{
      return{
        playState:this.props.musicList[proState.currentNum]
      }
    },()=>{
      this.moveRatePro();
    })
  }

  volumeChange(){
    if(this.state.copyVolumeSet === 0 ) return;
    this.setState({
      volumeStatus:!this.state.volumeStatus,
    },()=>{
      if(this.state.volumeStatus){
        this.audioPlayer.current.volume=this.state.copyVolumeSet;
        this.setState((proState)=>{
          return{
            volumeSet:proState.copyVolumeSet
          }
        })
      }else{
        this.audioPlayer.current.volume=0;
        this.setState({
          volumeSet:0
        })
      }
    });
  };
  volumeSliding(val){
    let volumeNow = parseFloat(val);
    this.audioPlayer.current.volume=volumeNow;
    this.setState({
      volumeSet:volumeNow,
      copyVolumeSet:volumeNow
    });
    if(val===0){
      this.setState({
        volumeStatus:false
      });
    }else{
      this.setState({
        volumeStatus:true
      });
    };
  };
  ratePro(e){
    this.setState({
      proBarWidth:e.nativeEvent.offsetX,
      currentTime:parseFloat(e.nativeEvent.offsetX/e.currentTarget.offsetWidth*this.state.playState.time)
    });
    this.audioPlayer.current.currentTime = parseFloat(e.nativeEvent.offsetX/e.currentTarget.offsetWidth*this.state.playState.time)
  };
}
