import React, { Component } from "react";
import { Helmet } from "react-helmet";
import {
  GetCityById,
  GetCategoryByCityId,
  GetImageByCityId,
  GetAvgRatingByCityId,
  GetCommentByCityId,
  GetRatingByCityId,
  CircularLoader,
  GetUser,
  GetAllUserImages,
  GetAllUsers,
  CommentFunction,
  CommentFunctionEdit,
  RatingFunction,
  RatingFunctionEdit,
} from "../services";
import "../assets/css/cityDetails.css";
import {
  Paper,
  ExpansionPanel,
  ExpansionPanelSummary,
  ExpansionPanelDetails,
  Button,
} from "@material-ui/core";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import { Form, Icon, Input, Tooltip, Popover, Modal } from "antd";

export default class CityDetails extends Component {
  constructor(props) {
    super(props);
    this.state = {
      cities: {},
      categories: [],
      comments: [],
      images: "",
      rating: [],
      ratingLength: null,
      isLoading: true,
      comment: "",
      cmntError: "",
      cmntStatus: null,
      userID: null,
      allUsers: [],
      userImages: [],
      showPopover: {},
      editComment: {},
      isEditComment: false,
      rate: null,
      showMoreCmnt: false,
      ID: this.props.match.params.id,
    };
  }
  componentDidMount() {
    const cityID = this.state.ID;

    GetCityById(cityID).then(res => {
      this.setState({ cities: res, isLoading: false });
    });
    GetCategoryByCityId(cityID).then(res => {
      this.setState({ categories: res });
    });
    GetImageByCityId(cityID).then(res => {
      this.setState({
        images: res.map(image => image.cover_image),
      });
    });
    GetRatingByCityId(cityID).then(res => {
      this.setState({
        ratingLength: res.length,
      });
    });
    GetAvgRatingByCityId(cityID).then(res => {
      this.setState({
        rating: res,
      });
    });
    GetCommentByCityId(cityID).then(res => {
      this.setState({
        comments: res,
      });
    });
    GetAllUserImages().then(res =>
      this.setState({
        userImages: res.data,
      })
    );
    if (sessionStorage.token || localStorage.token) {
      GetUser().then(res =>
        this.setState({
          userID: res.data.user.id,
        })
      );
    }
    GetAllUsers().then(res =>
      this.setState({
        allUsers: res.data,
      })
    );
  }

  onCommentChange = e => {
    this.setState({
      [e.target.name]: e.target.value,
    });
  };

  submitComment = e => {
    e.preventDefault();
    const { ID, userID, comment } = this.state;
    const commentData = {
      comment: comment,
    };
    CommentFunction(ID, userID, commentData, `/city/${ID}`).catch(err =>
      this.setState({
        cmntStatus: true,
        cmntError: err.response.data.errors.comment,
      })
    );
  };

  editComment = e => {
    e.preventDefault();
    const { ID, userID, comment } = this.state;
    const commentData = {
      comment: comment,
    };
    CommentFunctionEdit(e.target.id, userID, commentData, `/city/${ID}`).catch(
      err =>
        this.setState({
          editCmntStatus: true,
          editCmntError: err.response.data.errors.comment,
        })
    );
  };

  submitRating = e => {
    e.preventDefault();
    const { ID, userID, rate } = this.state;
    const ratingData = {
      rate: rate,
    };

    RatingFunction(ID, userID, ratingData, `/city/${ID}`).catch(err =>
      console.log(err.response)
    );
  };

  editRating = e => {
    e.preventDefault();
    const { ID, userID, rate } = this.state;
    const ratingData = {
      rate: rate,
    };

    RatingFunctionEdit(
      e.target.id,
      userID,
      ratingData,
      `/city/${ID}`
    ).catch(err => console.log(err.response));
  };

