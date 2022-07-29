import React from "react";
import AWS, {Credentials} from "aws-sdk";
import {imageType, resultType} from "./type";

type InputImageProps = {
    setImage: (param: imageType) => void;
    setResult: (param: resultType) => void
}

const InputImage: React.FC<InputImageProps> = (props) => {
    const {setImage, setResult} = props;

    const getImage = async (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files == null) {
            return null;
        }
        let file = e.target.files[0];
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => {
            setImage(reader.result);
        }
    }

    const ProcessImage = (event: React.ChangeEvent<HTMLInputElement>) => {
        AnonLog();
        let file = event.target.files![0];
        let reader = new FileReader();
        reader.onload = (function (theFile) {
            return function (e: any) {
                AWS.config.region = 'eu-west-2';
                let rekognition = new AWS.Rekognition();
                let params = {
                    Image: {
                        Bytes: e.target.result
                    },
                    Attributes: [
                        'ALL',
                    ]
                };
                rekognition.detectFaces(params, async function (err, data) {
                    if (err) {
                        setResult(null);
                        console.log(err, err.stack);
                    } else {
                        setResult(Object.entries(data.FaceDetails![0]));
                    }
                });
            }
        })(file);
        reader.readAsArrayBuffer(file);
    }

    const AnonLog = () => {
        AWS.config.region = 'eu-west-2';
        AWS.config.credentials = new AWS.CognitoIdentityCredentials({
            IdentityPoolId: 'eu-west-2:371cdf1c-657e-4e3f-a6a0-3cdcf905bfdc',
        });
        (AWS.config.credentials as Credentials).get(function () {
            let accessKeyId = AWS.config.credentials?.accessKeyId;
            let secretAccessKey = AWS.config.credentials?.secretAccessKey;
            let sessionToken = AWS.config.credentials?.sessionToken;
        });
    }
    return (
        <>
            <input type={"file"} accept={"image/*,.png,.jpg,.jpeg"}
                   className="btn btn-primary"
                   onChange={async (e: React.ChangeEvent<HTMLInputElement>) => {
                       await getImage(e);
                       ProcessImage(e);
                   }}
            />
        </>
    )
}

export default InputImage