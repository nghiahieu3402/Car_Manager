import { Modal } from "antd";
import { toast } from "react-toastify";
import { deleteACar, updatePrice } from "../services/CarServies";
import { useEffect, useState } from "react";

const ModalEditPriceCar = (props) => {
    const { isModalVisible, handleCloseModal, fetch, id, old_price } = props;
    const [newPrice, setNewPrice] = useState('')
 


    useEffect(() => {
        setNewPrice(old_price);
    }, [isModalVisible])

    const handleSubmit = async () => {

        try {

            let res = await updatePrice({ id, newPrice });

            if (res.data.message === 'success') {
                handleCloseModal();
                toast.success("Edit Success");
                setNewPrice('')
                fetch();
            } else { toast.error("Edit Failed"); }

        } catch (err) {
            console.log(err);
            toast.error("Edit Failed");
        }
    };

    return (
        <>
            <Modal
                title=""
                open={isModalVisible}
                onOk={handleSubmit}
                onCancel={handleCloseModal}
            >
                <div>
                    <h4 className="text-center">Sửa giá xe</h4>
                    <div class="form-container my-3">
                        <div className="">
                            <div class="form-group">

                                <input type="text" id="fullname" name="fullname" placeholder="Nhập mã xe" value={newPrice} onChange={(e) => setNewPrice(e.target.value)} />
                            </div>

                        </div>
                    </div>


                </div>
            </Modal>
        </>
    );
};

export default ModalEditPriceCar;
