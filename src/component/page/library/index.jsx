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
        return;
    }

  render() {

    const {files} = this.state;
    const Wrap = WrappingImage(CarouselDemo)

    return (
      <div>
          <input type="file" onChange={this.handleFileChange}></input>
            <Wrap imageList={files} onClick={this.sysOut}></Wrap>
      </div>
    );
  }
}