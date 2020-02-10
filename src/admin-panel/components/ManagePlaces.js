import React, { Component } from "react";
import { Button } from "@material-ui/core";
import { Icon, Tag } from "antd";
import { DeleteCity, DeleteImage, DeleteAllComment } from "../../services";

export default class ManagePlaces extends Component {
  render() {
    const { cities, citiesImages } = this.props;
    return (
      <div className="w3-container" style={{ overflowX: "auto" }}>
        {cities && cities.length !== 0 ? (
          <>
            <a href="/manage/places">
              <h5 className="mt-3">
                <b>
                  <i className="fa fa-landmark"></i> &nbsp; Manage Places
                </b>
              </h5>
            </a>
            <table className="table table-striped table-responsive-lg">
              <thead>
                <tr>
                  <th scope="col">#</th>
                  <th scope="col">Cover</th>
                  <th scope="col">Place</th>
                  <th scope="col">City</th>
                  <th scope="col">Category</th>
                  <th scope="col">Description</th>
                  <th scope="col">Views</th>
                  <th scope="col">Ratings</th>
                  <th scope="col">Reviews</th>
                  <th scope="col">Actions</th>
                </tr>
              </thead>
              <tbody>
                {cities.map((city, index) => (
                  <tr key={index}>
                    <th scope="row" style={{ width: 25 }}>
                      {index + 1}
                    </th>
                    <td style={{ width: 70 }}>
                      {citiesImages.map(
                        cityImage =>
                          cityImage.city_id === city.id && (
                            <img
                              key={cityImage.id}
                              alt={city.place}
                              height="50"
                              width="70"
                              src={
                                `${process.env.REACT_APP_IMAGEURL}/cover_images/` +
                                cityImage.cover_image
                              }
                            />
                          )
                      )}
                    </td>
                    <td>{city.place}</td>
                    <td>{city.city_name}</td>
                    <td>
                      {city.category.split(", ").map((category, index) => (
                        <Tag key={index} className="mt-1">
                          {category}
                        </Tag>
                      ))}
                    </td>
                    <td className="manage-description">{city.description}</td>
                    <td>{city.visit_count}</td>
                    <td>{city.rating_count}</td>
                    <td>{city.comment_count}</td>
                    <td className="actions">
                      <span className="d-block">
                        <Button
                          variant="contained"
                          color="default"
                          onClick={() =>
                            (document.location.href = `/city/${city.id}`)
                          }
                        >
                          <Icon type="eye" />
                        </Button>
                      </span>
                      <span className="d-block">
                        <Button
                          variant="contained"
                          color="primary"
                          onClick={() =>
                            (document.location.href = `/edit/place/${city.id}`)
                          }
                        >
                          <Icon type="edit" />
                        </Button>
                      </span>
                      <span className="d-block">
                        <Button
                          variant="contained"
                          color="secondary"
                          onClick={() => {
                            DeleteAllComment(city.id);
                            DeleteImage(
                              citiesImages.map(
                                cityImage =>
                                  cityImage.city_id === city.id && cityImage.id
                              )
                            );
                            DeleteCity(city.id, "/manage/places");
                          }}
                        >
                          <Icon type="delete" />
                        </Button>
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            <hr />
            <p>You can also add new places by clicking the button below.</p>
            <Button
              variant="outlined"
              onClick={() => (document.location.href = "/add/places")}
            >
              Add New Places
            </Button>
            <hr />
          </>
        ) : (
          <>
            <hr />
            <h5 className="mt-3">
              <b>
                <i className="fa fa-landmark"></i> &nbsp; Manage Places
              </b>
            </h5>
            <h3 className="text-dark">No places were found on the database.</h3>
            <Button
              variant="outlined"
              onClick={() => (document.location.href = "/add/places")}
            >
              Add New Places
            </Button>
            <hr />
          </>
        )}
      </div>
    );
  }
}
