import { useEffect, useMemo, useState } from 'react';
import db from '../firebase';
import { BiEdit } from 'react-icons/bi';
import { MdDeleteOutline } from 'react-icons/md'
import AddOrEditProduct from './addOrEditProduct';

const CourseInfo = () => {
    const [currentId, setCurrentId] = useState('')
    const [productObject, setProductObject] = useState({})
    const data = useMemo(() => Object.keys(productObject), [productObject])

    useEffect(() => {
        db.child('productRecord').on('value', snapshot => {
            if (snapshot.val() !== null) {
                setProductObject({
                    ...snapshot.val()
                })
            } else {
                setProductObject({})
            }
        })
    }, [])

    const addOrEdit = async (obj, image) => {

        const body = {
            ProductDes: obj.ProductDes,
            ProductImage: image,
            ProductName: obj.ProductName,
            ProductPrice: obj.ProductPrice
        }

        if (currentId === '') {
            db.child('productRecord').push(
                body,
                err => {
                    if (err)
                        console.log(err, "err")
                    else
                        setCurrentId('')
                }
            )
        } else {
            db.child(`productRecord/${currentId}`).set(
                body,
                err => {
                    if (err) console.log(err, "errrrrr")
                    else setCurrentId('')
                }
            )
        }
    }

    
    const onDelete = (id) => {
        if (window.confirm('Are you sure to delete this record?')) {
            db.child(`productRecord/${id}`).remove(
                err => {
                    if (err)
                        console.log(err, "delete err")
                    else
                        setCurrentId('')
                }
            )
        }
    }

    return (
        <div className="card">
            <div className="card-body pb-0">
                <div className="row">
                    <AddOrEditProduct {...({ currentId, productObject, addOrEdit })}></AddOrEditProduct>
                    <div className="col-12 mt-3 mb-3">
                        <div className="card">
                            <div className="card-header main-search dash-search text-white flex justify-content-center align-item-center web_bg fs-5">Manage Products</div>
                            <div className="card-body position-relative">
                                <div className="table-responsive cnstr-record product-tbl">
                                    <table className="table table-bordered heading-hvr table-striped">
                                        <thead>
                                            <tr className='web_bg text-white'>
                                                <th className="active whitespace-nowrap">Product Image</th>
                                                <th className='whitespace-nowrap' >Product Name</th>
                                                <th className='whitespace-nowrap' >Product Description</th>
                                                <th className='whitespace-nowrap' >Product Price</th>
                                                <th className='whitespace-nowrap' width="60">Edit</th>
                                                <th className='whitespace-nowrap' width="60">Delete</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {
                                                data.map((item, index) => {
                                                    return (
                                                        <tr key={item}>
                                                            <td>
                                                                <div style={{ width: '50px', margin: 'auto' }}>
                                                                    <img src={productObject[item]?.ProductImage} alt={data[index]} srcSet="" style={{ width: '100%', mixBlendMode: 'darken' }} />
                                                                </div>
                                                            </td>
                                                            <td>{productObject[item]?.ProductName}</td>
                                                            <td>{productObject[item]?.ProductDes}</td>
                                                            <td>₹ {productObject[item]?.ProductPrice}</td>
                                                            <td className='case-record'>
                                                                <button type="button" className='btn btn-outline-warning'
                                                                    onClick={() => { setCurrentId(item) }}><BiEdit /></button>
                                                            </td>
                                                            <td>
                                                                <button type='button' className='btn btn-outline-danger'
                                                                    onClick={() => { onDelete(item) }}><MdDeleteOutline /></button>
                                                            </td>
                                                        </tr>
                                                    )
                                                })
                                            }
                                            {/* {
                                                data?.map((item) => (
                                                    <tr key={item}>
                                                        <td>{productObject[item]?.ProductName}</td>
                                                        <td>{productObject[item]?.ProductDes}</td>
                                                        <td>{productObject[item]?.ProductPrice}</td>
                                                        <td className='case-record'>
                                                            <button type="button" className='btn btn-outline-warning'
                                                                onClick={() => { setCurrentId(item) }}><BiEdit /></button>
                                                        </td>
                                                        <td>
                                                            <button type='button' className='btn btn-outline-danger'
                                                                onClick={() => { onDelete(item) }}><MdDeleteOutline /></button>
                                                        </td>
                                                    </tr>
                                                ))
                                            } */}
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default CourseInfo;