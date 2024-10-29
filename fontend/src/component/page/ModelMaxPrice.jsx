import React, { Fragment, useEffect, useState } from "react";
import MetaData from "../../Meta/MetaData";
import { getAllXeForTable, getPrice } from "../../services/CarServies";
import Sidebar from "../Sidebar";


const ModelMaxPrice = () => {
   
    const [maXe, setMaXe] = useState('');
    const [result, setResult] = useState('');

    useEffect(() => {

    }, []);

    const handleGetPrice = async () => {
        console.log(maXe)
        let res = await getPrice(maXe);
        setResult(res.data)
        console.log(res.data)
    }


    return (
        <>
            <div className="grid-bg ba-grid anim">
                <div className="inner">
                    <div className="row">
                        <div className="col-12 col-md-3 ">
                            <Sidebar />
                        </div>
                        <div className="col-12 col-md-9 text-center full-width">
                            <h1 className="fw-bold m-auto text-center">Lấy giá nhanh</h1>
                            <Fragment>
                                <MetaData title={'Get Price'} />
                            </Fragment>
                            <div className='row'>
                                <div className='col-md-12 my-3'>
                                    <div class="form-container my-3">
                                        <div className="">
                                            <div class="form-group">

                                                <input type="text" id="fullname" name="fullname" placeholder="Nhập mã xe" value={maXe} onChange={(e) => setMaXe(e.target.value)} />
                                            </div>
                                            <button className="btn-getprice" onClick={handleGetPrice}>Lấy giá</button>
                                        </div>
                                    </div>

                                    {result && (
                                    result.price ==null ? (
                                        <div className="result-container-error">
                                            Lỗi: Mã xe không tồn tại. Vui lòng nhập lại
                                        </div>
                                    ) : (
                                        <div className="result-container-success">
                                            <span>Giá niêm yết của xe là: </span>
                                            <span style={{color:"red"}}>{parseInt(result.price).toLocaleString()} đ</span>
                                        </div>
                                    )
                                )}

                                </div>



                                

                            </div>
                        </div>
                    </div>
                </div>
            </div>



        </>
    );
};

export default ModelMaxPrice;
