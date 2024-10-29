import { Modal } from 'antd';
import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import 'react-quill/dist/quill.snow.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { addNewCar, getAllDongCo, getAllHangXe, getAllPhanKhuc, getAllPhienBan } from '../services/CarServies';

const ModalAddNewCar = ({ isModalVisible, handleCloseModal, fetch }) => {
    const [describe, setDescribe] = useState('');
    const [id_product, setIdProduct] = useState('');
    const [name, setName] = useState('');
    const [price, setPrice] = useState('');
    const [selectedDongCo, setSelectedDongCo] = useState('');
    const [selectedHangXe, setSelectedHangXe] = useState('');
    const [selectedPhanKhuc, setSelectedPhanKhuc] = useState('');
    const [selectedPhienBan, setSelectedPhienBan] = useState('');
    const [loading, setLoading] = useState(false);
    const [listDongCo, setListDongCo] = useState([]);
    const [listPhanKhuc, setListPhanKhuc] = useState([]);
    const [listHangXe, setListHangXe] = useState([]);
    const [listPhienBan, setListPhienBan] = useState([]);
    const [phienban, setphienban] = useState('');
    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
 
        try {
            let dataDongCo = await getAllDongCo();
            setListDongCo(dataDongCo.data);

            let dataPhanKhuc = await getAllPhanKhuc();
            setListPhanKhuc(dataPhanKhuc.data);

            let dataHangXe = await getAllHangXe();
            setListHangXe(dataHangXe.data);

            let dataPhienBan = await getAllPhienBan();
            setListPhienBan(dataPhienBan.data);

        } catch (err) {
            console.log(err);
        }
    };



    const handleSubmit = async () => {
        setLoading(true);
        let data = {
            id_product,
            phienban,
            name,
            selectedHangXe,
            selectedPhanKhuc,
            selectedDongCo,
            price,
            describe,
        }
        console.log(data)
        try {
            let res = await addNewCar(data);
            console.log(res.data.message )
            if (res.data.message) {
                handleCloseModal();
                toast.success('Success');
                fetch();
            }else
            { toast.error(res.data);}
        } catch (error) {
            console.log(err)
        } finally {
            setLoading(false);
        }
    };

    return (
        <Modal
            title=""
            visible={isModalVisible}
            onOk={handleSubmit}
            onCancel={handleCloseModal}
            confirmLoading={loading}
        >
            <div className="product-manager">
                <h4 className="text-center mt-2 mb-3">Thêm mới sản phẩm</h4>
                <div className="action mb-4">
                    <div className="frms container">
                        <div className="form-group">
                            <label htmlFor="code">Mã Xe:</label>
                            <input
                                type="text"
                                className="form-control"
                                id="code"
                                placeholder="Nhập mã xe"
                                value={id_product}
                                onChange={(e) => setIdProduct(e.target.value)}
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="category">Hãng Xe:</label>
                            <select
                                className="form-control"
                                id="category"
                                value={selectedHangXe}
                                onChange={async (e) => setSelectedHangXe(e.target.value)}
                            >
                                <option value="">Chọn hãng xe</option>
                                {listHangXe.map((item, index) => (
                                    <option key={index} value={item[0]}>{item[1]}</option>
                                ))}
                            </select>
                        </div>
                        <div className="form-group">
                            <label htmlFor="name">Tên Dòng Xe:</label>
                            <input
                                type="text"
                                className="form-control"
                                id="name"
                                placeholder="Nhập tên dòng xe"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="engineType">Loại động cơ:</label>
                            <select
                                className="form-control"
                                id="engineType"
                                value={selectedDongCo}
                                onChange={(e) => setSelectedDongCo(e.target.value)}
                            >
                                <option value="">Chọn loại động cơ</option>
                                {listDongCo.map((item, index) => (
                                    <option key={index} value={item[0]}>{item[1]}</option>
                                ))}
                            </select>
                        </div>
                        <div className="form-group">
                            <label htmlFor="segment">Phân khúc:</label>
                            <select
                                className="form-control"
                                id="segment"
                                value={selectedPhanKhuc}
                                onChange={(e) => setSelectedPhanKhuc(e.target.value)}
                            >
                                <option value="">Chọn phân khúc</option>
                                {listPhanKhuc.map((item, index) => (
                                    <option key={index} value={item[0]}>{item[1]}</option>
                                ))}
                            </select>
                        </div>
                        <div className="form-group">
                            <label htmlFor="phienBan">Phiên bản:</label>
                           

                            <input
                                type="text"
                                className="form-control"
                                id="name"
                                placeholder="Nhập tên phiên bản"
                                value={phienban}
                                onChange={(e) => setphienban(e.target.value)}
                            />


                        </div>
                        <div className="form-group">
                            <label htmlFor="price">Giá niêm yết:</label>
                            <input
                                type="text"
                                className="form-control"
                                id="price"
                                placeholder="Nhập giá niêm yết"
                                value={price}
                                // onBlur={() => setPrice(parseInt(price).toLocaleString('vi-VN', { style: 'currency', currency: 'VND' }))}
                                style={{ color: "red", fontWeight: "bold" }}
                                onChange={(e) => setPrice(e.target.value)}
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="entry">Khuyến mãi:</label>
                            <input
                                type="text"
                                className="form-control"
                                id="entry"
                                placeholder="Khuyến mãi"
                                value={describe}
                                onChange={(e) => setDescribe(e.target.value)}
                            />
                        </div>
                    </div>
                </div>
            </div>
        </Modal>
    );
};

export default ModalAddNewCar;
