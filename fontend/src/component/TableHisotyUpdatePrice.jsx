import { useState } from "react";
import { Table } from "react-bootstrap";

const TableHisotyUpdatePrice = ({ listHistory,result }) => {
 

    return (
        <>
            {listHistory && (
                <div className={result ? "result-container-success" : "table-container"}>
                    <Table style={{ tableLayout: "auto", width: '100%' }} striped bordered hover>
                        <thead>
                            <tr>
                                <th className="text-center">STT</th>
                                <th className="text-center">Tài khoản</th>
                                <th className="text-center">Thời gian</th>
                                <th className="text-center">Mã xe</th>
                            </tr>
                        </thead>
                        <tbody>
                            {listHistory.map((item, index) => (
                                <tr>
                                    <td className="text-center">{index+1}</td>
                                    <td className="text-center">{item[0]}</td>
                                    <td className="text-center">{item[1]}</td>
                                    <td className="text-center">{item[2]}</td>
                                </tr>
                            ))}
                        </tbody>
                    </Table>
                </div>
            )}
        </>
    );
};

export default TableHisotyUpdatePrice;
