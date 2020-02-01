import React, { Component } from "react";
import { Button } from "@material-ui/core";
import { Icon } from "antd";
import { DeleteSlide } from "../../services";

export default class ManagePlaces extends Component {
  render() {
    const { slides } = this.props;
    return (
      <div className="w3-container" style={{ overflowX: "auto" }}>
        {slides && slides.length !== 0 ? (
          <>
            <a href="/manage/slides">
              <h5 className="mt-3">
                <b>
                  <i className="fa fa-list-alt"></i> &nbsp; Manage Slides
                </b>
              </h5>
            </a>
            <table className="table table-striped">
              <thead>
                <tr>
                  <th scope="col">#</th>
                  <th scope="col">Slide</th>
                  <th scope="col">Caption</th>
                  <th scope="col">Link</th>
                  <th scope="col">Status</th>
                  <th scope="col">Actions</th>
                </tr>
              </thead>
              <tbody>
                {slides.map((slide, index) => (
                  <tr key={index}>
                    <th scope="row" style={{ width: 25 }}>
                      {index + 1}
                    </th>
                    <td style={{ width: 70 }}>
                      <img
                        key={slide.id}
                        alt={slide.caption}
                        height="40"
                        width="60"
                        src={
                          `${process.env.REACT_APP_IMAGEURL}/slider_images/` +
                          slide.slides
                        }
                      />
                    </td>
                    <td>{slide.caption}</td>
                    <td>
                      <a
                        href={slide.link}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        {slide.link}
                      </a>
                    </td>
                    <td>{slide.status}</td>
                    <td className="actions">
                      <Button
                        variant="contained"
                        color="default"
                        onClick={() =>
                          (document.location.href = `/slide/${slide.id}`)
                        }
                      >
                        <Icon type="eye" />
                      </Button>
                      <Button
                        variant="contained"
                        color="primary"
                        onClick={() =>
                          (document.location.href = `/edit/slide/${slide.id}`)
                        }
                      >
                        <Icon type="edit" />
                      </Button>
                      <Button
                        variant="contained"
                        color="secondary"
                        onClick={() => {
                          DeleteSlide(slide.id, "/manage/slides");
                        }}
                      >
                        <Icon type="delete" />
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            <hr />
            <p>You can also add new slides by clicking the button below.</p>
            <Button
              variant="outlined"
              onClick={() => (document.location.href = "/add/sliders")}
            >
              Add New Slide
            </Button>
            <hr />
          </>
        ) : (
          <>
            <hr />
            <h5 className="mt-3">
              <b>
                <i className="fa fa-landmark"></i> &nbsp; Manage Slides
              </b>
            </h5>
            <h3 className="text-dark">No slides were found on the database.</h3>
            <Button
              variant="outlined"
              onClick={() => (document.location.href = "/add/slides")}
            >
              Add New Slides
            </Button>
            <hr />
          </>
        )}
      </div>
    );
  }
}
