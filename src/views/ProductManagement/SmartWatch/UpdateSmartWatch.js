import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
// Global State
import { store, useGlobalState } from "state-pool";
// material-ui icons
import LocalOfferIcon from "@material-ui/icons/LocalOffer";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import FiberManualRecord from "@material-ui/icons/FiberManualRecord";
import Radio from "@material-ui/core/Radio";
import CardGiftcardIcon from "@mui/icons-material/CardGiftcard";
import AcUnitIcon from "@mui/icons-material/AcUnit";
import RssFeedIcon from "@mui/icons-material/RssFeed";
import LaunchIcon from "@mui/icons-material/Launch";
import PhoneAndroidIcon from "@mui/icons-material/PhoneAndroid";
import SmartDisplayIcon from "@mui/icons-material/SmartDisplay";
import HardwareIcon from "@mui/icons-material/Hardware";
import MemoryIcon from "@mui/icons-material/Memory";
import CameraRearIcon from "@mui/icons-material/CameraRear";
import CameraFrontIcon from "@mui/icons-material/CameraFront";
import VolumeUpIcon from "@mui/icons-material/VolumeUp";
import SettingsInputAntennaIcon from "@mui/icons-material/SettingsInputAntenna";
import FeaturedPlayListIcon from "@mui/icons-material/FeaturedPlayList";
import BatteryCharging50Icon from "@mui/icons-material/BatteryCharging50";
import MiscellaneousServicesIcon from "@mui/icons-material/MiscellaneousServices";
import SpeedIcon from "@mui/icons-material/Speed";
import AddToPhotosIcon from "@mui/icons-material/AddToPhotos";
import DeleteIcon from "@mui/icons-material/Delete";
import CloseIcon from "@mui/icons-material/Close";
import RefreshIcon from "@mui/icons-material/Refresh";
import DetailsIcon from "@mui/icons-material/Details";
// nodejs library that concatenates classes
import classNames from "classnames";
// core components
import GridContainer from "components/Grid/GridContainer.js";
import GridItem from "components/Grid/GridItem.js";
import Button from "components/CustomButtons/Button.js";
import { makeStyles } from "@material-ui/core/styles";
import styles from "assets/jss/material-dashboard-pro-react/views/extendedFormsStyle.js";
import { DatePicker, MuiPickersUtilsProvider } from "@material-ui/pickers";
import DateFnsUtils from "@date-io/date-fns";
import Media from "views/Components/Media.js";
import SnackbarContent from "components/Snackbar/SnackbarContent.js";
// Card
import Card from "components/Card/Card.js";
import CardBody from "components/Card/CardBody.js";
import CardIcon from "components/Card/CardIcon.js";
import CardHeader from "components/Card/CardHeader.js";
// Custom Input
import CustomInput from "components/CustomInput/CustomInput.js";
import Clearfix from "components/Clearfix/Clearfix.js";
// Date
import "date-fns";
import DateValidate from "views/DatePicker/DateValidate";
// SCSS File
// import '../../assets/scss/ghorwali-scss/voucherCard.scss'
import "assets/scss/ghorwali-scss/voucherCard.scss";
import "assets/scss/ghorwali-scss/update-device-accessory.scss";

import moment from "moment";
import { title } from "assets/jss/material-dashboard-pro-react";
import SaveWarning from "views/ConfirmationModals/SaveWarning";
// Dropdown Select
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import { AndroidOutlined } from "@material-ui/icons";
// Images
import dummyProfileImg128px from "assets/img/okolele-img/dummy_profile_img_128px.png";
// Loader
import FillingBottle from "react-cssfx-loading/lib/FillingBottle";
import ProductUpdateWarning from "views/ConfirmationModals/ProductUpdateWarning";
// Rich Text Editor
import JoditEditor from "jodit-react";

// Importing toastify module
import { toast } from "react-toastify";
// Import toastify css file
import "react-toastify/dist/ReactToastify.css";
import HttpStatusCode from "views/OkoleleHttpStatusCode/HttpStatusCode";
import ImgCropper from "views/OkoleleImageCropper/ImgCropper";
// toast-configuration method,
// it is compulsory method.
toast.configure();

const useStyles = makeStyles(styles);

