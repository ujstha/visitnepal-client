import { Loader, CircularLoader, SimpleLoader } from "./Loader";
import { Toast } from "./Toast";
import { UserFunction, ResetPassword, logOut } from "./UserFunction";
import {
  CitiesFunction,
  AddCityImage,
  EditCities,
  EditCityImage,
  DeleteCity,
  DeleteImage
} from "./CitiesFunction";
import {
  GetUser,
  GetAllUsers,
  GetUserRole,
  GetUserDetails,
  GetUserImages,
  GetAllUserDetails,
  GetAllUserImages
} from "./UserData";
import {
  GetCities,
  GetCitiesImages,
  GetCityById,
  GetImageByCityId,
  GetRatingByCityId,
  GetAvgRatingByCityId,
  GetCommentByCityId
} from "./CitiesData";
import {
  CommentFunction,
  CommentFunctionEdit,
  DeleteComment,
  DeleteAllComment
} from "./CommentFunction";
import { RatingFunction, RatingFunctionEdit } from "./RatingFunction";
import {
  SlidesFunction,
  GetSlides,
  GetSlideById,
  EditSlides,
  DeleteSlide
} from "./SlidesFunction";

export {
  logOut,
  UserFunction,
  ResetPassword,
  CitiesFunction,
  AddCityImage,
  EditCities,
  EditCityImage,
  DeleteCity,
  DeleteImage,
  Toast,
  Loader,
  CircularLoader,
  SimpleLoader,
  GetUser,
  GetAllUsers,
  GetUserRole,
  GetUserDetails,
  GetUserImages,
  GetAllUserDetails,
  GetAllUserImages,
  GetCities,
  GetCitiesImages,
  GetCityById,
  GetImageByCityId,
  GetRatingByCityId,
  GetAvgRatingByCityId,
  GetCommentByCityId,
  CommentFunction,
  CommentFunctionEdit,
  DeleteComment,
  DeleteAllComment,
  RatingFunction,
  RatingFunctionEdit,
  SlidesFunction,
  GetSlides,
  GetSlideById,
  EditSlides,
  DeleteSlide
};
