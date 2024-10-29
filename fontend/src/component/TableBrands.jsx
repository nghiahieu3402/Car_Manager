import { useState } from "react";
import { Table } from "react-bootstrap";

const TableBrands = ({ listBrands, result }) => {
    const [isShowModalEdit, setIsShowModalEdit] = useState(false);
    const [isShowModalDelete, setIsShowModalDelete] = useState(false);

    const closeModal = () => {
        setIsShowModalEdit(false);
        setIsShowModalDelete(false);
    };

    return (
        <>
            {listBrands && (
                <div className={result ? "result-container-success" : "table-container"}>
                    <Table style={{ tableLayout: "auto", width: '100%' }} striped bordered hover>
                        <thead>
                            <tr>
                                <th className="text-center">Hãng</th>
                                <th className="text-center">Mã hãng</th>
                                <th className="text-center">Tên hãng</th>
                            </tr>
                        </thead>
                        <tbody>
                            {listBrands.map((item, index) => (
                                <tr key={index}>
                                    <td className="text-center">
                                        <img
                                            src={`/logoCar/${item[1]}.png`}
                                            alt={`${item[1]} logo`}
                                            style={{ maxWidth: "100px" }}
                                        />
                                    </td>
                                    <td className="text-center">{item[0]}</td>
                                    <td className="text-center">{item[1]}</td>
                                </tr>
                            ))}
                        </tbody>
                    </Table>
                </div>
            )}
        </>
    );
};

export default TableBrands;
