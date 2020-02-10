import React, { Component } from "react";
import { Helmet } from "react-helmet";
import {
  GetCityById,
  CircularLoader,
  GetUser,
  GetAllUsers,
  CommentFunction,
  CommentFunctionEdit,
  RatingFunction,
  RatingFunctionEdit,
  DeleteComment,
  GetCityByIdUid
} from "../services";
import "../assets/css/cityDetails.css";
import { Paper, Button } from "@material-ui/core";
import { Form, Input, Tooltip, Popover, Modal, Tag } from "antd";
import moment from "moment";
import CommentForm from "./CommentForm";
import Ratings from "./Ratings";
import * as opencage from "opencage-api-client";
import Weather from "./Weather";

export default class CityDetails extends Component {
  constructor(props) {
    super(props);
    this.state = {
      cities: {},
      comments: [],
      ratings: {},
      isLoading: true,
      comment: "",
      cmntError: "",
      cmntStatus: null,
      userID: null,
      allUsers: [],
      userImages: [],
      showPopover: {},
      editComment: {},
      deleteComment: {},
      showMoreCmnt: false,
      map: null,
      ID: this.props.match.params.id
    };
  }
  UNSAFE_componentWillMount() {
    const cityID = this.state.ID;

    GetCityById(cityID).then(res => {
      this.setState({
        cities: res,
        comments: res.commentByCityId,
        isLoading: false
      });
      this.getMap(`${res.cityById.city_name}, ${res.cityById.country}`);
    });

    GetAllUsers().then(res => {
      this.setState({
        allUsers: res.data.users,
        userImages: res.data.userImages
      });
    });

    if (sessionStorage.token || localStorage.token) {
      GetUser().then(res => {
        this.setState({
          userID: res.data.user.id
        });
        GetCityByIdUid(this.props.match.params.id, res.data.user.id).then(res => {
          this.setState({
            ratings: res.rate_uid[0]
          });
        });
      });
    }
  }

  onCommentChange = e => {
    this.setState({
      [e.target.name]: e.target.value
    });
  };

  submitComment = e => {
    e.preventDefault();
    const { ID, userID, comment } = this.state;
    const commentData = {
      comment: comment
    };
    CommentFunction(ID, userID, commentData, `/city/${ID}`).catch(err =>
      this.setState({
        cmntStatus: true,
        cmntError: err.response.data.errors.comment
      })
    );
  };

  editComment = e => {
    e.preventDefault();
    const { ID, userID, comment } = this.state;
    const commentData = {
      comment: comment
    };
    CommentFunctionEdit(e.target.id, userID, commentData, `/city/${ID}`).catch(
      err =>
        this.setState({
          editCmntStatus: true,
          editCmntError: err.response.data.errors.comment
        })
    );
  };

  submitRating = value => {
    const { ID, userID } = this.state;
    const ratingData = {
      rating: value
    };

    RatingFunction(ID, userID, ratingData, `/city/${ID}`).catch(err =>
      console.log(err.response)
    );
  };

  editRating = (value, rateID) => {
    const { ID, userID } = this.state;
    const ratingData = {
      rating: value
    };

    RatingFunctionEdit(rateID, userID, ratingData, `/city/${ID}`).catch(err =>
      console.log(err.response)
    );
  };

  showEditModal = (id, del) => {
    this.setState(prevState => ({
      editComment: {
        ...prevState.editComment,
        [id]: !prevState.editComment[id]
      }
    }));

    this.setState(prevState => ({
      deleteComment: {
        ...prevState.deleteComment,
        [del]: !prevState.deleteComment[del]
      }
    }));
  };
  showPopOver = id => {
    this.setState(prevState => ({
      showPopover: {
        ...prevState.showPopover,
        [id]: !prevState.showPopover[id]
      }
    }));
  };
  getMap = query => {
    opencage
      .geocode({ key: process.env.REACT_APP_MAP_API, q: query })
      .then(map => {
        this.setState({ map: map.results[0].geometry });
      });
  };