function UpdateSmartWatch(props) {
  const classes = useStyles();
  // accessToken
  const [userToken, setUserToken, updateUserToken] = useGlobalState(
    "accessToken"
  );
  var accessTknValidity = new Date(userToken.tokenValidity);
  var refreshTknValidity = new Date(userToken.refreshTokenValidity);
  const refreshTkn = {
    refreshToken: userToken.refreshToken,
  };
  // API Header
  let config = {
    headers: {
      Authorization: "Bearer " + userToken.token,
    },
  };
  // Product Info
  // Basic
  const [category, setCategory] = useState("3"); //category 3 is fixed for SW
  const [mName, setmName] = useState("N/A");
  const [mBasePrice, setmBasePrice] = useState("0");
  const [mCurrentPrice, setmCurrentPrice] = useState("0");
  const [mDiscountType, setmDiscountType] = useState("");
  const [mDiscountValue, setmDiscountValue] = useState("0");
  const [mTotalQuantity, setmTotalQuantity] = useState("0");
  const [mSellableQuantity, setmSellableQuantity] = useState("0");
  const [mBrandName, setmBrandName] = useState("N/A");
  const [mWarranty, setmWarranty] = useState("0");
  const [userComments, setUserComments] = useState([]);
  const [productImages, setProductImages] = useState([
    { imgId: 1, imgBase64: "" },
    { imgId: 2, imgBase64: "" },
    { imgId: 3, imgBase64: "" },
    { imgId: 4, imgBase64: "" },
    { imgId: 5, imgBase64: "" },
  ]);

  const [isPublished, setPsPublished] = useState(false);

  // LAUNCH
  const [mAnnounchDate, setmAnnounchDate] = useState(new Date());
  const [mReleaseDate, setmReleaseDate] = useState(new Date());
  // BODY
  const [mDimension, setmDimension] = useState("N/A");
  const [mWeight, setmWeight] = useState("N/A");
  const [mBuild, setmBuild] = useState("N/A");
  // DISPLAY
  const [mDisplayType, setmDisplayType] = useState("N/A");
  const [mSize, setmSize] = useState("N/A");
  const [mResolution, setmResolution] = useState("N/A");
  const [mProtection, setmProtection] = useState("N/A");
  // PLATFORM
  const [mOS, setmOS] = useState("N/A");
  const [mChipset, setmChipset] = useState("N/A");
  const [mCPU, setmCPU] = useState("N/A");
  const [mGPU, setmGPU] = useState("N/A");
  // MEMORY
  const [mInternal, setmInternal] = useState("N/A");
  // COMMS
  const [mWlan, setmWlan] = useState("");
  const [mBlueTooth, setmBlueTooth] = useState("N/A");
  const [mGPS, setmGPS] = useState("N/A");
  const [mNFC, setmNFC] = useState("N/A");
  const [mRadio, setmRadio] = useState("N/A");
  const [mUSB, setmUSB] = useState("N/A");
  // FEATURES
  const [mSensor1, setmSensor1] = useState("N/A");
  const [mSensor2, setmSensor2] = useState("N/A");
  const [mSensor3, setmSensor3] = useState("N/A");
  // BATTERY
  const [mBatteryType, setmBatteryType] = useState("N/A");
  const [mBatteryCharging, setmBatteryCharging] = useState("N/A");
  // MISC
  const [mColor, setmColor] = useState("N/A");
  const [mModel, setmModel] = useState("N/A");
  // TESTS
  const [mPerformance1, setmPerformance1] = useState("N/A");
  const [mPerformance2, setmPerformance2] = useState("N/A");
  const [mPerformance3, setmPerformance3] = useState("N/A");
  //Others
  const [others, setOthers] = useState("N/A");
  const editor = useRef(null);
  const joditConfig = {
    readonly: false, // all options from https://xdsoft.net/jodit/doc/
  };

  // Http Response Msg
  const [showHttpResponseMsg, setShowHttpResponseMsg] = useState(false);
  const [httpResponseCode, setHttpResponseCode] = useState("");
  // Preview and Crop Img
  const [shouldPreview, setShouldPreview] = useState(false);
  const [imgIdToPreview, setImgIdToPreview] = useState("");

  // Data loader flag
  const [isDataLoaded, setIsDataLoaded] = useState(false);
  // Product status change flag
  // const [updateProductId, setUpdateProductId] = useState("");
  // const [statusToBeChanged, setStatusToBeChanged] = useState(false);
  const [showProductUpdatePopup, setShowProductUpdatePopup] = useState(false);

  useEffect(() => {
    const swDetailsAPI =
      "http://localhost:8080/smartwatches/" + props.editProductId;

    axios
      .get(swDetailsAPI)
      .then(function (response) {
        setIsDataLoaded(false);

        setCategory(response.data.category);
        // Basic
        setmName(response.data.title);
        setmBasePrice(response.data.oldPrice);
        setmCurrentPrice(response.data.currentPrice);
        setmDiscountType(response.data.discount.type);
        setmDiscountValue(response.data.discount.value);
        setmTotalQuantity(response.data.totalStock);
        setmSellableQuantity(response.data.sellableStock);
        if (response.data.brand === "SAMSUNG") {
          setmBrandName(1101);
        } else if (response.data.brand === "APPLE") {
          setmBrandName(1102);
        } else if (response.data.brand === "XIAOMI") {
          setmBrandName(1103);
        } else if (response.data.brand === "REALME") {
          setmBrandName(1104);
        } else if (response.data.brand === "ONEPLUS") {
          setmBrandName(1105);
        } else if (response.data.brand === "WALTON") {
          setmBrandName(1106);
        } else if (response.data.brand === "SYMPHONY") {
          setmBrandName(1107);
        } else if (response.data.brand === "OPPO") {
          setmBrandName(1108);
        } else if (response.data.brand === "NOKIA") {
          setmBrandName(1109);
        } else if (response.data.brand === "VIVO") {
          setmBrandName(1110);
        } else if (response.data.brand === "HUAWEI") {
          setmBrandName(1111);
        } else if (response.data.brand === "TECNO") {
          setmBrandName(1112);
        } else if (response.data.brand === "INFINIX") {
          setmBrandName(1113);
        } else if (response.data.brand === "GOOGLE") {
          setmBrandName(1114);
        } else if (response.data.brand === "HONOR") {
          setmBrandName(1115);
        } else if (response.data.brand === "SONY") {
          setmBrandName(1116);
        } else if (response.data.brand === "ASUS") {
          setmBrandName(1117);
        } else if (response.data.brand === "UMIDIGI") {
          setmBrandName(1118);
        } else if (response.data.brand === "MICROMAX") {
          setmBrandName(1119);
        } else if (response.data.brand === "MAXIMUS") {
          setmBrandName(1120);
        } else if (response.data.brand === "LG") {
          setmBrandName(1121);
        } else if (response.data.brand === "HTC") {
          setmBrandName(1122);
        } else if (response.data.brand === "LAVA") {
          setmBrandName(1123);
        } else if (response.data.brand === "HELIO") {
          setmBrandName(1124);
        } else if (response.data.brand === "ALCATEL") {
          setmBrandName(1125);
        } else if (response.data.brand === "LENOVO") {
          setmBrandName(1126);
        } else if (response.data.brand === "OKAPIA") {
          setmBrandName(1127);
        } else if (response.data.brand === "MYCELL") {
          setmBrandName(1128);
        } else if (response.data.brand === "ITEL") {
          setmBrandName(1129);
        }

        setmWarranty(response.data.warranty);
        setUserComments(response.data.comments);

        productImages[0].imgBase64 = response.data.images[0];
        productImages[1].imgBase64 = response.data.images[1];
        productImages[2].imgBase64 = response.data.images[2];
        productImages[3].imgBase64 = response.data.images[3];
        productImages[4].imgBase64 = response.data.images[4];

        setPsPublished(response.data.content.published);

        // LAUNCH
        setmAnnounchDate(response.data.announceDate);
        setmReleaseDate(response.data.releaseDate);
        // BODY
        setmDimension(response.data.dimension);
        setmWeight(response.data.weight);
        setmBuild(response.data.build);
        // DISPLAY
        setmDisplayType(response.data.displayType);
        setmSize(response.data.displaySize);
        setmResolution(response.data.displayResolution);
        setmProtection(response.data.displayProtection);
        // PLATFORM
        setmOS(response.data.os);
        setmChipset(response.data.chipset);
        setmCPU(response.data.cpu);
        setmGPU(response.data.gpu);
        // MEMORY
        setmInternal(response.data.internalSlot);
        // COMMS
        setmWlan(response.data.wlan);
        setmBlueTooth(response.data.bluetooth);
        setmGPS(response.data.gps);
        setmNFC(response.data.nfc);
        setmRadio(response.data.radio);
        setmUSB(response.data.usb);
        // FEATURES
        setmSensor1(response.data.sensors[0]);
        setmSensor2(response.data.sensors[1]);
        setmSensor3(response.data.sensors[2]);
        // BATTERY
        setmBatteryType(response.data.batteryType);
        setmBatteryCharging(response.data.batteryCharging);
        // MISC
        setmColor(response.data.colors[0]);
        setmModel(response.data.models[0]);
        // TESTS
        setmPerformance1(response.data.performances[0]);
        setmPerformance2(response.data.performances[1]);
        setmPerformance3(response.data.performances[2]);
        // Others
        setOthers(getRichText(response.data.others));

        setIsDataLoaded(true);
      })
      .catch(function (error) {
        console.log(error);
      });
  }, [props.editProductId]);

  // Rich Text to Plain Text
  const getRichText = (richText) => {
    var divContainer = document.createElement("div");
    divContainer.innerHTML = richText;
    return divContainer.textContent || divContainer.innerText || "";
  };

  // inputs Reset Handler
  const inputsResetHandler = () => {
    const mobileDetailsAPI =
      "http://localhost:8080/smartwatches/" + props.editProductId;

    axios
      .get(mobileDetailsAPI)
      .then(function (response) {
        setIsDataLoaded(false);

        setCategory(response.data.category);
        // Basic
        setmName(response.data.title);
        setmBasePrice(response.data.oldPrice);
        setmCurrentPrice(response.data.currentPrice);
        setmDiscountType(response.data.discount.type);
        setmDiscountValue(response.data.discount.value);
        setmTotalQuantity(response.data.totalStock);
        setmSellableQuantity(response.data.sellableStock);
        if (response.data.brand === "SAMSUNG") {
          setmBrandName(1101);
        } else if (response.data.brand === "APPLE") {
          setmBrandName(1102);
        } else if (response.data.brand === "XIAOMI") {
          setmBrandName(1103);
        } else if (response.data.brand === "REALME") {
          setmBrandName(1104);
        } else if (response.data.brand === "ONEPLUS") {
          setmBrandName(1105);
        } else if (response.data.brand === "WALTON") {
          setmBrandName(1106);
        } else if (response.data.brand === "SYMPHONY") {
          setmBrandName(1107);
        } else if (response.data.brand === "OPPO") {
          setmBrandName(1108);
        } else if (response.data.brand === "NOKIA") {
          setmBrandName(1109);
        } else if (response.data.brand === "VIVO") {
          setmBrandName(1110);
        } else if (response.data.brand === "HUAWEI") {
          setmBrandName(1111);
        } else if (response.data.brand === "TECNO") {
          setmBrandName(1112);
        } else if (response.data.brand === "INFINIX") {
          setmBrandName(1113);
        } else if (response.data.brand === "GOOGLE") {
          setmBrandName(1114);
        } else if (response.data.brand === "HONOR") {
          setmBrandName(1115);
        } else if (response.data.brand === "SONY") {
          setmBrandName(1116);
        } else if (response.data.brand === "ASUS") {
          setmBrandName(1117);
        } else if (response.data.brand === "UMIDIGI") {
          setmBrandName(1118);
        } else if (response.data.brand === "MICROMAX") {
          setmBrandName(1119);
        } else if (response.data.brand === "MAXIMUS") {
          setmBrandName(1120);
        } else if (response.data.brand === "LG") {
          setmBrandName(1121);
        } else if (response.data.brand === "HTC") {
          setmBrandName(1122);
        } else if (response.data.brand === "LAVA") {
          setmBrandName(1123);
        } else if (response.data.brand === "HELIO") {
          setmBrandName(1124);
        } else if (response.data.brand === "ALCATEL") {
          setmBrandName(1125);
        } else if (response.data.brand === "LENOVO") {
          setmBrandName(1126);
        } else if (response.data.brand === "OKAPIA") {
          setmBrandName(1127);
        } else if (response.data.brand === "MYCELL") {
          setmBrandName(1128);
        } else if (response.data.brand === "ITEL") {
          setmBrandName(1129);
        }

        setmWarranty(response.data.warranty);
        setUserComments(response.data.comments);

        productImages[0].imgBase64 = response.data.images[0];
        productImages[1].imgBase64 = response.data.images[1];
        productImages[2].imgBase64 = response.data.images[2];
        productImages[3].imgBase64 = response.data.images[3];
        productImages[4].imgBase64 = response.data.images[4];

        setPsPublished(response.data.content.published);

        // LAUNCH
        setmAnnounchDate(response.data.announceDate);
        setmReleaseDate(response.data.releaseDate);
        // BODY
        setmDimension(response.data.dimension);
        setmWeight(response.data.weight);
        setmBuild(response.data.build);
        // DISPLAY
        setmDisplayType(response.data.displayType);
        setmSize(response.data.displaySize);
        setmResolution(response.data.displayResolution);
        setmProtection(response.data.displayProtection);
        // PLATFORM
        setmOS(response.data.os);
        setmChipset(response.data.chipset);
        setmCPU(response.data.cpu);
        setmGPU(response.data.gpu);
        // MEMORY
        setmInternal(response.data.internalSlot);
        // COMMS
        setmWlan(response.data.wlan);
        setmBlueTooth(response.data.bluetooth);
        setmGPS(response.data.gps);
        setmNFC(response.data.nfc);
        setmRadio(response.data.radio);
        setmUSB(response.data.usb);
        // FEATURES
        setmSensor1(response.data.sensors[0]);
        setmSensor2(response.data.sensors[1]);
        setmSensor3(response.data.sensors[2]);
        // BATTERY
        setmBatteryType(response.data.batteryType);
        setmBatteryCharging(response.data.batteryCharging);
        // MISC
        setmColor(response.data.colors[0]);
        setmModel(response.data.models[0]);
        // TESTS
        setmPerformance1(response.data.performances[0]);
        setmPerformance2(response.data.performances[1]);
        setmPerformance3(response.data.performances[2]);
        // Others
        setOthers(getRichText(response.data.others));

        setIsDataLoaded(true);
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  // SW Details
  const swDetails = {
    category: category,
    title: mName,
    basePrice: mBasePrice,
    totalStock: mTotalQuantity,
    sellableStock: mSellableQuantity,
    brand: mBrandName,
    warranty: mWarranty,
    published: isPublished,
    dimension: mDimension,
    weight: mWeight,
    build: mBuild,
    announceDate: moment(mAnnounchDate).format("YYYY-MM-DD"),
    releaseDate: moment(mReleaseDate).format("YYYY-MM-DD"),
    displayType: mDisplayType,
    displaySize: mSize,
    displayResolution: mResolution,
    displayProtection: mProtection,
    os: mOS,
    chipset: mChipset,
    cpu: mCPU,
    gpu: mGPU,
    internalSlot: mInternal,
    wlan: mWlan,
    bluetooth: mBlueTooth,
    gps: mGPS,
    nfc: mNFC,
    radio: mRadio,
    usb: mUSB,
    sensors: [mSensor1, mSensor2, mSensor3],
    batteryType: mBatteryType,
    batteryCharging: mBatteryCharging,
    colors: [mColor],
    models: [mModel],
    images: [
      productImages[0].imgBase64,
      productImages[1].imgBase64,
      productImages[2].imgBase64,
      productImages[3].imgBase64,
      productImages[4].imgBase64,
    ],
    performances: [mPerformance1, mPerformance2, mPerformance3],
    hasWarranty: mWarranty > 0 ? true : false,
    discount: {
      type: mDiscountType,
      value: mDiscountType !== "" ? mDiscountValue : "",
    },
    others: [others],
  };

  // SW update Handler
  const swUpdateClick = () => {
    setShowProductUpdatePopup(true);
  };
  // Product Update Flag From Modal
  const productUpdateFlagFromModal = (isConfirmed) => {
    if (isConfirmed === true) {
      var currentLocalDateTime = new Date();
      if (accessTknValidity.getTime() > currentLocalDateTime.getTime()) {
        console.log(
          "accessTknValidity.getTime() > currentLocalDateTime.getTime()"
        );
        swUpdate();
      } else {
        console.log(
          "accessTknValidity.getTime() <= currentLocalDateTime.getTime()"
        );
        // If access token validity expires, call refresh token api
        refreshTokenHandler((isRefreshed) => {
          console.log("isRefreshed: ", isRefreshed);
          swUpdate();
        });
      }
    }
    setShowProductUpdatePopup(false);
  };

  const swUpdate = () => {
    const swUpdateAPI =
      "http://localhost:8080/smartwatches/" + props.editProductId;

    axios
      .put(swUpdateAPI, swDetails, config)
      .then(function (response) {
        // console.log("update response: ", response);
        // console.log("response code: ", response.status);
        setHttpResponseCode(response.status);
        setShowHttpResponseMsg(true);
      })
      .catch(function (error) {
        setHttpResponseCode(error.response.status);
        setShowHttpResponseMsg(true);
      });
  };

  // handle Image Change
  const handleImageChange = (event, id) => {
    const file = event.target.files[0];
    getBase64(file).then((base64) => {
      localStorage["fileBase64"] = base64;
      // console.log("handleImageChange/id,e: ", id, base64);
      let tempArray = [...productImages]; // copying the old datas array
      // console.log("handleImageChange/tempArray: ", tempArray);
      tempArray[id - 1].imgBase64 = base64; // replace e.target.value with whatever you want to change it to

      setProductImages(tempArray);
    });
  };
  const getBase64 = (file) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => resolve(reader.result);
      reader.onerror = (error) => reject(error);
      reader.readAsDataURL(file);
    });
  };

  // remove Selected Img
  const removeSelectedImg = (id) => {
    let tempArray = [...productImages]; // copying the old datas array
    // console.log("handleImageChange/tempArray: ", tempArray);
    tempArray[id - 1].imgBase64 = ""; // replace e.target.value with whatever you want to change it to

    setProductImages(tempArray);
  };

  const previewSelectedImg = (id) => {
    if (
      productImages[id - 1].imgBase64 != "" &&
      productImages[id - 1].imgBase64 != undefined
    ) {
      setImgIdToPreview(id);
      setShouldPreview(true);
    }
  };
  const onCloseImgCropper = (croppedImg, hideImgCropper) => {
    setShouldPreview(hideImgCropper);

    let tempArray = [...productImages]; // copying the old datas array
    tempArray[imgIdToPreview - 1].imgBase64 = croppedImg; // replace e.target.value with whatever you want to change it to
    setProductImages(tempArray);
  };

  // remove Comment from front end ( remove from userComments variable)
  const deleteComment = (msg) => {
    console.log("userComments: ", userComments);
    setUserComments(userComments.filter((item) => item.msg !== msg));
  };
  // Update Comment in DB after removing comments from userComments variable
  const commentsUpdateHandler = () => {
    const commentsUpdateAPI =
      "http://localhost:8080/smartwatches/deleteComment/" + props.editProductId;

    axios
      .post(commentsUpdateAPI, userComments)
      .then(function (response) {
        console.log("commentsUpdateAPI response: ", response);
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  const refreshTokenHandler = () => {
    var currentLocalDateTime = new Date();

    if (refreshTknValidity.getTime() > currentLocalDateTime.getTime()) {
      console.log(
        "refreshTknValidity.getTime() > currentLocalDateTime.getTime()"
      );
      const refreshTokenAPI = "http://localhost:8080/auth/token";
      axios
        .post(refreshTokenAPI, refreshTkn)
        .then(function (response) {
          console.log("Refresh token response: ", response);
          console.log("Status Code: ", response.status);

          if (response.data.code == 403) {
            alert(response.data.message);
            return false;
            // Logout forcefully from here
            try {
              localStorage.clear();
              window.location.href = "/";
            } catch (e) {
              console.log(e.message);
            }
          } else {
            updateUserToken(function (accessToken) {
              accessToken.token = response.data.token;
              accessToken.tokenValidity = response.data.tokenValidity;
              accessToken.refreshToken = response.data.refreshToken;
              accessToken.refreshTokenValidity =
                response.data.refreshTokenValidity;
            });
            return true;
          }
        })
        .catch(function (error) {
          console.log("Status Code: ", error.response.status);
          console.log(error);
        });
    } else {
      console.log(
        "refreshTknValidity.getTime() <= currentLocalDateTime.getTime()"
      );
      // Logout forcefully from here
      try {
        localStorage.clear();
        window.location.href = "/";
      } catch (e) {
        console.log(e.message);
      }
    }
  };

  return (
    <>
      {shouldPreview && (
        <ImgCropper
          src={productImages[imgIdToPreview - 1].imgBase64}
          onCloseImgCropper={onCloseImgCropper}
        />
      )}
      {/* Confirmation Modal */}
      {showProductUpdatePopup ? (
        <ProductUpdateWarning
          productUpdateFlagFromModal={productUpdateFlagFromModal}
        />
      ) : null}

      {/* Show HTTP response code  */}
      {showHttpResponseMsg === true ? (
        <HttpStatusCode responseCode={httpResponseCode} />
      ) : null}

      <GridContainer>
        {isDataLoaded === false ? (
          <div
            style={{
              marginLeft: "35vw",
              marginTop: "-105vh",
              position: "absolute",
            }}
          >
            {/* Data Loader */}
            <FillingBottle
              color="#f50057"
              width="50px"
              height="50px"
              style={{ marginLeft: "20px" }}
              onClick={() => alert("Clicked")}
            />
            <h4 style={{ fontWeight: "bold" }}>Loading.....</h4>
          </div>
        ) : (
          <GridItem xs={12} sm={12}>
            {/* md={8} */}
            <Card>
              <CardHeader color="rose" icon>
                <CardIcon color="rose">
                  <PhoneAndroidIcon />
                </CardIcon>
                <h4 className={classes.cardIconTitle}>Update Phone</h4>
              </CardHeader>

              {/* Reset */}
              <div className="resetIcon-container">
                <RefreshIcon
                  className="reset-inputs"
                  onClick={inputsResetHandler}
                />{" "}
                Reset
              </div>

              <CardBody>
                <div className="sectionDiv">
                  <AcUnitIcon />
                  <p className="sectionPara">[GENERAL INFO]</p>
                </div>
                {/* Name & Product Type  */}
                <GridContainer>
                  <GridItem xs={12} sm={12} md={6}>
                    <CustomInput
                      labelText="Product Name"
                      id="product-name"
                      disabled="true"
                      formControlProps={{
                        fullWidth: true,
                      }}
                      inputProps={{
                        type: "String",
                        value: mName || "",
                        onChange: (event) => setmName(event.target.value),
                        maxLength: "100",
                      }}
                    />
                  </GridItem>

                  {/* Category 1 is fixed for Phone type */}
                  <GridItem xs={12} sm={12} md={6}>
                    <CustomInput
                      labelText="Product Category "
                      id="product-category"
                      disabled="true"
                      formControlProps={{
                        fullWidth: true,
                      }}
                      inputProps={{
                        type: "Number",
                        value: category || "",
                        // onChange: (event) => setCategory(event.target.value),
                        maxLength: "5",
                      }}
                    />
                  </GridItem>
                </GridContainer>

                {/* Base & Current Price  */}
                <GridContainer>
                  <GridItem xs={12} sm={12} md={6}>
                    <CustomInput
                      labelText="Base Price"
                      id="base-price"
                      formControlProps={{
                        fullWidth: true,
                      }}
                      inputProps={{
                        type: "Number",
                        value: mBasePrice || "",
                        onChange: (event) => setmBasePrice(event.target.value),
                        maxLength: "6",
                      }}
                    />
                  </GridItem>
                  {/* <GridItem xs={12} sm={12} md={6}>
                  <CustomInput
                    labelText="New Price"
                    id="new-price"
                    formControlProps={{
                      fullWidth: true,
                    }}
                    inputProps={{
                      type: "Number",
                      value: mNewPrice || "",
                      onChange: (event) => setmNewPrice(event.target.value),
                      maxLength: "6",
                    }}
                  />
                </GridItem> */}
                </GridContainer>

                {/* Discount Type & Value  */}
                <GridContainer>
                  <GridItem
                    xs={12}
                    sm={12}
                    md={6}
                    style={{ marginTop: "12px" }}
                  >
                    <FormControl variant="standard" sx={{ width: "100%" }}>
                      <InputLabel id="demo-simple-select-standard-label">
                        Discount Type
                      </InputLabel>
                      <Select
                        labelId="demo-simple-select-standard-label"
                        id="demo-simple-select-standard"
                        value={mDiscountType || " "}
                        onChange={(event) =>
                          setmDiscountType(event.target.value)
                        }
                        label="Brand Name"
                      >
                        <MenuItem value="">
                          <em>None</em>
                        </MenuItem>
                        <MenuItem value={"FLAT"}>Flat (৳)</MenuItem>
                        <MenuItem value={"PERCENTAGE"}>Percentage (%)</MenuItem>
                      </Select>
                    </FormControl>
                  </GridItem>
                  {mDiscountType !== "" ? (
                    <GridItem xs={12} sm={12} md={6}>
                      <CustomInput
                        labelText="Discount Value"
                        id="discount-value"
                        formControlProps={{
                          fullWidth: true,
                        }}
                        inputProps={{
                          type: "Number",
                          value: mDiscountValue || "",

                          onChange: (event) =>
                            setmDiscountValue(event.target.value),
                          // maxLength: "3",
                        }}
                      />
                    </GridItem>
                  ) : null}
                </GridContainer>

                {/* Total Quantity & Sellable Quantity */}
                <GridContainer>
                  <GridItem xs={12} sm={12} md={6}>
                    <CustomInput
                      labelText="Total Quantity"
                      id="total-quantity"
                      formControlProps={{
                        fullWidth: true,
                      }}
                      inputProps={{
                        type: "Number",
                        value: mTotalQuantity || "",
                        onChange: (event) =>
                          setmTotalQuantity(event.target.value),
                        maxLength: "6",
                      }}
                    />
                  </GridItem>
                  <GridItem xs={12} sm={12} md={6}>
                    <CustomInput
                      labelText="Sellable Quantity"
                      id="sellable-quantity"
                      formControlProps={{
                        fullWidth: true,
                      }}
                      inputProps={{
                        type: "Number",
                        value: mSellableQuantity || "",
                        onChange: (event) =>
                          setmSellableQuantity(event.target.value),
                        maxLength: "6",
                      }}
                    />
                  </GridItem>
                </GridContainer>

                {/* Warranty & Brand*/}
                <GridContainer>
                  <GridItem
                    xs={12}
                    sm={12}
                    md={6}
                    style={{ marginTop: "12px" }}
                  >
                    <FormControl variant="standard" sx={{ width: "100%" }}>
                      <InputLabel id="demo-simple-select-standard-label">
                        Brand Name
                      </InputLabel>
                      <Select
                        labelId="demo-simple-select-standard-label"
                        id="demo-simple-select-standard"
                        value={mBrandName || " "}
                        onChange={(event) => setmBrandName(event.target.value)}
                        label="Brand Name"
                        // style={{ maxHeight: "100px", overflowY: "scroll" }}
                      >
                        <MenuItem value="">
                          <em>None</em>
                        </MenuItem>
                        <MenuItem value={"1101"}>SAMSUNG</MenuItem>
                        <MenuItem value={"1102"}>APPLE</MenuItem>
                        <MenuItem value={"1103"}>XIAOMI</MenuItem>
                        <MenuItem value={"1104"}>REALME</MenuItem>
                        <MenuItem value={"1105"}>ONEPLUS</MenuItem>
                        <MenuItem value={"1106"}>WALTON</MenuItem>
                        <MenuItem value={"1107"}>SYMPHONY</MenuItem>
                        <MenuItem value={"1108"}>OPPO</MenuItem>
                        <MenuItem value={"1109"}>NOKIA</MenuItem>
                        <MenuItem value={"1110"}>VIVO</MenuItem>
                        <MenuItem value={"1111"}>HUAWEI</MenuItem>
                        <MenuItem value={"1112"}>TECNO</MenuItem>
                        <MenuItem value={"1113"}>INFINIX</MenuItem>
                        <MenuItem value={"1114"}>GOOGLE</MenuItem>
                        <MenuItem value={"1115"}>HONOR</MenuItem>
                        <MenuItem value={"1116"}>SONY</MenuItem>
                        <MenuItem value={"1117"}>ASUS</MenuItem>
                        <MenuItem value={"1118"}>UMIDIGI</MenuItem>
                        <MenuItem value={"1119"}>MICROMAX</MenuItem>
                        <MenuItem value={"1120"}>MAXIMUS</MenuItem>
                        <MenuItem value={"1121"}>LG</MenuItem>
                        <MenuItem value={"1122"}>HTC</MenuItem>
                        <MenuItem value={"1123"}>LAVA</MenuItem>
                        <MenuItem value={"1124"}>HELIO</MenuItem>
                        <MenuItem value={"1125"}>ALCATEL</MenuItem>
                        <MenuItem value={"1126"}>LENOVO</MenuItem>
                        <MenuItem value={"1127"}>OKAPIA</MenuItem>
                        <MenuItem value={"1128"}>MYCELL</MenuItem>
                        <MenuItem value={"1129"}>ITEL</MenuItem>
                      </Select>
                    </FormControl>
                  </GridItem>

                  <GridItem xs={12} sm={12} md={6}>
                    <CustomInput
                      labelText="Warranty (In Month)"
                      id="warranty"
                      formControlProps={{
                        fullWidth: true,
                      }}
                      inputProps={{
                        type: "Number",
                        value: mWarranty || "",
                        onChange: (event) => setmWarranty(event.target.value),
                        maxLength: "2",
                      }}
                    />
                  </GridItem>
                </GridContainer>

                {/* Product Image Picker */}
                <GridContainer>
                  {/* Image Picker 1 */}
                  <GridItem>
                    {/* {console.log("productImages: ", productImages)} */}
                    <div className="picture-container">
                      <div
                        className="picture"
                        style={{
                          borderRadius: "0",
                          backgroundColor: "#ededed ",
                        }}
                      >
                        {productImages[0].imgBase64 === "" ? (
                          <div>
                            <AddToPhotosIcon className="imgAddIcon" />
                            <input
                              type="file"
                              onChange={(e) => handleImageChange(e, 1)}
                            />
                          </div>
                        ) : (
                          <div>
                            <DeleteIcon
                              className="removeSelectedImg"
                              onClick={() => removeSelectedImg(1)}
                            />
                            <img
                              className="imgPickerImg"
                              src={productImages[0].imgBase64}
                              alt="ProductImg"
                            />
                          </div>
                        )}
                      </div>
                      <h6 className="description">Image 1</h6>
                    </div>
                  </GridItem>

                  {/* Image Picker 2 */}
                  <GridItem>
                    <div className="picture-container">
                      <div
                        className="picture"
                        style={{
                          borderRadius: "0",
                          backgroundColor: "#ededed ",
                        }}
                      >
                        {productImages[1].imgBase64 === "" ? (
                          <div>
                            <AddToPhotosIcon className="imgAddIcon" />
                            <input
                              type="file"
                              onChange={(e) => handleImageChange(e, 2)}
                            />
                          </div>
                        ) : (
                          <div>
                            <DeleteIcon
                              className="removeSelectedImg"
                              onClick={() => removeSelectedImg(2)}
                            />
                            <img
                              className="imgPickerImg"
                              src={productImages[1].imgBase64}
                              alt="ProductImg"
                            />
                          </div>
                        )}
                      </div>
                      <h6 className="description">Image 2</h6>
                    </div>
                  </GridItem>

                  {/* Image Picker 3 */}
                  <GridItem>
                    <div className="picture-container">
                      <div
                        className="picture"
                        style={{
                          borderRadius: "0",
                          backgroundColor: "#ededed ",
                        }}
                      >
                        {productImages[2].imgBase64 === "" ? (
                          <div>
                            <AddToPhotosIcon className="imgAddIcon" />
                            <input
                              type="file"
                              onChange={(e) => handleImageChange(e, 3)}
                            />
                          </div>
                        ) : (
                          <div>
                            <DeleteIcon
                              className="removeSelectedImg"
                              onClick={() => removeSelectedImg(3)}
                            />
                            <img
                              className="imgPickerImg"
                              src={productImages[2].imgBase64}
                              alt="ProductImg"
                            />
                          </div>
                        )}
                      </div>
                      <h6 className="description">Image 3</h6>
                    </div>
                  </GridItem>

                  {/* Image Picker 4 */}
                  <GridItem>
                    <div className="picture-container">
                      <div
                        className="picture"
                        style={{
                          borderRadius: "0",
                          backgroundColor: "#ededed ",
                        }}
                      >
                        {productImages[3].imgBase64 === "" ? (
                          <div>
                            <AddToPhotosIcon className="imgAddIcon" />
                            <input
                              type="file"
                              onChange={(e) => handleImageChange(e, 4)}
                            />
                          </div>
                        ) : (
                          <div>
                            <DeleteIcon
                              className="removeSelectedImg"
                              onClick={() => removeSelectedImg(4)}
                            />
                            <img
                              className="imgPickerImg"
                              src={productImages[3].imgBase64}
                              alt="ProductImg"
                            />
                          </div>
                        )}
                      </div>
                      <h6 className="description">Image 4</h6>
                    </div>
                  </GridItem>

                  {/* Image Picker 5 */}
                  <GridItem>
                    <div className="picture-container">
                      <div
                        className="picture"
                        style={{
                          borderRadius: "0",
                          backgroundColor: "#ededed ",
                        }}
                      >
                        {productImages[4].imgBase64 === "" ? (
                          <div>
                            <AddToPhotosIcon className="imgAddIcon" />
                            <input
                              type="file"
                              onChange={(e) => handleImageChange(e, 5)}
                            />
                          </div>
                        ) : (
                          <div>
                            <DeleteIcon
                              className="removeSelectedImg"
                              onClick={() => removeSelectedImg(5)}
                            />
                            <img
                              className="imgPickerImg"
                              src={productImages[4].imgBase64}
                              alt="ProductImg"
                            />
                          </div>
                        )}
                      </div>
                      <h6 className="description">Image 5</h6>
                    </div>
                  </GridItem>
                </GridContainer>

                <br />

                <div className="sectionDiv">
                  <LaunchIcon />
                  <p className="sectionPara">[LAUNCH]</p>
                </div>

                {/* Announce date and Release date  */}
                <GridContainer>
                  <GridItem xs={12} sm={12} md={6}>
                    <MuiPickersUtilsProvider utils={DateFnsUtils}>
                      <DatePicker
                        disableFuture
                        openTo="date"
                        format="yyyy-MM-dd"
                        label="Date of Announced"
                        views={["year", "month", "date"]}
                        value={mAnnounchDate}
                        onChange={(date) => setmAnnounchDate(date)}
                      />
                    </MuiPickersUtilsProvider>
                  </GridItem>
                  <GridItem xs={12} sm={12} md={6}>
                    <MuiPickersUtilsProvider utils={DateFnsUtils}>
                      <DatePicker
                        disableFuture
                        openTo="date"
                        format="yyyy-MM-dd"
                        label="Date of Release"
                        views={["year", "month", "date"]}
                        value={mReleaseDate}
                        onChange={(date) => setmReleaseDate(date)}
                      />
                    </MuiPickersUtilsProvider>
                  </GridItem>
                </GridContainer>

                <br />

                <div className="sectionDiv">
                  <PhoneAndroidIcon />
                  <p className="sectionPara">[BODY]</p>
                </div>

                {/* Dimension & Weight  */}
                <GridContainer>
                  <GridItem xs={12} sm={12} md={6}>
                    <CustomInput
                      labelText="Dimension"
                      id="dimension"
                      formControlProps={{
                        fullWidth: true,
                      }}
                      inputProps={{
                        type: "String",
                        value: mDimension || "",
                        onChange: (event) => setmDimension(event.target.value),
                        maxLength: "100",
                      }}
                    />
                  </GridItem>
                  <GridItem xs={12} sm={12} md={6}>
                    <CustomInput
                      labelText="Weight"
                      id="weight"
                      formControlProps={{
                        fullWidth: true,
                      }}
                      inputProps={{
                        type: "String",
                        value: mWeight || "",
                        onChange: (event) => setmWeight(event.target.value),
                        maxLength: "100",
                      }}
                    />
                  </GridItem>
                </GridContainer>

                {/* Build */}
                <GridContainer>
                  <GridItem xs={12} sm={12} md={6}>
                    <CustomInput
                      labelText="Build"
                      id="build"
                      formControlProps={{
                        fullWidth: true,
                      }}
                      inputProps={{
                        type: "String",
                        value: mBuild || "",
                        onChange: (event) => setmBuild(event.target.value),
                        maxLength: "100",
                      }}
                    />
                  </GridItem>
                </GridContainer>

                <div className="sectionDiv">
                  <SmartDisplayIcon />
                  <p className="sectionPara">[DISPLAY]</p>
                </div>

                {/* DISPLAY Type & Size  */}
                <GridContainer>
                  <GridItem xs={12} sm={12} md={6}>
                    <CustomInput
                      labelText="Type"
                      id="type"
                      formControlProps={{
                        fullWidth: true,
                      }}
                      inputProps={{
                        type: "String",
                        value: mDisplayType || "",
                        onChange: (event) =>
                          setmDisplayType(event.target.value),
                        maxLength: "100",
                      }}
                    />
                  </GridItem>
                  <GridItem xs={12} sm={12} md={6}>
                    <CustomInput
                      labelText="Size"
                      id="size"
                      formControlProps={{
                        fullWidth: true,
                      }}
                      inputProps={{
                        type: "String",
                        value: mSize || "",
                        onChange: (event) => setmSize(event.target.value),
                        maxLength: "100",
                      }}
                    />
                  </GridItem>
                </GridContainer>

                {/* DISPLAY Resolution & Protection  */}
                <GridContainer>
                  <GridItem xs={12} sm={12} md={6}>
                    <CustomInput
                      labelText="Resolution"
                      id="resolution"
                      formControlProps={{
                        fullWidth: true,
                      }}
                      inputProps={{
                        type: "String",
                        value: mResolution || "",
                        onChange: (event) => setmResolution(event.target.value),
                        maxLength: "100",
                      }}
                    />
                  </GridItem>
                  <GridItem xs={12} sm={12} md={6}>
                    <CustomInput
                      labelText="Protection"
                      id="protection"
                      formControlProps={{
                        fullWidth: true,
                      }}
                      inputProps={{
                        type: "String",
                        value: mProtection || "",
                        onChange: (event) => setmProtection(event.target.value),
                        maxLength: "100",
                      }}
                    />
                  </GridItem>
                </GridContainer>

                <div className="sectionDiv">
                  <HardwareIcon />
                  <p className="sectionPara">[PLATFORM]</p>
                </div>

                {/* OS & Chipset  */}
                <GridContainer>
                  <GridItem xs={12} sm={12} md={6}>
                    <CustomInput
                      labelText="OS"
                      id="os"
                      formControlProps={{
                        fullWidth: true,
                      }}
                      inputProps={{
                        type: "String",
                        value: mOS || "",
                        onChange: (event) => setmOS(event.target.value),
                        maxLength: "100",
                      }}
                    />
                  </GridItem>
                  <GridItem xs={12} sm={12} md={6}>
                    <CustomInput
                      labelText="Chipset"
                      id="chipset"
                      formControlProps={{
                        fullWidth: true,
                      }}
                      inputProps={{
                        type: "String",
                        value: mChipset || "",
                        onChange: (event) => setmChipset(event.target.value),
                        maxLength: "100",
                      }}
                    />
                  </GridItem>
                </GridContainer>

                {/* CPU & GPU  */}
                <GridContainer>
                  <GridItem xs={12} sm={12} md={6}>
                    <CustomInput
                      labelText="CPU"
                      id="cpu"
                      formControlProps={{
                        fullWidth: true,
                      }}
                      inputProps={{
                        type: "String",
                        value: mCPU || "",
                        onChange: (event) => setmCPU(event.target.value),
                        maxLength: "100",
                      }}
                    />
                  </GridItem>
                  <GridItem xs={12} sm={12} md={6}>
                    <CustomInput
                      labelText="GPU"
                      id="gpu"
                      formControlProps={{
                        fullWidth: true,
                      }}
                      inputProps={{
                        type: "String",
                        value: mGPU || "",
                        onChange: (event) => setmGPU(event.target.value),
                        maxLength: "100",
                      }}
                    />
                  </GridItem>
                </GridContainer>

                <div className="sectionDiv">
                  <MemoryIcon />
                  <p className="sectionPara">[MEMORY]</p>
                </div>

                {/* Internal  */}
                <GridContainer>
                  {/* <GridItem xs={12} sm={12} md={6}>
                    <CustomInput
                      labelText="Card Slot"
                      id="card-slot"
                      formControlProps={{
                        fullWidth: true,
                      }}
                      inputProps={{
                        type: "String",
                        value: mCardSlot || "",
                        onChange: (event) => setmCardSlot(event.target.value),
                        maxLength: "100",
                      }}
                    />
                  </GridItem> */}
                  <GridItem xs={12} sm={12} md={6}>
                    <CustomInput
                      labelText="Internal"
                      id="internal"
                      formControlProps={{
                        fullWidth: true,
                      }}
                      inputProps={{
                        type: "String",
                        value: mInternal || "",
                        onChange: (event) => setmInternal(event.target.value),
                        maxLength: "100",
                      }}
                    />
                  </GridItem>
                </GridContainer>

                <div className="sectionDiv">
                  <SettingsInputAntennaIcon />
                  <p className="sectionPara">[COMMS]</p>
                </div>

                {/* WLAN & Bluetooth */}
                <GridContainer>
                  <GridItem xs={12} sm={12} md={6}>
                    <CustomInput
                      labelText="WLAN"
                      id="wlan"
                      formControlProps={{
                        fullWidth: true,
                      }}
                      inputProps={{
                        type: "String",
                        value: mWlan || "",
                        onChange: (event) => setmWlan(event.target.value),
                        maxLength: "100",
                      }}
                    />
                  </GridItem>
                  <GridItem xs={12} sm={12} md={6}>
                    <CustomInput
                      labelText="Bluetooth"
                      id="bluetooth"
                      formControlProps={{
                        fullWidth: true,
                      }}
                      inputProps={{
                        type: "String",
                        value: mBlueTooth || "",
                        onChange: (event) => setmBlueTooth(event.target.value),
                        maxLength: "100",
                      }}
                    />
                  </GridItem>
                </GridContainer>

                {/* GPS & NFC */}
                <GridContainer>
                  <GridItem xs={12} sm={12} md={6}>
                    <CustomInput
                      labelText="GPS"
                      id="gps"
                      formControlProps={{
                        fullWidth: true,
                      }}
                      inputProps={{
                        type: "String",
                        value: mGPS || "",
                        onChange: (event) => setmGPS(event.target.value),
                        maxLength: "100",
                      }}
                    />
                  </GridItem>
                  <GridItem xs={12} sm={12} md={6}>
                    <CustomInput
                      labelText="NFC"
                      id="NFC"
                      formControlProps={{
                        fullWidth: true,
                      }}
                      inputProps={{
                        type: "String",
                        value: mNFC || "",
                        onChange: (event) => setmNFC(event.target.value),
                        maxLength: "100",
                      }}
                    />
                  </GridItem>
                </GridContainer>

                {/* Radio & USB */}
                <GridContainer>
                  <GridItem xs={12} sm={12} md={6}>
                    <CustomInput
                      labelText="Radio"
                      id="radio"
                      formControlProps={{
                        fullWidth: true,
                      }}
                      inputProps={{
                        type: "String",
                        value: mRadio || "",
                        onChange: (event) => setmRadio(event.target.value),
                        maxLength: "100",
                      }}
                    />
                  </GridItem>
                  <GridItem xs={12} sm={12} md={6}>
                    <CustomInput
                      labelText="USB"
                      id="usb"
                      formControlProps={{
                        fullWidth: true,
                      }}
                      inputProps={{
                        type: "String",
                        value: mUSB || "",
                        onChange: (event) => setmUSB(event.target.value),
                        maxLength: "100",
                      }}
                    />
                  </GridItem>
                </GridContainer>

                <div className="sectionDiv">
                  <FeaturedPlayListIcon />
                  <p className="sectionPara">[FEATURES]</p>
                </div>

                {/* Sensor 1 & Sensor 2 */}
                <GridContainer>
                  <GridItem xs={12} sm={12} md={6}>
                    <CustomInput
                      labelText="Sensor 1"
                      id="sensor1"
                      formControlProps={{
                        fullWidth: true,
                      }}
                      inputProps={{
                        type: "String",
                        value: mSensor1 || "",
                        onChange: (event) => setmSensor1(event.target.value),
                        maxLength: "100",
                      }}
                    />
                  </GridItem>
                  <GridItem xs={12} sm={12} md={6}>
                    <CustomInput
                      labelText="Sensor 2"
                      id="sensor2"
                      formControlProps={{
                        fullWidth: true,
                      }}
                      inputProps={{
                        type: "String",
                        value: mSensor2 || "",
                        onChange: (event) => setmSensor2(event.target.value),
                        maxLength: "100",
                      }}
                    />
                  </GridItem>
                </GridContainer>

                {/* Sensor 3 */}
                <GridContainer>
                  <GridItem xs={12} sm={12} md={6}>
                    <CustomInput
                      labelText="Sensor 3"
                      id="sensor3"
                      formControlProps={{
                        fullWidth: true,
                      }}
                      inputProps={{
                        type: "String",
                        value: mSensor3 || "",
                        onChange: (event) => setmSensor3(event.target.value),
                        maxLength: "100",
                      }}
                    />
                  </GridItem>
                </GridContainer>

                <div className="sectionDiv">
                  <BatteryCharging50Icon />
                  <p className="sectionPara">[BATTERY]</p>
                </div>

                {/* Battery Type & Charging */}
                <GridContainer>
                  <GridItem xs={12} sm={12} md={6}>
                    <CustomInput
                      labelText="Battery Type"
                      id="battery-type"
                      formControlProps={{
                        fullWidth: true,
                      }}
                      inputProps={{
                        type: "String",
                        value: mBatteryType || "",
                        onChange: (event) =>
                          setmBatteryType(event.target.value),
                        maxLength: "100",
                      }}
                    />
                  </GridItem>
                  <GridItem xs={12} sm={12} md={6}>
                    <CustomInput
                      labelText="Charging"
                      id="charging"
                      formControlProps={{
                        fullWidth: true,
                      }}
                      inputProps={{
                        type: "String",
                        value: mBatteryCharging || "",
                        onChange: (event) =>
                          setmBatteryCharging(event.target.value),
                        maxLength: "100",
                      }}
                    />
                  </GridItem>
                </GridContainer>

                <div className="sectionDiv">
                  <MiscellaneousServicesIcon />
                  <p className="sectionPara">[MISC]</p>
                </div>

                {/* Colors & Models */}
                <GridContainer>
                  <GridItem xs={12} sm={12} md={6}>
                    <CustomInput
                      labelText="Colors"
                      id="colors"
                      formControlProps={{
                        fullWidth: true,
                      }}
                      inputProps={{
                        type: "String",
                        value: mColor || "",
                        onChange: (event) => setmColor(event.target.value),
                        maxLength: "100",
                      }}
                    />
                  </GridItem>
                  <GridItem xs={12} sm={12} md={6}>
                    <CustomInput
                      labelText="Models"
                      id="models"
                      formControlProps={{
                        fullWidth: true,
                      }}
                      inputProps={{
                        type: "String",
                        value: mModel || "",
                        onChange: (event) => setmModel(event.target.value),
                        maxLength: "100",
                      }}
                    />
                  </GridItem>
                </GridContainer>

                <div className="sectionDiv">
                  <DetailsIcon />
                  <p className="sectionPara">[Other INFO]</p>
                </div>

                {/* Details Info  */}
                <GridContainer>
                  <GridItem xs={12} sm={4} md={8}>
                    <JoditEditor
                      ref={editor}
                      value={others}
                      config={joditConfig}
                      tabIndex={1} // tabIndex of textarea
                      onBlur={(newContent) => setOthers(newContent)} // preferred to use only this option to update the content for performance reasons
                      onChange={(newContent) => {}}
                    />
                  </GridItem>
                </GridContainer>

                <div className="sectionDiv">
                  <SpeedIcon />
                  <p className="sectionPara">[TESTS]</p>
                </div>

                {/* Performance 1 & Performance 2 */}
                <GridContainer>
                  <GridItem xs={12} sm={12} md={6}>
                    <CustomInput
                      labelText="Performance 1"
                      id="performance1"
                      formControlProps={{
                        fullWidth: true,
                      }}
                      inputProps={{
                        type: "String",
                        value: mPerformance1 || "",
                        onChange: (event) =>
                          setmPerformance1(event.target.value),
                        maxLength: "100",
                      }}
                    />
                  </GridItem>
                  <GridItem xs={12} sm={12} md={6}>
                    <CustomInput
                      labelText="Performance 2"
                      id="performance2"
                      formControlProps={{
                        fullWidth: true,
                      }}
                      inputProps={{
                        type: "String",
                        value: mPerformance2 || "",
                        onChange: (event) =>
                          setmPerformance2(event.target.value),
                        maxLength: "100",
                      }}
                    />
                  </GridItem>
                </GridContainer>

                {/* Performance 3 */}
                <GridContainer>
                  <GridItem xs={12} sm={12} md={6}>
                    <CustomInput
                      labelText="Performance 3"
                      id="performance3"
                      formControlProps={{
                        fullWidth: true,
                      }}
                      inputProps={{
                        type: "String",
                        value: mPerformance3 || "",
                        onChange: (event) =>
                          setmPerformance3(event.target.value),
                        maxLength: "100",
                      }}
                    />
                  </GridItem>
                </GridContainer>

                {/* User Opinions & Reviews */}
                <GridContainer>
                  <h3 className={classNames(classes.title, classes.textCenter)}>
                    {mName} - User Opinions & Reviews
                  </h3>
                  <GridItem xs={12} sm={12} md={12} className={classes.mrAuto}>
                    <div>
                      <h3 className={classes.title + " " + classes.textCenter}>
                        {userComments.length} Comments
                      </h3>
                      {/* Users all comments */}
                      <div className="comments-container">
                        {userComments.map((userComments) => (
                          <div className="user-comments-div">
                            <img
                              className="user-profile-img"
                              src={
                                userComments.userImage || dummyProfileImg128px
                              }
                              alt="..."
                            />
                            <h4 className="user-comment-msg">
                              {userComments.msg}
                            </h4>
                            <CloseIcon
                              className="close-icon"
                              onClick={deleteComment.bind(
                                null,
                                userComments.msg
                              )}
                            />
                          </div>
                        ))}

                        <Button
                          color="rose"
                          className={classes.updateProfileButton}
                          style={{ marginLeft: "53vw" }}
                          onClick={commentsUpdateHandler}
                        >
                          Update Comments
                        </Button>
                      </div>
                    </div>
                  </GridItem>
                </GridContainer>

                <Button
                  color="rose"
                  className={classes.updateProfileButton}
                  onClick={swUpdateClick}
                >
                  Save & Update
                </Button>

                <Clearfix />
              </CardBody>
            </Card>
          </GridItem>
        )}
      </GridContainer>
    </>
  );
}

export default UpdateSmartWatch;