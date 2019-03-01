import React, { Component } from 'react';
import pop from '../img/pop.svg';
import pop1 from '../img/pop1.svg';
// import logo from '../img/logo.svg';

export default class FirstPage extends Component {
  render() {
    return (
      <div className="everyPage_content one_page">

        <div className="one_page_box">
          <header className="one_page_head">
            <h2>短暂的回忆</h2>
          </header>
          <div className="one_page_center">
            <section className="one_page_section">
              <aside className="one_page_aside">
              <div style={{ textAlign:"center",marginLeft:"-120px"}}>
                  <img src={pop1} alt="pop" className="pop_animation" style={{width:"80px", height:"80px"}} />
                </div>
                <p>你看到的就是简单的</p>
                <p>换句话说这个人太懒</p>
                <p>再多的语言都是借口</p>
                <div style={{ }}>
                  <img src={pop} alt="pop" className="pop_animation" />
                </div>
              </aside>
              <article className={this.props.itemIndex===0 ? "one_page_article_enter":"one_page_article_exit"}>
                <p>十年里，明白了最好的你</p>
                <p>沉默中，最终失去了自己</p>
                <div style={{}} >
                  <img src={pop} alt="pop" className="pop_animation_left"/>
                </div>
              </article>
            </section>
          </div>
          <footer className="one_page_footer">
            现在，这里什么也没有了 
          </footer>
        </div>
        
      </div>
    )
  }
}
