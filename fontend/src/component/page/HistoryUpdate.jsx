import React, { Fragment, useEffect, useState } from "react";
import MetaData from "../../Meta/MetaData";
import { getAllHangXe, getAllXeForTable, getHistoryUpdate, getMaxBrandsPrice, getPrice } from "../../services/CarServies";
import Sidebar from "../Sidebar";
import TableBrands from "../TableBrands";
import { FaPlusCircle, FaSearchDollar } from "react-icons/fa";
import { toast } from "react-toastify";
import TableHisotyUpdatePrice from "../TableHisotyUpdatePrice";



const HistoryUpdate = () => {
    const [listHistory, setListHistory] = useState([]);
    const [isShowModal, setIsShowModal] = useState(false);
    const [result, setResult] = useState(false);



    useEffect(() => {
        fetchData()
    }, []);

    const fetchData = async () => {

        let res = await getHistoryUpdate();
        setListHistory(res.data)
        setResult(true)

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
                            <div className="d-flex justify-content-between">
                                <h1 className="fw-bold m-auto">Lịch sử sửa giá</h1>
                                {/* <button
                                    type="button"
                                    style={{ height: "90%" }}
                                    className="btn btn-primary my-auto mx-2"
                                    onClick={handleGetMaxBrandsPrice}
                                >
                                    <FaSearchDollar className="mx-2" />

                                    Giá cao nhất
                                </button> */}


                            </div>

                            <Fragment>
                                <MetaData title={'Lấy hãng giá cao nhất'} />
                            </Fragment>
                            <div className='row'>
                                <div className='col-md-12 my-3'>


                                    <TableHisotyUpdatePrice listHistory={listHistory}  result={result}/>



                                </div>





                            </div>
                        </div>
                    </div>
                </div>
            </div>



        </>
    );
};

export default HistoryUpdate;
