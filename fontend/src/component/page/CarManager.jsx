import React, { Fragment, useEffect, useState } from "react";
import { FaPlusCircle } from "react-icons/fa";
import { Input, Space } from 'antd';
import MetaData from "../../Meta/MetaData";
import ModalAddNewCar from "../ModalAddNewCar";
import TableCar from "../TableCar";
import { getAllXeForTable } from "../../services/CarServies";
import Sidebar from "../Sidebar";


const CarManager = () => {
    const [car, setListCar] = useState([]);
    const [isShowModal, setIsShowModal] = useState(false);

    useEffect(() => {
        fetchData()
    }, []);

    const fetchData = async () => {
        try {
            let res = await getAllXeForTable();
            setListCar(res.data);
            console.log("fetch")

        } catch (error) {
            console.error(error);
        }
    };


    const CloseModal = () => {
        setIsShowModal(false);
    };

    return (
        <>
            <div className="grid-bg ba-grid anim">
                <div className="inner">
                    <div className="row">
                        <div className="col-12 col-md-3 ">
                            {/* <div className="position-fixed col-md-3 col-12"> */}
                                <Sidebar />
                            {/* </div> */}
                        </div>
                        <div className="col-12 col-md-9 text-center full-width">
                            <div className="d-flex justify-content-between">
                                <h1 className="fw-bold m-auto">Quản lý xe</h1>
                                <button
                                    type="button"
                                    style={{ height: "90%" }}
                                    className="btn btn-warning my-auto mx-2"
                                    onClick={() => setIsShowModal(true)}
                                >
                                    <FaPlusCircle className="mx-2" />
                                    Thêm xe mới
                                </button>

                             
                            </div>
                            <Fragment>
                                <MetaData title={'Car Manager'} />

                                {/* Render car Table */}
                            </Fragment>
                            <div className='row'>
                                <div className='col-md-12 my-3'>
                                    <TableCar listCar={car} fetch={fetchData} />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>


            <ModalAddNewCar
                isModalVisible={isShowModal}
                handleCloseModal={CloseModal}
                fetch={fetchData}
            />
        </>
    );
};

export default CarManager;
