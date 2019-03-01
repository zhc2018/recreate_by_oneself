import React, { Component } from 'react';

export default class Progress extends Component {
  constructor(props){
    super(props);
    this.state={
			dotDrag:false,
			movseFlagX:0,
			objLeft:0,
			
		};
		this.controlBr = React.createRef();
		this.barChange = this.barChange.bind(this);
		this.dotMouseStart = this.dotMouseStart.bind(this);
		this.dragDot = this.dragDot.bind(this);
		this.dotStop = this.dotStop.bind(this);
	};

  render() {
    return (
      <div className="progress_box" style={this.props.style} ref={this.controlBr} onClick={this.barChange}>
				<div className="progress_bar" style={{width:(this.props.widthSet*100)+'%'}}>
					<span className="progress_bar_dot" style={{left:(this.props.widthSet*100)+'%'}} onMouseDown={this.dotMouseStart} onMouseUp={this.dotStop} onMouseMove={this.dragDot} onMouseLeave={this.dotStop}></span>
				</div>
      </div>
    )
  };
	barChange(e){
		if(e.target.tagName==='SPAN')return;
		this.props.volumeFn(e.nativeEvent.offsetX/e.currentTarget.offsetWidth)
	};
	dotMouseStart(e){
		e.stopPropagation();
		this.setState({
			dotDrag:!this.state.dotDrag,
			movseFlagX:e.clientX,  	// 标记点
			objLeft:this.controlBr.current.offsetWidth*parseFloat(this.props.widthSet),
		})
	};
	dragDot(e){
		// e.stopPropagation();
		if(this.state.dotDrag){
			var moveX = e.clientX-this.state.movseFlagX+this.state.objLeft;  // 鼠标移动时候的距离屏幕X的位置，减去鼠标点击时候记录的鼠标点距离屏幕X的位置加上，点击位置dot的left偏移量；即是此刻dot的left偏移量；
			let leftPercent = moveX/this.controlBr.current.offsetWidth;
		
			if(leftPercent>=1){
				leftPercent=1;
			}else if(leftPercent<=0){
				leftPercent=0;
			};
			this.props.volumeFn(leftPercent);
		};
	};
	dotStop(e){
		this.setState({
			dotDrag:false
		})
	}

}