  render() {
    const {
      ID,
      userID,
      cities,
      comments,
      isLoading,
      userImages,
      allUsers,
      cmntError,
      cmntStatus,
      editCmntError,
      editCmntStatus,
      editComment,
      showPopover,
      ratings,
      showMoreCmnt,
      deleteComment,
      map
    } = this.state;

    const auth = localStorage.token || sessionStorage.token;

    let slicedComments = comments;

    if (!showMoreCmnt) slicedComments = comments.slice(0, 4);

    return (
      <div className="city-details-wrapper">
        {isLoading
          ? CircularLoader(isLoading)
          : cities !== {} && (
              <>
                <Helmet>
                  <title>{`${cities.cityById.city_name} - Everything you need to know about ${cities.cityById.city_name} | VisitNepal`}</title>
                </Helmet>
                <div className="MuiPaper-root text-left bg-dark text-light p-2">
                  <div
                    className="container-fluid clearfix"
                    style={{ fontSize: 18 }}
                  >
                    <span className="float-left">
                      {cities.cityById.city_name} Travel
                    </span>
                    <span className="float-right" style={{ fontSize: 15 }}>
                      <a className="text-light" href="/">
                        Home
                      </a>{" "}
                      /{" "}
                      <a className="text-light" href="/cities">
                        Cities
                      </a>{" "}
                      /{" "}
                      <span className="text-warning">
                        {cities.cityById.city_name}
                      </span>
                    </span>
                  </div>
                </div>
                <div
                  className="city-bg"
                  style={{
                    backgroundImage: `url(${
                      process.env.REACT_APP_IMAGEURL
                    }/cover_images/${cities.cityImageByCityId.map(
                      (image, index) => index === 0 && image.cover_image
                    )})`
                  }}
                >
                  <div className="city-bg-overlay"></div>
                  <div className="city-bg-detail">
                    <span>{cities.cityById.city_name} Travel Guide</span>
                  </div>
                  <div className="ratings-reviews">
                    <div className="ratings">
                      <i className="fa fa-star"></i>&nbsp;&nbsp;
                      {cities.rating_count > 0 ? (
                        <span>
                          {Number(cities.avg_rating).toFixed(1)} / 5 &nbsp;
                          <sub>({cities.rating_count} votes)</sub>
                        </span>
                      ) : (
                        <span>No ratings</span>
                      )}
                    </div>
                    <div
                      className="reviews"
                      onClick={() => (document.location = `${ID}#reviews`)}
                    >
                      <i className="fa fa-comment text-light"></i>&nbsp;&nbsp;
                      {comments.length !== 0 ? (
                        <span className="text-light">
                          {comments.length} &nbsp;
                          {comments.length === 1 ? "Review" : "Reviews"}
                        </span>
                      ) : (
                        <span className="text-light">No reviews</span>
                      )}
                    </div>
                  </div>
                </div>
                <div className="container my-3">
                  <Paper
                    elevation={1}
                    style={{
                      textOverflow: "ellipsis",
                      overflow: "hidden",
                      wordBreak: "break-all"
                    }}
                    className="p-2 px-4"
                  >
                    <span className="d-block my-3">
                      <h3>Overview</h3>
                      {cities.cityById.category
                        .split(", ")
                        .map((category, index) => (
                          <Tag key={index}><a href={`/city/category/${category}`}>{category}</a></Tag>
                        ))}
                    </span>
                    <div className="row mb-3">
                      <div className="col-md-12">
                        <p className="cities-description">
                          {cities.cityById.description}
                        </p>
                      </div>
                    </div>
                  </Paper>
                  <div className="row mb-3">
                    <div className="col-lg-7 col-xl-8 mt-3" id="reviews">
                      <Paper
                        elevation={1}
                        style={{
                          textOverflow: "ellipsis",
                          overflow: "hidden",
                          wordBreak: "break-all"
                        }}
                        className="p-2 px-4"
                      >
                        <h3 className="my-3">Reviews</h3>
                        <div className="row">
                          {comments && comments.length !== 0 ? (
                            slicedComments.map(comment => {
                              return (
                                <Paper
                                  className={`col-md-12 py-1 comment-section mt-2`}
                                  key={comment.id}
                                  style={{
                                    letterSpacing: 1
                                  }}
                                  elevation={0}
                                >
                                  <div className="d-flex align-items-top comment-container">
                                    {userImages
                                      .filter(
                                        userImage =>
                                          userImage.user_id === comment.user_id
                                      )
                                      .sort((itemA, itemB) =>
                                        itemA.created_at < itemB.created_at
                                          ? 1
                                          : -1
                                      )
                                      .map((image, index) => {
                                        return (
                                          index === 0 && (
                                            <img
                                              className="user-image-comment"
                                              src={
                                                `${process.env.REACT_APP_IMAGEURL}/profile_images/` +
                                                image.profile_image
                                              }
                                              alt={image.profile_image}
                                              key={index}
                                            />
                                          )
                                        );
                                      })}
                                    <span className="ml-3">
                                      <span
                                        style={{ fontSize: 14 }}
                                        className="text-capitalize"
                                      >
                                        {allUsers
                                          .filter(
                                            allUser =>
                                              allUser.id === comment.user_id
                                          )
                                          .map((user, index) => {
                                            return (
                                              <span key={index}>
                                                <a
                                                  href={`/${user.username}-${comment.user_id}`}
                                                >
                                                  {user.username}{" "}
                                                </a>
                                                <small className="text-lowercase">
                                                  {moment
                                                    .utc(comment.created_at)
                                                    .fromNow()}
                                                </small>
                                                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                                                {userID === comment.user_id ? (
                                                  <Popover
                                                    content={
                                                      <span className="comment-option">
                                                        <span
                                                          onClick={() =>
                                                            this.showEditModal(
                                                              comment.id,
                                                              0
                                                            )
                                                          }
                                                        >
                                                          <i className="fa fa-edit"></i>{" "}
                                                          &nbsp; Edit....
                                                        </span>{" "}
                                                        <br />
                                                        <span
                                                          onClick={() =>
                                                            this.showEditModal(
                                                              0,
                                                              comment.id
                                                            )
                                                          }
                                                        >
                                                          <i className="fa fa-trash"></i>{" "}
                                                          &nbsp; Delete....
                                                        </span>
                                                      </span>
                                                    }
                                                    trigger="click"
                                                    visible={
                                                      !showPopover[comment.id]
                                                        ? false
                                                        : true
                                                    }
                                                    onVisibleChange={() =>
                                                      this.showPopOver(
                                                        comment.id
                                                      )
                                                    }
                                                  >
                                                    <Tooltip
                                                      placement="top"
                                                      title={
                                                        "Edit or Delete this comment."
                                                      }
                                                    >
                                                      <i className="fa fa-ellipsis-h"></i>
                                                    </Tooltip>
                                                  </Popover>
                                                ) : (
                                                  ""
                                                )}
                                              </span>
                                            );
                                          })}
                                      </span>
                                      <br />
                                      {comment.comment}
                                    </span>
                                  </div>
                                  <Modal
                                    className="edit-comment-modal"
                                    title={
                                      <b style={{ fontSize: 18 }}>
                                        Edit Comment
                                      </b>
                                    }
                                    visible={
                                      !editComment[comment.id] ? false : true
                                    }
                                    footer={null}
                                    onCancel={() =>
                                      this.showEditModal(comment.id)
                                    }
                                  >
                                    <Form
                                      id={comment.id}
                                      onSubmit={this.editComment}
                                      className="col-md-12"
                                    >
                                      <Form.Item
                                        validateStatus={
                                          editCmntStatus ? "error" : ""
                                        }
                                        help={
                                          editCmntStatus ? editCmntError : ""
                                        }
                                        hasFeedback
                                      >
                                        <Input.TextArea
                                          placeholder="Write a review......"
                                          type="text"
                                          name="comment"
                                          onChange={this.onCommentChange}
                                          defaultValue={comment.comment}
                                          size="large"
                                        />
                                      </Form.Item>
                                      <Form.Item className="my-3 clearfix">
                                        <Button
                                          type="submit"
                                          variant="contained"
                                          color="secondary"
                                          className="float-right"
                                        >
                                          <i className="fa fa-edit"></i> &nbsp;
                                          Edit
                                        </Button>
                                        <Button
                                          className="mr-2 float-right"
                                          variant="outlined"
                                          onClick={() =>
                                            this.showEditModal(comment.id)
                                          }
                                        >
                                          <i className="fa fa-times"></i> &nbsp;
                                          Cancel
                                        </Button>
                                      </Form.Item>
                                    </Form>
                                  </Modal>
                                  <Modal
                                    className="delete-comment-modal"
                                    title={
                                      <b style={{ fontSize: 18 }}>
                                        Delete Comment
                                      </b>
                                    }
                                    visible={
                                      !deleteComment[comment.id] ? false : true
                                    }
                                    footer={null}
                                    onCancel={() =>
                                      this.showEditModal(0, comment.id)
                                    }
                                  >
                                    Are you sure, you want to delete this
                                    comment?{" "}
                                    <div className="clearfix mt-2">
                                      <Button
                                        variant="contained"
                                        className="float-right bg-danger text-light"
                                        onClick={() =>
                                          DeleteComment(
                                            comment.id,
                                            userID,
                                            `/city/${ID}`
                                          )
                                        }
                                      >
                                        <i className="fa fa-trash"></i> &nbsp;
                                        Delete
                                      </Button>
                                      <Button
                                        className="mr-2 float-right"
                                        variant="outlined"
                                        onClick={() =>
                                          this.showEditModal(0, comment.id)
                                        }
                                      >
                                        <i className="fa fa-times"></i> &nbsp;
                                        Cancel
                                      </Button>
                                    </div>
                                  </Modal>
                                </Paper>
                              );
                            })
                          ) : (
                            <span className="mx-3" style={{ fontSize: 20 }}>
                              No Reviews posted yet.
                              <br />
                              {localStorage.token || sessionStorage.token ? (
                                <small>Post a review.</small>
                              ) : (
                                <small>Login to post a review.</small>
                              )}
                            </span>
                          )}
                          {auth && (
                            <CommentForm
                              name="comment"
                              onChange={this.onCommentChange}
                              onSubmit={this.submitComment}
                              validateStatus={cmntStatus ? "error" : ""}
                              help={cmntStatus ? cmntError : ""}
                            />
                          )}
                          {comments.length > 4 ? (
                            <Button
                              fullWidth
                              color="primary"
                              variant="contained"
                              onClick={() =>
                                this.setState({
                                  showMoreCmnt: !showMoreCmnt
                                })
                              }
                              className="mt-2"
                            >
                              {showMoreCmnt ? (
                                <span>
                                  Show Less Reviews &nbsp;{" "}
                                  <i className="fa fa-angle-up"></i>
                                </span>
                              ) : (
                                <span>
                                  Show More Reviews &nbsp;{" "}
                                  <i className="fa fa-angle-down"></i>
                                </span>
                              )}
                            </Button>
                          ) : (
                            ""
                          )}
                        </div>
                      </Paper>
                    </div>
                    <div className="col-lg-5 col-xl-4 mt-3">
                      <Ratings
                        ratings={ratings}
                        cities={cities}
                        onChange={this.submitRating}
                        onEditChange={this.editRating}
                      />
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-md-12 map">
                      {map && (
                        <iframe
                          title="map"
                          src={`https://maps.google.com/maps?q=${map.lat},${map.lng}&z=10&output=embed`}
                          width="100%"
                          height="300px"
                          frameBorder="0"
                          style={{ border: 0 }}
                          allowFullScreen
                        ></iframe>
                      )}
                    </div>
                    <div className="col-md-12 weather mt-3">
                      {map && <Weather lat={map.lat} lon={map.lng} />}
                    </div>
                  </div>
                </div>
              </>
            )}
      </div>
    );
  }
}
