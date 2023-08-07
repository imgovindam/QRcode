import React, { useRef, useState } from "react";
// import qrcode from "qrcode";
import { BrowserMultiFormatReader, MultiFormatReader } from "@zxing/library";
// import QrReader from "react-qr-reader";
import Barcode from "react-barcode";
// import Quagga from "quagga";
// import QRCode from "@zxing/library/esm/core/qrcode/encoder/QRCode";

const BarcodeGenerator = () => {
  const qrRef = useRef(null);
  const [fileResult, setFileResult] = useState();
  const [webcamResult, setwebcamResult] = useState();
  const [text, setText] = useState(" ");
  const [imageQR, setImageQR] = useState();

  const handleWebcamScan = async () => {
    const codeReader = new BrowserMultiFormatReader();
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: { facingMode: "face" },
      });
      const result = await codeReader.decodeFromStream(stream);
      webcamResult(result.text);
    } catch (error) {
      console.error("Error scanning barcode:", error);
    }
  };
  const generateBarcode = async () => {
    let image = await BarcodeGenerator.toDataURL(text);
    setImageQR(image);
  };

  const openDialog = () => {
    qrRef.current.openImageDialog();
  };
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
          value={text}
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
          <div className="card col-sm-4 m-2">
            <MultiFormatReader
              ref={qrRef}
              delay={300}
              onError={webcamError}
              onScan={webcamScan}
              legacyMode={false}
              facingMode={"environment"}
            />

            <div className="card-footer rounded mb-1">
              <h6>webcam Result:{webcamResult}</h6>
              <button
                className="sm-2 btn btn-success m-2 mt-4"
                onClick={handleWebcamScan}
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
