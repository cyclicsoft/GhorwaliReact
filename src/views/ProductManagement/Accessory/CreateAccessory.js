import React, { useState, useEffect } from "react";
import axios from "axios";
// Global State
import { store, useGlobalState } from "state-pool";

// material-ui icons
import AcUnitIcon from "@mui/icons-material/AcUnit";
import LaunchIcon from "@mui/icons-material/Launch";
import SpeedIcon from "@mui/icons-material/Speed";
import RefreshIcon from "@mui/icons-material/Refresh";
import BakeryDiningIcon from "@mui/icons-material/BakeryDining";
// core components
import GridContainer from "components/Grid/GridContainer.js";
import GridItem from "components/Grid/GridItem.js";
import Button from "components/CustomButtons/Button.js";
import { makeStyles } from "@material-ui/core/styles";
import styles from "assets/jss/material-dashboard-pro-react/views/extendedFormsStyle.js";
import { DatePicker, MuiPickersUtilsProvider } from "@material-ui/pickers";
import DateFnsUtils from "@date-io/date-fns";
// Card
import Card from "components/Card/Card.js";
import CardBody from "components/Card/CardBody.js";
import CardHeader from "components/Card/CardHeader.js";
// Custom Input
import CustomInput from "components/CustomInput/CustomInput.js";
// Date
// import "date-fns";
// import DateValidate from "views/DatePicker/DateValidate";
// SCSS File
// import '../../assets/scss/ghorwali-scss/voucherCard.scss'
import "assets/scss/ghorwali-scss/voucherCard.scss";
import "assets/scss/ghorwali-scss/create-products.scss";
// Data formatter
import moment from "moment";

// Dropdown Select
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import ProductCreateConfirmation from "views/ConfirmationModals/ProductCreateConfirmation";

// Importing toastify module
import { toast } from "react-toastify";
// Import toastify css file
import "react-toastify/dist/ReactToastify.css";
import HttpStatusCode from "views/OkoleleHttpStatusCode/HttpStatusCode";

import SearchToClone from "../CloneProducts/SearchToClone";
import DynamicElementCreator from "../DynamicElementCreator";
import ProductVariants from "../ProductVariants";
import AccessoryVariants from "../AccessoryVariants";
// toast-configuration method,
// it is compulsory method.
toast.configure();

const useStyles = makeStyles(styles);

