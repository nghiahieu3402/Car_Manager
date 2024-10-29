import { Modal } from "antd";
import { toast } from "react-toastify";
import { deleteACar } from "../services/CarServies";

const ModalDelete = (props) => {
  const { isModalVisible, handleCloseModal, fetch, id, type } = props;

  const handleSubmit = async () => {
 
    try {
      if (type === "xe") {
        console.log(id)
        let res = await deleteACar(id);
        handleCloseModal();
        toast.success("Delete Success");
        fetch();
      } else {
      
        handleCloseModal();
        toast.success("Delete Success");
        fetch();
      }
    } catch (err) {
      console.log(err);
      toast.error("Delete Failed");
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
          <p style={{ fontWeight: "bold" }}>
            Bạn có chắc chắn muốn xoá không hả?
          </p>
        </div>
      </Modal>
    </>
  );
};

export default ModalDelete;