  showEditModal = id => {
    this.setState(prevState => ({
      editComment: {
        ...prevState.editComment,
        [id]: !prevState.editComment[id],
      },
    }));
    this.setState({
      isEditComment: !this.state.isEditComment,
    });
  };
  showPopOver = id => {
    this.setState(prevState => ({
      showPopover: {
        ...prevState.showPopover,
        [id]: !prevState.showPopover[id],
      },
    }));
  };

  render() {
    const {
      userID,
      cities,
      categories,
      images,
      rating,
      comments,
      ratingLength,
      isLoading,
      userImages,
      allUsers,
      cmntError,
      cmntStatus,
      editCmntError,
      editCmntStatus,
      editComment,
      isEditComment,
      showPopover,
      rate,
      showMoreCmnt,
    } = this.state;

    let slicedComments = comments;

    if (!showMoreCmnt) slicedComments = comments.slice(0, 4);

    return (
      <div className="city-details-wrapper">
        {isLoading
          ? CircularLoader(isLoading)
          : cities !== {} && (
              <>
                <Helmet>
                  <title>{`${cities.city_name} - Everything you need to know about ${cities.city_name} | VisitNepal`}</title>
                </Helmet>
                <div
                  className="city-bg"
                  style={{
                    backgroundImage: `url(${process.env.REACT_APP_IMAGEURL}/cover_images/${images})`,
                  }}
                >
                  <div className="city-bg-overlay"></div>
                  <div className="city-bg-detail">
                    <span>{cities.city_name} Travel Guide</span>
                  </div>
                  <div className="ratings-reviews">
                    <div className="ratings">
                      <i className="fa fa-star"></i>&nbsp;&nbsp;
                      {rating ? (
                        <span>
                          {rating} / 5 &nbsp;<sub>({ratingLength} votes)</sub>
                        </span>
                      ) : (
                        <span>No ratings</span>
                      )}
                    </div>
                    <div className="reviews">
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
                <div className="container-fluid my-3">
                  <h2>Details</h2>
                  <div className="row mb-3">
                    <div className="col-md-12">
                      <p className="cities-description">{cities.description}</p>
                    </div>
                    <div className="col-md-12">
                      <ExpansionPanel elevation={5} expanded={true}>
                        <ExpansionPanelSummary
                          style={{ paddingLeft: 10 }}
                          expandIcon={<ExpandMoreIcon />}
                        >
                          <h3 style={{ margin: 0 }}>Reviews</h3>
                        </ExpansionPanelSummary>
                        <ExpansionPanelDetails
                          style={{
                            textOverflow: "ellipsis",
                            overflow: "hidden",
                            wordBreak: "break-all",
                          }}
                        >
                          <div className="row">
                            <Form>
                              <Form.Item></Form.Item>
                            </Form>
                            <Form
                              onSubmit={this.submitComment}
                              className="col-md-12"
                            >
                              <Form.Item
                                validateStatus={cmntStatus ? "error" : ""}
                                help={cmntStatus ? cmntError : ""}
                                hasFeedback
                              >
                                <Input
                                  prefix={
                                    <Icon
                                      type="message"
                                      style={{ color: "rgba(0,0,0,.25)" }}
                                    />
                                  }
                                  suffix={
                                    <Button
                                      type="submit"
                                      variant="outlined"
                                      color="primary"
                                      className="mr-3"
                                      disabled={isEditComment ? true : false}
                                    >
                                      Submit
                                    </Button>
                                  }
                                  placeholder="Write a review......"
                                  type="text"
                                  name="comment"
                                  onChange={this.onCommentChange}
                                  size="large"
                                  disabled={isEditComment ? true : false}
                                />
                              </Form.Item>
                            </Form>
                            {comments && comments.length !== 0 ? (
                              slicedComments.map(comment => {
                                return (
                                  <Paper
                                    className={`col-md-12 py-3 comment-section mt-2`}
                                    key={comment.id}
                                    style={{
                                      letterSpacing: 1,
                                    }}
                                    elevation={0}
                                  >
                                    <div className="d-flex align-items-top comment-container">
                                      {userImages
                                        .filter(
                                          userImage =>
                                            userImage.user_id ===
                                            comment.user_id
                                        )
                                        .map((image, index) => {
                                          return (
                                            <img
                                              className="user-image-comment"
                                              src={
                                                `${process.env.REACT_APP_IMAGEURL}/profile_images/` +
                                                image.profile_image
                                              }
                                              alt={image.profile_image}
                                              key={index}
                                            />
                                          );
                                        })}
                                      <span className="ml-3">
                                        <span style={{ fontSize: 14 }}>
                                          {allUsers
                                            .filter(
                                              allUser =>
                                                allUser.id === comment.user_id
                                            )
                                            .map(user => {
                                              return user.username;
                                            })}
                                        </span>
                                        <br />
                                        {comment.comment}
                                        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                                        {userID === comment.user_id ? (
                                          <Popover
                                            content={
                                              <span className="comment-option">
                                                <span
                                                  onClick={() =>
                                                    this.showEditModal(
                                                      comment.id
                                                    )
                                                  }
                                                >
                                                  <i className="fa fa-edit"></i>{" "}
                                                  &nbsp; Edit....
                                                </span>{" "}
                                                <br />
                                                <span>
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
                                              this.showPopOver(comment.id)
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
                                    </div>
                                    <Modal
                                      key={comment.id}
                                      title={<b style={{fontSize: 18}}>Edit Comment</b>}
                                      visible={
                                        !editComment[comment.id] ? false : true
                                      }
                                      footer={null}
                                      onCancel={() => this.showEditModal(comment.id)}
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
                                            <i className="fa fa-edit"></i> &nbsp; Edit
                                          </Button>
                                          <Button
                                            className="mr-2 float-right"
                                            variant="outlined"
                                            onClick={() =>
                                              this.showEditModal(comment.id)
                                            }
                                          >
                                            <i className="fa fa-times"></i> &nbsp; Cancel
                                          </Button>
                                        </Form.Item>
                                      </Form>
                                    </Modal>
                                  </Paper>
                                );
                              })
                            ) : (
                              <span className="mx-3">
                                No Comments posted yet.
                              </span>
                            )}
                            {comments.length > 4 ? (
                              <Button
                                fullWidth
                                color="primary"
                                variant="contained"
                                onClick={() =>
                                  this.setState({
                                    showMoreCmnt: !showMoreCmnt,
                                  })
                                }
                              >
                                {showMoreCmnt
                                  ? "Show Less Reviews"
                                  : "Show More Reviews"}
                              </Button>
                            ) : (
                              ""
                            )}
                          </div>
                        </ExpansionPanelDetails>
                      </ExpansionPanel>
                    </div>
                  </div>
                  {categories && categories.length !== 0 && (
                    <>
                      <h2>
                        Things to do in{" "}
                        <span className="text-capitalize">
                          {cities.city_name}
                        </span>
                      </h2>
                      <div className="row">
                        {categories.map((category, index) => {
                          return (
                            <div
                              className="col-md-12 col-lg-6 col-xl-6 category-data"
                              key={index}
                            >
                              <Paper elevation={5} className="my-2">
                                <div className="row">
                                  <div className="col-md-3 col-lg-4 col-xl-3 category-image-container">
                                    <div
                                      className="category-image"
                                      style={{
                                        backgroundImage: `url(${process.env
                                          .REACT_APP_IMAGEURL +
                                          "/category_images/" +
                                          category.category_image})`,
                                      }}
                                    ></div>
                                  </div>
                                  <div className="col-md-9 col-lg-8 col-xl-9 my-3 category-details">
                                    <h4
                                      className="text-uppercase"
                                      style={{ fontFamily: "Montserrat" }}
                                    >
                                      {category.category_name}
                                    </h4>
                                    <p className="category-detail">
                                      {category.details}
                                    </p>
                                  </div>
                                </div>
                              </Paper>
                            </div>
                          );
                        })}
                      </div>
                    </>
                  )}
                </div>
              </>
            )}
      </div>
    );
  }
}
