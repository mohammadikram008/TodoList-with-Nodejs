import React, { Fragment, useState } from "react";
import "./css/image.css";
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
const ImageView = () => {
  const [file, setFile] = useState();
  function handleChangeimage(e) {
    console.log(e.target.files);
    setFile(URL.createObjectURL(e.target.files[0]));
  }
  return (
    <Fragment>
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
            <Card className="my-2">
              <CardBody>
                <CardTitle tag="h5">Card Title</CardTitle>
                <CardText>
                  This is a wider card with supporting text below as a natural
                  lead-in to additional content. This content is a little bit
                  longer.
                </CardText>
                <CardText>
                  <small className="text-muted">Last updated 3 mins ago</small>
                </CardText>
              </CardBody>
              <CardImg
                bottom
                src={file}
                style={{
                  height: 180,
                }}
                width="100%"
              />
            </Card>
          </div>
          <div>
            <Card inverse>
              <CardImg
                src={file}
                style={{
                  height: 270,
                }}
                width="100%"
              />
              <CardImgOverlay>
                <CardTitle tag="h5">Card Title</CardTitle>
                <CardText>
                  This is a wider card with supporting text below as a natural
                  lead-in to additional content. This content is a little bit
                  longer.
                </CardText>
                <CardText>
                  <small className="text-muted">Last updated 3 mins ago</small>
                </CardText>
              </CardImgOverlay>
            </Card>
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default ImageView;
