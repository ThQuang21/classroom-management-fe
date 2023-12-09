import './Profile.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';
import '@fortawesome/fontawesome-free/css/all.min.css';
import React, {createRef, useState} from 'react';
import ReactCrop, { centerCrop, makeAspectCrop } from 'react-image-crop'
import 'react-image-crop/dist/ReactCrop.css'
import GoogleIcon from '@mui/icons-material/Google';
import FacebookIcon from '@mui/icons-material/Facebook';

const ASPECT_RATIO = 1;
const MIN_DIMENSION = 150;

export default function Profile() {
    const fileRef = createRef();

    const [imgSrc, setImgSrc] = useState("");
    const [crop, setCrop] = useState();

    const onFileInputChange = (e) => {
        const file = e.target?.files?.[0];
        if (!file) {
            return;
        }

        const reader = new FileReader();
        reader.addEventListener("load", () => {
            const imageUrl = reader.result?.toString() || "";
            console.log(imageUrl);
            setImgSrc(imageUrl)
        })
        reader.readAsDataURL(file)
    }

    const onImageLoad = (e) => {
        const {width,height} = e.currentTarget;
        const crop = makeAspectCrop(
            {
                unit: "px",
                width: MIN_DIMENSION,
            },
            ASPECT_RATIO,
            width,
            height
        )
        const centeredCrop = centerCrop(crop,width,height);
        setCrop(crop);
    }

    return (
        <div class="container-xl px-4 mt-4">
            <hr class="mt-0 mb-4" />
            <div class="row">
                <div class="col-xl-4">
                    {/* <!-- Profile picture card--> */}
                    <div class="card mb-4 mb-xl-0">
                        <div class="card-header">Profile Picture</div>
                        <div class="card-body text-center">    
                            <input
                                type="file"
                                accept="image/png,image/jpeg,image/gif"
                                style={{display: 'none'}}
                                ref={fileRef}
                                onChange={onFileInputChange}
                            />                  
                            {/* {imgSrc && (
                                    <div class="avatar-wrapper">
                                        <ReactCrop
                                            crop={crop}
                                            onChange={
                                                (pixelCrop, percentCrop) => setCrop(pixelCrop) //13:09 
                                            }
                                            circularCrop
                                            keepSelection
                                            aspect={ASPECT_RATIO}
                                            minWidth={MIN_DIMENSION}
                                        >
                                            <img 
                                                class="profile-pic"
                                                src={imgSrc}
                                                alt="Upload"
                                                onload={onImageLoad}
                                            />
                                        </ReactCrop>
                                    </div>
                            )}     */}
                            <div class="avatar-wrapper">
                                <image class="profile-pic" src=" " alt=""></image>
                            </div>
                            <button class="btn btn-primary" type="button" onClick={() => fileRef.current?.click()} >
                                Upload new image
                            </button>
                        </div>
                    </div>
                </div>
                <div class="col-xl-8">
                    <div class="card mb-4">
                        <div class="card-header">Account Details</div>
                        <div class="card-body">
                            <form>

                                <div class="mb-3">
                                    <label class="small mb-1" for="inputAccountID">AccountID </label>
                                    <input class="form-control" id="inputAccountID" type="text" placeholder="Enter your username" value="1" />
                                </div>

                                <div class="mb-3">
                                    <label class="small mb-1" for="inputUsername">Username </label>
                                    <input class="form-control" id="inputUsername" type="text" placeholder="Enter your username" value="TT" />
                                </div>

                                <div class="mb-3">
                                    <label class="small mb-1" for="inputEmailAddress">Email address</label>
                                    <input class="form-control" id="inputEmailAddress" type="email" placeholder="Enter your email address" value="tt@gmail.com" />
                                </div>

                                <div class="mb-3">
                                    <label class="small mb-1"> Link account <FacebookIcon color="primary" /> <GoogleIcon color="success" /> </label>
                                </div>

                                {/* <div class="row gx-3 mb-3">

                                    <div class="col-md-6">
                                        <label class="small mb-1" for="inputFirstName">First name</label>
                                        <input class="form-control" id="inputFirstName" type="text" placeholder="Enter your first name" value="" />
                                    </div>

                                    <div class="col-md-6">
                                        <label class="small mb-1" for="inputLastName">Last name</label>
                                        <input class="form-control" id="inputLastName" type="text" placeholder="Enter your last name" value="" />
                                    </div>
                                </div> */}
                                <button class="btn btn-primary" type="button">Save changes</button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}