function CreateAccessory() {
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
  // Bulk Upload
  const [csvFile, setCsvFile] = useState(null);
  const [fileName, setFileName] = useState("");
  const [fileSize, setFileSize] = useState(0);
  // const [fileUpdateDate, setFileUpdateDate] = useState([]);
  // Basic
  const [category, setCategory] = useState("4"); //category 4 is fixed for accessory
  const [mName, setmName] = useState("");
  const [mDiscountType, setmDiscountType] = useState("FLAT");
  const [mDiscountValue, setmDiscountValue] = useState(0);
  const [mBrandName, setmBrandName] = useState("1101");
  const [mWarranty, setmWarranty] = useState(0);

  // LAUNCH
  const [mAnnounchDate, setmAnnounchDate] = useState(new Date());
  const [mReleaseDate, setmReleaseDate] = useState(new Date());

  // product All Variants
  const [productAllVariants, setProductAllVariants] = useState([]);
  // other Details
  const [otherDetails, setOtherDetails] = useState([]);

  // Product create confirmation popup viewar
  const [showProductCreatePopup, setShowProductCreatePopup] = useState(false);
  // Http Response Msg
  const [showHttpResponseMsg, setShowHttpResponseMsg] = useState(false);
  const [httpResponseCode, setHttpResponseCode] = useState("");

  const otherDetailHandler = (callBackData) => {
    setOtherDetails(callBackData);
  };

  const productVariantsSetter = (response) => {
    // console.log("productVariantsSetter/All Variants: ", response);
    setProductAllVariants(response);
  };

  const swDetails = {
    category: category,
    title: mName,
    brand: mBrandName,
    warranty: mWarranty,
    announceDate: moment(mAnnounchDate).format("YYYY-MM-DD"),
    releaseDate: moment(mReleaseDate).format("YYYY-MM-DD"),
    discount: {
      type: mDiscountType,
      value: mDiscountValue,
    },
    variants: productAllVariants,
    details: otherDetails,
  };

  const swSaveClick = () => {
    setShowProductCreatePopup(true);
  };
  // Product Create Flag From Modal
  const productCreateFlagFromModal = (isConfirmed) => {
    if (isConfirmed === true) {
      var currentLocalDateTime = new Date();
      if (accessTknValidity.getTime() > currentLocalDateTime.getTime()) {
        // console.log(
        //   "accessTknValidity.getTime() > currentLocalDateTime.getTime()"
        // );
        saveNewSW();
      } else {
        // console.log(
        //   "accessTknValidity.getTime() <= currentLocalDateTime.getTime()"
        // );
        // If access token validity expires, call refresh token api
        refreshTokenHandler((isRefreshed) => {
          // console.log("isRefreshed: ", isRefreshed);
          saveNewSW();
        });
      }
    }

    setShowHttpResponseMsg(false);
    setShowProductCreatePopup(false);
  };

  const saveNewSW = () => {
    // console.log("saveNewSW/swDetails: ", swDetails);
    const accessoryCreateAPI = "http://localhost:8080/accessories";
    axios
      .post(accessoryCreateAPI, swDetails, config)
      .then(function (response) {
        setHttpResponseCode(response.status);
        setShowHttpResponseMsg(true);
      })
      .catch(function (error) {
        setHttpResponseCode(error.response.status);
        setShowHttpResponseMsg(true);
      });
  };

  // inputs Reset Handler
  const inputsResetHandler = () => {
    // GeneralInfo
    resetGeneralInfo();
    // Variants
    resetVariants();
    // LAUNCH
    resetLaunch();
    // Other Details
    resetOtherDetails();
  };

  const resetGeneralInfo = () => {
    setCategory("4");
    setmName("");
    setmDiscountType("FLAT");
    setmDiscountValue(0);
    setmBrandName("1101");
    setmWarranty(0);
  };

  const resetVariants = () => {
    setProductAllVariants([]);
  };

  const resetLaunch = () => {
    setmAnnounchDate(new Date());
    setmReleaseDate(new Date());
  };

  const resetOtherDetails = () => {
    setOtherDetails([]);
  };

  // Bulk Upload
  const setFile = (event) => {
    setCsvFile(event.target.files[0]);

    var files = event.target.files;
    var filesArray = [].slice.call(files);
    filesArray.forEach((event) => {
      setFileName(event.name);
      setFileSize(Math.round(event.size / 1024));
      // console.log(event.type);
      // console.log(event.length);
      // setFileUpdateDate(event.lastModifiedDate);
    });
  };
  const bulkUploadHandler = () => {
    // console.log("CSV: ", csvFile);

    //Get file extension from file name
    const split_name = csvFile.name.split(".");
    const type = split_name[split_name.length - 1];

    //create a blob from file calling mime type injection function
    const blob = new Blob([csvFile], { type: mimeType(type) });

    //Here you can use the file as you wish
    const new_file = blobToFile(blob, "csv");
    // console.log(new_file);

    const data = new FormData();
    data.append("file", new_file);
    data.append("productType", "SMARTWATCHE");

    const csvConfig = {
      headers: {
        "content-type": `multipart/form-data; boundary=${data._boundary}`,
        Authorization: "Bearer " + userToken.token,
      },
    };

    const bulkUploadAPI = "http://localhost:8080/products/bulkdata";

    axios
      .post(bulkUploadAPI, data, csvConfig)
      .then(function (response) {
        // console.log("update response: ", response);
      })
      .catch(function (error) {
        // console.log("error: ", error);
        // if (error.response) {
        //   console.log(error.response.data);
        //   console.log(error.response.status);
        //   console.log(error.response.headers);
        // }
      });
  };
  //Inject mimeType By extension - Excel files check only
  const mimeType = (extension) => {
    switch (extension) {
      case "xlsx":
        return "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet";

      case "xls":
        return "application/vnd.ms-excel";

      default:
        return "text/csv";
    }
  };
  //Convert Blob to File
  const blobToFile = (theBlob, fileName) => {
    theBlob.lastModifiedDate = new Date();
    theBlob.name = fileName;

    return theBlob;
  };

  const refreshTokenHandler = () => {
    var currentLocalDateTime = new Date();

    if (refreshTknValidity.getTime() > currentLocalDateTime.getTime()) {
      // console.log(
      //   "refreshTknValidity.getTime() > currentLocalDateTime.getTime()"
      // );
      const refreshTokenAPI = "http://localhost:8080/auth/token";

      axios
        .post(refreshTokenAPI, refreshTkn)
        .then(function (response) {
          // console.log("Refresh token response: ", response);
          // console.log("Status Code: ", response.status);

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
          // console.log("Status Code: ", error.response.status);
          console.log(error);
        });
    } else {
      // console.log(
      //   "refreshTknValidity.getTime() <= currentLocalDateTime.getTime()"
      // );
      // Logout forcefully from here
      try {
        localStorage.clear();
        window.location.href = "/";
      } catch (e) {
        console.log(e.message);
      }
    }
  };

  // Searched Product from SearchToCLone.js
  const getSearchedProduct = (searchedProduct) => {
    setCategory("4");
    // Basic
    setmName(searchedProduct.title);
    setmDiscountType(searchedProduct.discount.type);
    setmDiscountValue(searchedProduct.discount.value);

    setProductAllVariants(searchedProduct.variants);

    if (searchedProduct.brand === "SAMSUNG") {
      setmBrandName(1101);
    } else if (searchedProduct.brand === "APPLE") {
      setmBrandName(1102);
    } else if (searchedProduct.brand === "XIAOMI") {
      setmBrandName(1103);
    } else if (searchedProduct.brand === "REALME") {
      setmBrandName(1104);
    } else if (searchedProduct.brand === "ONEPLUS") {
      setmBrandName(1105);
    } else if (searchedProduct.brand === "WALTON") {
      setmBrandName(1106);
    } else if (searchedProduct.brand === "SYMPHONY") {
      setmBrandName(1107);
    } else if (searchedProduct.brand === "OPPO") {
      setmBrandName(1108);
    } else if (searchedProduct.brand === "NOKIA") {
      setmBrandName(1109);
    } else if (searchedProduct.brand === "VIVO") {
      setmBrandName(1110);
    } else if (searchedProduct.brand === "HUAWEI") {
      setmBrandName(1111);
    } else if (searchedProduct.brand === "TECNO") {
      setmBrandName(1112);
    } else if (searchedProduct.brand === "INFINIX") {
      setmBrandName(1113);
    } else if (searchedProduct.brand === "GOOGLE") {
      setmBrandName(1114);
    } else if (searchedProduct.brand === "HONOR") {
      setmBrandName(1115);
    } else if (searchedProduct.brand === "SONY") {
      setmBrandName(1116);
    } else if (searchedProduct.brand === "ASUS") {
      setmBrandName(1117);
    } else if (searchedProduct.brand === "UMIDIGI") {
      setmBrandName(1118);
    } else if (searchedProduct.brand === "MICROMAX") {
      setmBrandName(1119);
    } else if (searchedProduct.brand === "MAXIMUS") {
      setmBrandName(1120);
    } else if (searchedProduct.brand === "LG") {
      setmBrandName(1121);
    } else if (searchedProduct.brand === "HTC") {
      setmBrandName(1122);
    } else if (searchedProduct.brand === "LAVA") {
      setmBrandName(1123);
    } else if (searchedProduct.brand === "HELIO") {
      setmBrandName(1124);
    } else if (searchedProduct.brand === "ALCATEL") {
      setmBrandName(1125);
    } else if (searchedProduct.brand === "LENOVO") {
      setmBrandName(1126);
    } else if (searchedProduct.brand === "OKAPIA") {
      setmBrandName(1127);
    } else if (searchedProduct.brand === "MYCELL") {
      setmBrandName(1128);
    } else if (searchedProduct.brand === "ITEL") {
      setmBrandName(1129);
    }

    setmWarranty(searchedProduct.warranty);

    // LAUNCH
    setmAnnounchDate(searchedProduct.announceDate);
    setmReleaseDate(searchedProduct.releaseDate);
    setOtherDetails(searchedProduct.details);
  };

  return (
    <>
      {/* Confirmation Modal */}
      <div>
        {/* Confirmation Modal */}
        {showProductCreatePopup ? (
          <ProductCreateConfirmation
            productCreateFlagFromModal={productCreateFlagFromModal}
          />
        ) : null}

        {/* Show HTTP response code  */}
        {showHttpResponseMsg === true ? (
          <HttpStatusCode responseCode={httpResponseCode} />
        ) : null}
      </div>

      {/* Bulk SW Upload  */}
      <GridContainer>
        <GridItem xs={12} sm={12}>
          {/* md={8} */}
          <Card>
            <CardHeader color="rose" icon>
              {/* <CardIcon color="rose">
                <LocalOfferIcon />
              </CardIcon> */}
              <h4 className={classes.cardIconTitle}>Bulk Upload</h4>
            </CardHeader>
            <CardBody>
              {/* Bulk Phone Upload  */}
              <GridContainer>
                <GridItem xs={12} sm={12} md={4}>
                  <CustomInput
                    labelText="Select CSV"
                    id="select-csv"
                    formControlProps={{
                      fullWidth: true,
                    }}
                    inputProps={{
                      type: "file",
                      onChange: (event) => setFile(event),
                    }}
                  />
                </GridItem>
                {/* Upload button */}
                <GridItem xs={12} sm={12} md={6}>
                  <Button
                    color="rose"
                    style={{ marginTop: "20px" }}
                    className={classes.updateProfileButton}
                    onClick={bulkUploadHandler}
                  >
                    Upload CSV
                  </Button>
                </GridItem>
              </GridContainer>

              {fileSize > 0 ? (
                <GridContainer>
                  <GridItem>
                    <div>File Size: {fileSize} KB</div>
                  </GridItem>
                </GridContainer>
              ) : null}
            </CardBody>
          </Card>
        </GridItem>
      </GridContainer>

      <h4 className={classes.cardIconTitle}>Create New Accessory</h4>
      {/* Reset & Search To Clone */}
      <div style={{ display: "flex" }}>
        {/* Reset */}
        <div className="resetIcon-container">
          <RefreshIcon className="reset-input" onClick={inputsResetHandler} />{" "}
          Reset A~Z
        </div>

        {/* Search To Clone */}
        <SearchToClone
          getSearchedProduct={getSearchedProduct}
          productType={"accessories"}
        />
      </div>

      {/* [GENERAL INFO] */}
      <GridContainer>
        <GridItem xs={12} sm={12}>
          {/* md={8} */}
          <Card style={{ marginTop: "0" }}>
            <CardBody>
              {/* Section Ttitle and Reset button */}
              <div style={{ display: "flex" }}>
                <div className="sectionDiv" style={{ width: "65vw" }}>
                  <AcUnitIcon />
                  <p className="sectionPara">[GENERAL INFO]</p>
                  {/* Reset */}
                </div>
                <div
                  className="resetIcon-container"
                  style={{ marginTop: "0px" }}
                >
                  <RefreshIcon
                    className="reset-input"
                    onClick={resetGeneralInfo}
                  />{" "}
                  Reset
                </div>
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
                <GridItem xs={12} sm={12} md={3}>
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
                      maxLength: "3",
                    }}
                  />
                </GridItem>
              </GridContainer>

              {/* Discount Type, Discount Value, Warranty & Brand  */}
              <GridContainer>
                {/* Discount Type */}
                <GridItem xs={12} sm={12} md={3} style={{ marginTop: "12px" }}>
                  <FormControl variant="standard" sx={{ width: "100%" }}>
                    <InputLabel
                      id="demo-simple-select-standard-label"
                      style={{ fontSize: "14px" }}
                    >
                      Discount Type
                    </InputLabel>
                    <Select
                      labelId="demo-simple-select-standard-label"
                      id="demo-simple-select-standard"
                      style={{ fontSize: "14px" }}
                      value={mDiscountType || " "}
                      onChange={(event) => setmDiscountType(event.target.value)}
                      label="Brand Name"
                    >
                      {/* <MenuItem value="">
                        <em>None</em>
                      </MenuItem> */}
                      <MenuItem value={"FLAT"}>Flat (???)</MenuItem>
                      <MenuItem value={"PERCENTAGE"}>Percentage (%)</MenuItem>
                    </Select>
                  </FormControl>
                </GridItem>

                {/* Discount Value */}
                {mDiscountType !== "" ? (
                  <GridItem xs={12} sm={12} md={3}>
                    <CustomInput
                      labelText="Discount Value"
                      id="discount-value"
                      formControlProps={{
                        fullWidth: true,
                      }}
                      inputProps={{
                        type: "Number",
                        value: mDiscountValue || 0,

                        onChange: (event) =>
                          setmDiscountValue(event.target.value),
                        // maxLength: "3",
                      }}
                    />
                  </GridItem>
                ) : null}

                {/* Brand*/}
                <GridItem xs={12} sm={12} md={3} style={{ marginTop: "12px" }}>
                  <FormControl variant="standard" sx={{ width: "100%" }}>
                    <InputLabel
                      id="demo-simple-select-standard-label"
                      style={{ fontSize: "14px" }}
                    >
                      Brand Name
                    </InputLabel>
                    <Select
                      labelId="demo-simple-select-standard-label"
                      id="demo-simple-select-standard"
                      style={{ fontSize: "14px" }}
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

                {/* Warranty */}
                <GridItem xs={12} sm={12} md={3}>
                  <CustomInput
                    labelText="Warranty (In Month)"
                    id="warranty"
                    formControlProps={{
                      fullWidth: true,
                    }}
                    inputProps={{
                      type: "Number",
                      value: mWarranty || 0,
                      onChange: (event) => setmWarranty(event.target.value),
                      maxLength: "2",
                    }}
                  />
                </GridItem>
              </GridContainer>
            </CardBody>
          </Card>
        </GridItem>
      </GridContainer>

      {/* [VARIANTS] */}
      <GridContainer>
        <GridItem xs={12} sm={12}>
          {/* md={8} */}
          <Card style={{ marginTop: "0" }}>
            <CardBody>
              {/* Section Ttitle and Reset button */}
              <div style={{ display: "flex" }}>
                <div className="sectionDiv" style={{ width: "65vw" }}>
                  <BakeryDiningIcon />
                  <p className="sectionPara">[VARIANTS]</p>
                  {/* Reset */}
                </div>
                <div
                  className="resetIcon-container"
                  style={{ marginTop: "0px" }}
                >
                  <RefreshIcon
                    className="reset-input"
                    onClick={resetVariants}
                  />{" "}
                  Reset
                </div>
              </div>

              <GridContainer>
                <GridItem xs={12} sm={12} md={12}>
                  <AccessoryVariants
                    objectValue={productAllVariants}
                    productVariantsSetter={productVariantsSetter}
                    placeHolder="Outer fields"
                  />
                </GridItem>
              </GridContainer>
            </CardBody>
          </Card>
        </GridItem>
      </GridContainer>

      {/* [LAUNCH] */}
      <GridContainer>
        <GridItem xs={12} sm={12}>
          {/* md={8} */}
          <Card style={{ marginTop: "0" }}>
            <CardBody>
              {/* Section Ttitle and Reset button */}
              <div style={{ display: "flex" }}>
                <div className="sectionDiv" style={{ width: "65vw" }}>
                  <LaunchIcon />
                  <p className="sectionPara">[LAUNCH]</p>
                  {/* Reset */}
                </div>
                <div
                  className="resetIcon-container"
                  style={{ marginTop: "0px" }}
                >
                  <RefreshIcon className="reset-input" onClick={resetLaunch} />{" "}
                  Reset
                </div>
              </div>

              {/* Announce date and Release date  */}
              <GridContainer>
                <GridItem xs={12} sm={12} md={3}>
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
                <GridItem xs={12} sm={12} md={3}>
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
            </CardBody>
          </Card>
        </GridItem>
      </GridContainer>

      {/* [OTHER DETAILS] */}
      <GridContainer>
        <GridItem xs={12} sm={12}>
          {/* md={8} */}
          <Card style={{ marginTop: "0" }}>
            <CardBody>
              {/* Section Ttitle and Reset button */}
              <div style={{ display: "flex" }}>
                <div className="sectionDiv" style={{ width: "65vw" }}>
                  <SpeedIcon />
                  <p className="sectionPara">[OTHER DETAILS]</p>
                  {/* Reset */}
                </div>
                <div
                  className="resetIcon-container"
                  style={{ marginTop: "0px" }}
                >
                  <RefreshIcon
                    className="reset-input"
                    onClick={resetOtherDetails}
                  />{" "}
                  Reset
                </div>
              </div>

              {/* Performances */}
              <GridContainer>
                <GridItem xs={12} sm={12} md={6}>
                  <DynamicElementCreator
                    objectValue={otherDetails}
                    callBackFun={otherDetailHandler}
                    placeHolder="Other Details"
                  />
                </GridItem>
              </GridContainer>
            </CardBody>
          </Card>
        </GridItem>
      </GridContainer>

      {/* Save Button  */}
      <Button
        color="rose"
        className={classes.updateProfileButton}
        onClick={swSaveClick}
      >
        Save
      </Button>
    </>
  );
}

export default CreateAccessory;
