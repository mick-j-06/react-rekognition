import React, {useEffect, useState} from "react";
import Result from "../Result/Result";
import {DisplayImageAndResultProps} from "../type";
import './RenderImageAndResult.css'

const RenderImageAndResult: React.FC<DisplayImageAndResultProps> = (props) => {
    const {image, result, previous, next} = props;

    // TODO : position card face rectification => 2 ;
    const [style, setStyle] = useState<any>(null);
    const [boundingBox, setBoundingBox] = useState<any>(null);

    useEffect(() => {
        if (typeof result != "undefined" && result != null) {
            setBoundingBox(result![0][1]);
        }
    }, [result]);

    useEffect(() => {
        if (boundingBox != null) {
            let width = document.getElementById('container-image')!.offsetWidth;
            let height = document.getElementById('container-image')!.offsetHeight;
            setStyle({
                "marginLeft": boundingBox.Left * width + "px",
                "marginTop": boundingBox.Top * height + "px",
                "width": boundingBox.Width * width + "px",
                "height": boundingBox.Height * height + "px"
            })
        }
    }, [boundingBox])

    return (
        <>
            {typeof image === 'string'
                ? (
                    <>
                        <hr/>
                        <div className="row">
                            <div className="col-md-5 content-center">
                                <div id={"container-image"} className={"container-image"}>
                                    <img id={"image-render"}
                                         className="image bd-placeholder-img bd-placeholder-img-lg img-fluid mx-auto"
                                         src={image}
                                         alt={"face"}
                                    />
                                </div>
                                {
                                    (style !== null ?
                                            (<div className={"card-face"} style={style}></div>)
                                            : (<></>)
                                    )
                                }
                            </div>
                            <div className="col-md-7">
                                <h2>
                                    Face
                                    <span className="text-muted"> details</span>
                                </h2>
                                <div className={"d-flex w-100 align-items-center justify-content-between m-3"}>
                                    <button className={"btn btn-outline-secondary btn-sm"} onClick={previous}>Previous</button>
                                    <button className={"btn btn-outline-secondary btn-sm"} onClick={next}>Next</button>
                                </div>
                                {
                                    (result === undefined || result === null) ?
                                        (result === undefined) ?
                                            (
                                                <>
                                                    <div className="px-4 py-5 my-5 text-center">
                                                        <div className="d-flex justify-content-center">
                                                            <div className="spinner-border" role="status"></div>
                                                        </div>
                                                    </div>
                                                </>
                                            ) : (
                                                <>
                                                    <div className="px-4 py-5 my-5 text-center">
                                                        <div className="alert alert-dismissible" role="alert">
                                                            <h4 className="alert-heading">Network Error</h4>
                                                            <hr/>
                                                            <p className="mb-0">The network connection is lost</p>
                                                        </div>
                                                    </div>
                                                </>
                                            )
                                        : (
                                            <div
                                                className="d-flex flex-column align-items-stretch flex-shrink-0 bg-white">
                                                <Result result={result}/>
                                            </div>
                                        )
                                }
                            </div>
                        </div>
                        <hr/>
                    </>
                )
                : (<></>)
            }
        </>
    )
}

export default RenderImageAndResult;
