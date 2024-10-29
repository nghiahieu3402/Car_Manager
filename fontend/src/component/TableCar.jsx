import { MdDelete } from "react-icons/md";
import Table from 'react-bootstrap/Table';
import { TfiWrite } from "react-icons/tfi";
import { useState } from "react";
import ModalDelete from "./ModalDelete";
import ModalEditPriceCar from "./ModalEditCar";
const TableCar = (props) => {
    const { listCar, fetch } = props
    const [temp, setTemp] = useState('')
    const [isShowModalEdit, setIsShowModalEdit] = useState(false)
    const [isShowModalDelete, setIsShowModalDelete] = useState(false)
    const [newPrice, setNewPrice] = useState('')


    const CloseModal = () => {
        setIsShowModalEdit(false)
        setIsShowModalDelete(false)
    }

    return (<>

        {listCar &&
            <div className="table-container">

                <Table style={{ tableLayout: "auto", width: '100%' }} striped bordered hover>
                    <thead>
                        <tr>
                            <th className="text-center">Hãng xe</th>
                            <th className="text-center">Dòng xe</th>
                            <th className="text-center">Phiên bản</th>
                            <th className="text-center">Phân khúc</th>
                            <th className="text-center">Động cơ</th>
                            <th className="text-center">Giá niêm yết</th>
                            <th className="text-center">Đàm phán</th>
                            <th className="text-center">Thao tác</th>


                        </tr>
                    </thead>
                    <tbody>
                        {listCar && listCar.length > 0 && listCar.map((item, index) => (
                            <tr key={index}>
                                <td className="text-center">{item[1]}</td>
                                <td className="text-center">{item[2]}</td>
                                <td className="text-center">{item[3]}</td>
                                <td className="text-center">{item[4]}</td>
                                <td className="text-center">{item[5]}</td>
                                <td className="text-center">{parseInt(item[6]).toLocaleString()} đ</td>
                                <td className="text-center">{item[7]}</td>
                                <td>
                                    <button type="button" className="btn btn-success mx-2" onClick={() => {
                                        setTemp(item[0]);
                                        setNewPrice(item[6])
                                        setIsShowModalEdit(true);
                                    }}>
                                        <span className="mx-1"><TfiWrite /></span>
                                        Sửa giá
                                    </button>
                                    <button type="button" className="btn btn-danger" onClick={() => {
                                        setTemp(item[0]);
                                        setIsShowModalDelete(true);
                                    }}>
                                        <span><MdDelete /></span>Xoá
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </Table>

            </div>
        }
        <ModalEditPriceCar
            isModalVisible={isShowModalEdit}
            handleCloseModal={CloseModal}
            id={temp}
            fetch={fetch}
            old_price={newPrice}

        />

        <ModalDelete
            isModalVisible={isShowModalDelete}
            handleCloseModal={CloseModal}
            id={temp}
            type='xe'
            fetch={fetch}

        />
    </>)



}


export default TableCar