import React, { Fragment, useEffect, useState } from "react";
import MetaData from "../../Meta/MetaData";
import { getAllXeForTable, getPrice, getRoadPrice } from "../../services/CarServies";
import Sidebar from "../Sidebar";


const GetRoadPrice = () => {

    const [maXe, setMaXe] = useState('');
    const [baoHiem, setBaoHiem] = useState('');
    const [duongBo, setDuongBo] = useState('');
    const [result, setResult] = useState('');




    const handleGetPrice = async () => {
        let res = await getRoadPrice(maXe, baoHiem, duongBo)
       
        setResult(res.data)
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
                            <h1 className="fw-bold m-auto text-center">Tính giá lăn bánh</h1>
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





                                            <div class="form-group">
                                                <div class="">

                                                    <select
                                                        class="form-select form-select-lg"
                                                        name=""
                                                        id=""
                                                        className="selected-for-roadPrice"
                                                        required
                                                    >
                                                        <option value="">Chọn tỉnh thành</option>
                                                        <option value="">Cần thơ</option>
                                                   
                                                    </select>
                                                </div>

                                            </div>
                                            <div class="form-group">
                                                <div class="">

                                                    <select
                                                        class="form-select form-select-lg"
                                                        name=""
                                                        id=""
                                                        className="selected-for-roadPrice"
                                                        required
                                                        value={baoHiem}
                                                        onChange={(e) => setBaoHiem(e.target.value)}
                                                    >
                                                        <option value="">Chọn số năm đóng bảo hiểm</option>
                                                        <option value="1">1</option>
                                                        <option value="2">2</option>
                                                        <option value="3">3</option>
                                                        <option value="4">4</option>
                                             
                                                    </select>
                                                </div>

                                            </div>
                                            <div class="form-group">
                                                <div class="">

                                                    <select
                                                        class="form-select form-select-lg"
                                                        name=""
                                                        id=""
                                                        className="selected-for-roadPrice"
                                                        required
                                                        value={duongBo}
                                                        onChange={(e) => setDuongBo(e.target.value)}
                                                        
                                                    >
                                                        <option value="">Chọn số năm đóng phí đường bộ</option>
                                                        <option value="1">1</option>
                                                        <option value="2">2</option>
                                                        <option value="3">3</option>
                                                        <option value="4">4</option>
                                                     
                                                    </select>
                                                </div>

                                            </div>


                                            <button className="btn-getprice" onClick={handleGetPrice}>Lấy giá</button>
                                        </div>
                                    </div>

                                    {result && (
                                        result.price == null ? (
                                            <div className="result-container-error">
                                                Lỗi: Data nhập chưa chính xác. Vui lòng nhập lại
                                            </div>
                                        ) : (
                                            <div className="result-container-success">
                                                <span>Giá xe lăn bánh là: </span>
                                                <span style={{ color: "red" }}>{parseInt(result.price).toLocaleString()} đ</span>
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

export default GetRoadPrice;
