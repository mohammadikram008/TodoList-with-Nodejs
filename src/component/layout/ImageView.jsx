import React, { Fragment, useState } from "react";
import "../css/image.css";

import {
  Card,
  CardBody,
  CardTitle,
  CardText,
  CardImg,
  CardImgOverlay,
  CardSubtitle,
  Button,
} from "reactstrap";
import Navbar from "./Navbar";
const ImageView = () => {
  const [file, setFile] = useState();
  function handleChangeimage(e) {
    console.log(e.target.files);
    setFile(URL.createObjectURL(e.target.files[0]));
  }
  return (
    <Fragment>
      <Navbar />
      <div className="main-imageview">
        <input type="file" onChange={handleChangeimage} />
        <div className="img">
          {/* <div className="sample-img">
            <img className="image" src={file} />
          </div> */}
          <div>
            <Card
              style={{
                width: "18rem",
              }}
            >
              <img src={file} />
              <CardBody>
                <CardTitle tag="h5">Card title</CardTitle>
                <CardSubtitle className="mb-2 text-muted" tag="h6">
                  Card subtitle
                </CardSubtitle>
                <CardText>
                  Some quick example text to build on the card title and make up
                  the bulk of the card‘s content.
                </CardText>
                <Button>Button</Button>
              </CardBody>
            </Card>
          </div>

          <div>
            <img src={file} className="circle-image" />
          </div>
          <div>
            <img src={file} className="reactangle-image" />
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default ImageView;
