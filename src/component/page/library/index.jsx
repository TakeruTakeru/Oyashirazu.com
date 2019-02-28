import React, { Component } from "react";
import { Carousel } from "antd";
import "ag-grid-community/dist/styles/ag-grid.css";
import "ag-grid-community/dist/styles/ag-theme-balham.css";


//low level layer. base image component.
const ImageComponent = ({image, onClick}) => {
    return (
    <div className="none">
        <img className="image" src={image} onClick={onClick} />
    </div>
    )
}

//impliments WrappingImage component.
const ImageList = props => {
    return (
        <div className="image-wrapper">
            {props.imageList.map( image => {
                return <ImageComponent key={image} image={image} />
            })}
        </div>
    )
}

//impliments WrappingImage component.
const CarouselDemo = ({imageList, onClick}) => {
    return (
        <Carousel effect="fade" autoplay={true}>
            {imageList.map(image =>{
                return <ImageComponent key={image} image={image} onClick={onClick} />
            })}
        </Carousel>
    )
}

//args 'Ex' is a SFC. you can use this as a Interface of images.
//as coding like this, you can switch component flexibly.
const WrappingImage = Ex => {
    return ({imageList, onClick}) => {
        return <div>{Ex({imageList, onClick})}</div>
    }
}




export default class CarouselComponent extends Component {

    constructor(props) {
        super(props);
        this.state = {
            files: [],
        };
    }

    handleFileChange = e => {
        const { files } = this.state;
        e.preventDefault();
        const file = window.URL.createObjectURL(e.target.files[0]);
        file && files.push(file);
        this.setState({
            files: files,
        })
    }

    sysOut = e => {
        // console.log(e.target)
        return;
    }

  render() {

    const {files} = this.state;
    console.log(process.env.REACT_APP_F)
    const Wrap = WrappingImage(CarouselDemo)

    return (
      <div>
          <input type="file" onChange={this.handleFileChange}></input>
            <Wrap imageList={files} onClick={this.sysOut}></Wrap>
      </div>
    );
  }
}

//this is simple sfc component

//'Root' doesn't need to know children component.
//this makes it possible to accomplish one way data flow
const Root = props => {
    console.log(props)
    return <h3>{props.children}</h3>
}

const AllHoge = props => {
    return <div>
        <Root>
            <Hoge_1></Hoge_1>
            <Hoge_2></Hoge_2>
            <Hoge_3></Hoge_3>
        </Root>
    </div>
}

const Hoge_1 = props => {
    return <i>hello sfc</i>
}

const Hoge_2 = props => {
    return <i>hogehoge</i>
}

const Hoge_3 = props => {
    return <i>this is test.</i>
}