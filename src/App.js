import React from 'react';
import headerbg from './assets/header.png';
import './App.css';
import { useDrag } from 'react-use-gesture';

function App() {
  return (
      <div className="App">
        <InfoHeader/>
    </div>
  );
}



class InfoHeader extends React.Component {

    pages = ['indoor', 'outdoor', 'status']
    titles = ['Gewächshaus', 'Draußen', 'Status']

    constructor() {
        super();
        //Set State
        this.state = {
            hamburgerOpactiy: 0.9,
            page: 0,
        };

    }

    render() {

        const bridge = () => {
            return this;
        }

        function ScrollOverlay() {
            const bind = useDrag(state=>{
                const {
                    swipe
                } = state;
                if(swipe[0]===-1) {
                    let fakethis = bridge();
                    let num = fakethis.state.page+1;
                    if(num>fakethis.pages.length - 1) {
                        num=0;
                    }
                    fakethis.setState({page:num});
                } else if (swipe[0]===1) {
                    let fakethis = bridge();
                    let num = fakethis.state.page-1;
                    if(num < 0) {
                        num = 2;
                    }
                    fakethis.setState({page:num});
                }
            });

            return (
                <div style={{
                    width: '100%',
                    height: '100%'}} {...bind()}></div>);
        }

        //Refresh Styles
        this.styles= {
        hamburgerBar: {
        width: '5vw',
        height: '0.7vh',
        backgroundColor: '#ffffff',
        opacity:this.state.hamburgerOpacity,
        position: 'relative',
        display:'block',
        borderRadius: '25px 0 25px 0',
            transition: 'opacity .3s'
        },
            indicatorCircle: {
                borderRadius:'50px',
                backgroundColor:'#fff',
                margin: '1vw',
                transition: 'width .2s, height .2s'
            }
        };


        const getHeaderColor = () => {
            switch (this.state.page) {
            case 0:
                return 0;
            case 1:
                return 90;
            case 2:
                return 230;
            default:
                return 180;
            }
        };


        return (
            <div style={{
                overflow: 'hidden'
            }}>

              <header style={{
                  height: '50vh',
                  width: 'calc(100vw + 2px)',
                  position: 'absolute',
                  top: 0,
                  left: -2
              }}>

                {/*Scroll enabling overlay*/}
            <ScrollOverlay/>

            {/*Top COntainer*/}
                <div style={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    height: 'calc(4vw + 4.5vh)'
                }}>
                  {/*Hamburger menu for more control*/}
                  <div style={{
                      position: 'absolute',
                      top:0,
                      left:0,
                      padding: '2vw',
                      zIndex:55,
                      display:'grid',
                      gridTemplateRows:'repeat(3, 1.5vh)',
                      jusitfyContent: 'center',
                      alignItems:'center'
                  }}
                       onMouseEnter={
                           ()=>{
                               this.setState({hamburgerOpacity:0.6});
                           }}
                       onMouseLeave={()=>{this.setState({hamburgerOpacity:0.9});}}>
                    <i style={this.styles.hamburgerBar}></i>
                    <i style={this.styles.hamburgerBar}></i>
                    <i style={this.styles.hamburgerBar}></i>
                  </div>
                  
                  {/*Page Title*/}
                  <div style={{
                      color: '#fff',
                      fontFamily: 'monospace',
                      fontSize:'200%',
                      zIndex: 56,
                      marginLeft: '10vw'
                  }}>
                    {this.titles[this.state.page]}
                  </div>
                </div>

                {/*Page Indicator*/}
                <div style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    position: 'absolute',
                    left: 0,
                    bottom: 0,
                    margin: '1vw',
                    height: '3vw'
                }}>
                  <div style={
                      Object.assign(
                          {width:(this.state.page===0)?'2vw':'1vw',
                           height:(this.state.page===0)?'2vw':'1vw'},
                          this.styles.indicatorCircle
                      )}></div>
                  <div style={
                      Object.assign(
                          {width:(this.state.page===1)?'2vw':'1vw',
                           height:(this.state.page===1)?'2vw':'1vw'},
                          this.styles.indicatorCircle
                      )}></div>
                  <div style={
                      Object.assign(
                          {width:(this.state.page===2)?'2vw':'1vw',
                           height:(this.state.page===2)?'2vw':'1vw'},
                          this.styles.indicatorCircle
                      )}></div>

                </div>

                {/*Header Background as background: url() doesn't scale*/}
                <img src={headerbg} width="100%" height="100%" alt="header" style={{
                    top:0,
                    left:0,
                    zIndex:-1,
                    position: 'absolute',
                    transition: 'filter 1s',
                    filter:`drop-shadow(0px 0px 2px rgba(21, 21, 21, 0.2)) hue-rotate(${getHeaderColor()}deg)`
                }}/>
              </header>
            </div>
        );
    }
}

export default App;
