import React, { useRef, useState } from "react";
// import qrcode from "qrcode";

import BarcodeScannerComponent from "react-qr-barcode-scanner";

// import QrReader from "react-qr-reader";
import Barcode from "react-barcode";
// import CameraComponent from "./Camera";
// import Quagga from "quagga-react";
// import QRCode from "@zxing/library/esm/core/qrcode/encoder/QRCode";

const BarcodeGenerator = () => {
  const qrRef = useRef(null);
  const [fileResult, setFileResult] = useState();
  const [webcamResult, setwebcamResult] = useState();
  const [text, setText] = useState(" ");
  const [data, setData] = React.useState(" ");
  // const [imageQR, setImageQR] = useState();

  // const handleWebcamScan = async () => {
  //   const codeReader = new BrowserMultiFormatReader();
  //   try {
  //     const stream = await navigator.mediaDevices.getUserMedia({
  //       video: { facingMode: "environment" },
  //     });

  //     const result = await codeReader.decodeFromStream(stream, "camera");
  //     webcamResult(result.text);
  //   } catch (error) {
  //     console.error("Error scanning barcode:", error);
  //   }
  // };
  // const generateBarcode = async () => {
  //   let image = await BarcodeGenerator.toDataURL(text);
  //   setImageQR(image);
  // };
  // useEffect(() => {
  //   const constraints = { video: true };

  //   async function openWebcam() {
  //     try {
  //       const userMediaStream = await navigator.mediaDevices.getUserMedia(constraints);
  //       setStream(userMediaStream);
  //     } catch (error) {
  //       console.error('Error accessing webcam:', error);
  //     }
  //   }

  //   openWebcam();

  // const openWebcamScan = () => {
  //   qrRef.current.openWebcamScan();
  // };

  const fileError = (error) => {
    if (error) {
      console.log(error);
    }
  };
  const fileScan = (result) => {
    if (result) {
      setFileResult(result);
    }
  };
  const webcamError = (error) => {
    if (error) {
      console.log(error);
    }
  };
  const webcamScan = (result) => {
    if (result) {
      setwebcamResult(result);
    }
  };

  return (
    <div className="container mx-auto mt-4">
      <div className="row">
        <h2 className="col-sm-12 badges bg-danger text-center text-white">
          Barcode Generator
        </h2>
      </div>
      <div className="row">
        <h3 className="col-sm-12">Enter Text for Barcode </h3>
      </div>
      <div className="row">
        <input
          type="text"
          className="col-sm-4 mt-4 p-2 rounded"
          value={data}
          onChange={(e) => setText(e.target.value)}
        />
        {/* <button
          className="col-sm-2 btn btn-success m-2 mt-4"
          onClick={handleWebcamScan}
        >
          Generate
        </button> */}
      </div>
      <div className="row">
        <div className="card col-sm-4 m-2">
          <div className="card-header m-2 rounded">
            <h5 className="badges bg-success rounded text-center cursor text-light">
              QR Code
            </h5>
          </div>
          <div className="card-body text-center">
            {/* {imageQR && (
              <a href={imageQR} download>
                <img src={imageQR} width="70%" alt="QR Code" />
              </a>
            )} */}
          </div>
          <div className="card-footer rounded mb-1">
            {/* Display any results or information here */}
          </div>
        </div>
        <div className="card col-sm-4 m-2">
          <div className="card-header m-1 p-4 rounded text-center">
            <h5 className="badges bg-success rounded text-light">Barcode</h5>
          </div>
          <div className="card-body text-center">
            {text && (
              <Barcode
                ref={qrRef}
                value={text}
                delay={300}
                onError={fileError}
                onScan={fileScan}
                legacyMode={true}
              />
            )}
          </div>

          <div className="card-footer rounded mb-1">
            <h6>Image result :{fileResult}</h6>
          </div>
          <div className="card col-sm-10 m-4">
            {/* <CameraComponent /> */}
            {/* <MultiFormatReader
              // ref={qrRef}
              delay={500}
              onError={webcamError}
              onScan={webcamScan}
              legacyMode={false}
              facingMode={"environment"}
            /> */}
            <BarcodeScannerComponent
              width={400}
              height={400}
              onUpdate={(err, result) => {
                console.log(err);
                if (result) setData(result.text);
                else setData("Not found");
              }}
            />
            <p>{data}</p>
            <div className="card-footer rounded mb-1">
              {/* <video id="camera" style={{ display: "none" }}></video> */}

              <h6>webcam Result:{webcamResult}</h6>
              <button
                className="sm-2 btn btn-success m-2 mt-4"
                // onClick={handleWebcamScan}
                // onClick={openWebcamScan}
              >
                Generate
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BarcodeGenerator;

// export default BarCodeEx;
