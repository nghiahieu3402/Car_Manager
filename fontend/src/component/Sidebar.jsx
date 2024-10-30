import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { MdDashboard } from "react-icons/md";
import { MdOutlineMarkUnreadChatAlt } from "react-icons/md";
import { IoLogoModelS } from "react-icons/io";
import viteLogo from '../assets/react.svg';
import { TbBrandArc } from "react-icons/tb";
import { FaCarSide, FaHistory } from "react-icons/fa";
import { MdAttachMoney } from "react-icons/md";
import { MdOutlineCalculate } from "react-icons/md";


const Sidebar = () => {
    const [admin, setAdmin] = useState('John Doe');

    const handleLogout = () => {
        console.log("Logout clicked");
    };

    return (
        <div className="sidebar">
            <div className="bg-light text-center top-sidder-containter">
                <div>
                    <img src={viteLogo} alt="vite logo" className="img-thumbnail shadow-sm" />
                    <p className="mt-2">Xin chào, <span style={{ color: "#be2edd", fontWeight: "bold" }}>{admin}</span></p>
                    <p className="btn btn-danger font-weight-light btn-sm" onClick={handleLogout}>Đăng xuất</p>
                </div>
            </div>
            <nav id="sidebar">
                <ul className="list-unstyled components">
                    <li>
                        <NavLink to="/" activeClassName="active-link">
                        <FaCarSide />
                        <span className='mx-2'>Quản lý xe</span>
                        </NavLink>
                    </li>
                    <li>
                        <NavLink to="/BrandMaxPrice" activeClassName="active-link">
                            <TbBrandArc />
                            <span className='mx-2'>Quản lý hãng xe</span>
                        </NavLink>
                    </li>
                    <li>
                        <NavLink to="/" activeClassName="active-link">
                        <IoLogoModelS />
                            <span className='mx-2'>Quản lý dòng xe</span>
                        </NavLink>
                    </li>

                    <li>
                        <NavLink to="/GetPrice" activeClassName="active-link">
                        <MdAttachMoney />
                            <span className='mx-2'>Lấy giá nhanh</span>
                        </NavLink>
                    </li>

                    <li>
                        <NavLink to="/Road-price" activeClassName="active-link">
                        <MdOutlineCalculate />
                            <span className='mx-2'>Tính giá lăn bánh</span>
                        </NavLink>
                    </li>

                    <li>
                        <NavLink to="/History-Update" activeClassName="active-link">
                        <FaHistory />
                            <span className='mx-2'>Lịch sử sửa giá</span>
                        </NavLink>
                    </li>
                    <li>
                        <NavLink to="/History-Delete" activeClassName="active-link">
                        <FaHistory />
                            <span className='mx-2'>Lịch sử xoá</span>
                        </NavLink>
                    </li>
                </ul>
            </nav>
        </div>
    );
};

export default Sidebar;
