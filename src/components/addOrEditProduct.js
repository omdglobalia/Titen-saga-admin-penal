import React, { useState, useEffect } from 'react';
import { storage } from '../firebase';
import { ref, getDownloadURL, uploadBytesResumable } from "firebase/storage";

const initialFieldValues = {
    ProductImage: '',
    ProductName: '',
    ProductDes: '',
    ProductPrice: '',
}

const AddOrEditCourse = (props) => {

    const [values, setValues] = useState(initialFieldValues)
    const [imgUrl, setImgUrl] = useState(null);
    const [progresspercent, setProgresspercent] = useState(0);

    useEffect(() => {
        if (props.currentId === '') {
            setValues({ ...initialFieldValues })
        }
        else {
            setValues({
                ...props.productObject[props?.currentId]
            })
        }
    }, [props.currentId, props.productObject])

    const handleInputChange = e => {
        const { name, value } = e.target
        setValues({
            ...values,
            [name]: value
        })
    }

    const handleFormSubmit = e => {
        e.preventDefault()
        handleImageUpload(e)
        setValues(initialFieldValues)
    }

    const handleImageUpload = async e => {
        // e.preventDefault()
        const file = e.target[0].files[0]
        // if (!file) return toast.warn("Choose a file first!");
        const storageRef = ref(storage, `files/${file?.name}`);
        const uploadTask = uploadBytesResumable(storageRef, file);

        uploadTask.on("state_changed",
            (snapshot) => {
                const progress =
                    Math.round((snapshot.bytesTransferred / snapshot.totalBytes) * 100);
                setProgresspercent(progress);
            },
            (error) => {
                console.log("error")
                // toast.error(error);
            },
            () => {
                getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
                    props.addOrEdit(values, downloadURL);
                    setImgUrl(downloadURL)
                });
                // toast.success("File uploaded successfully!!")
                console.log("sucess")
            }
        );
    }


    return (
        <div className='col-12'>
            <form autoComplete="off" onSubmit={(e) => handleFormSubmit(e)}>
                <div>
                    <div className="card">
                        <div className="card-header main-search dash-search text-white flex justify-content-center align-item-center web_bg fs-5" >
                            <label>{props.currentId === "" ? "Add Product" : "Update Product"} </label>
                        </div>
                        <div className="card-body bg-form text-white">
                            <div className="center-form">
                                <div className="row">
                                    <div className="col-12 mx-auto my-3">
                                        <div className="form-group">
                                            <div className="flex items-center justify-center w-full">
                                                <label htmlFor="dropzone-file" className="flex flex-col items-center justify-center w-full h-30 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 dark:hover:bg-bray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600">
                                                    <div className="flex flex-col items-center justify-center pt-5 pb-6">
                                                        <svg aria-hidden="true" className="w-10 h-10 mb-3 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"></path></svg>
                                                        <p className="mb-2 text-sm text-gray-500 dark:text-gray-400"><span className="font-semibold">Click to upload</span></p>
                                                        <p className="text-xs text-gray-500 dark:text-gray-400">SVG, PNG, JPG or GIF (MAX. 800x400px)</p>
                                                    </div>
                                                    {/* <input id="dropzone-file" type="file" className="hidden" value={values.ProductImage} onChange={handleInputChange} name="ProductImage" /> */}
                                                    <input id="dropzone-file" className="hidden" accept="image/*" type="file" />
                                                </label>
                                            </div>
                                        </div>
                                    </div>
                                    {/* {
                                        !imgUrl ?
                                            <div style={{ marginTop: "10px" }}>{progresspercent}%</div>
                                            : <img style={{ marginTop: "10px" }} src={imgUrl} alt='uploaded file' height="200px" />
                                    } */}
                                    <div className="col-12 col-md-4">
                                        <div className="form-group">
                                            <label className="col-form-label fs-5 text-black fw-normal">Product Name</label>
                                            <input value={values.ProductName}
                                                onChange={handleInputChange} type="text" className="form-control" name="ProductName"
                                            />
                                        </div>
                                    </div>
                                    <div className="col-12 col-md-4">
                                        <div className="form-group">
                                            <label className="col-form-label fs-5 text-black fw-normal">Product Description</label>
                                            <textarea value={values.ProductDes} onChange={handleInputChange} className="form-control" name="ProductDes"
                                            />
                                        </div>
                                    </div>
                                    <div className="col-4 mx-auto">
                                        <div className="form-group">
                                            <label className="col-form-label fs-5 text-black fw-normal">Product Price</label>
                                            <input value={values.ProductPrice} onChange={handleInputChange} type="text" className="form-control" name="ProductPrice"
                                            />
                                        </div>
                                    </div>
                                    <div className="col-12 col-md-12">
                                        <div className="btn-group mb-3 mt-2 cmn-btn-grp">
                                            <input type="submit" value={props.currentId === "" ? "Save" : "Update"} className="btn web_bg text-white btn-block mt-2 px-5" />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </form>
        </div>
    );
}

export default AddOrEditCourse
