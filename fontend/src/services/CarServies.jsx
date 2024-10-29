import axios from "axios";

const getAllXeForTable = () => {

    return (axios.get("http://localhost:5000/getAllCar"));
}


const addNewCar = (data) => {

    return (axios.post("http://localhost:5000/insertXe", data));
}

const getAllDongCo = () => {

    return (axios.get("http://localhost:5000/getDongCo"));
}

const getAllPhanKhuc = () => {

    return (axios.get("http://localhost:5000/getPhanKhuc"));
}


const getAllHangXe = () => {

    return (axios.get("http://localhost:5000/getHangXe"));
}


const getAllPhienBan = () => {

    return (axios.get("http://localhost:5000/getPhienBan"));
}


const deleteACar = (id) => {

    return (axios.delete(`http://localhost:5000/deleteXe?id=${id}`));
}

const getPrice = (id) => {

    return (axios.get(`http://localhost:5000/getPrice?maXe=${id}`))

}

const updatePrice = (data) => {
    getMaxBrandsPrice

    return (axios.put(`http://localhost:5000/updatePrice`, data))

}


const getMaxBrandsPrice = () => {

    return (axios.get(`http://localhost:5000/getMaxBrandsPrice`))

}



const getMaxModelPrice = () => {

    return (axios.get(`http://localhost:5000/getMaxModelPrice`))

}


const getRoadPrice = (id, baohiem, dbo) => {
    return axios.get(`http://localhost:5000/getRoadPrice?id=${id}&baohiem=${baohiem}&duongbo=${dbo}`);


}

export { getAllXeForTable, addNewCar, getAllPhanKhuc, getAllDongCo, getAllHangXe, getRoadPrice, getAllPhienBan, deleteACar, updatePrice, getPrice, getMaxBrandsPrice, getMaxModelPrice }
