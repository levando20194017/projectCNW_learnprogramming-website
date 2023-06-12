import React, { Component } from 'react';
import { connect } from 'react-redux';
import './UserManage.scss'
import { getAllUsers, createNewUserService, deleteUserService, editUserService } from '../../../services/userService';
import ModalUser from './ModalUser';
import { emitter } from '../../../utils/emitter';
import ModalEditUser from './ModalEditUser';
import '../../../assets/css/app.scss'
import { Scrollbars } from 'react-custom-scrollbars';
import * as XLSX from 'xlsx';
import { saveAs } from 'file-saver';
import jsPDF from 'jspdf';
import 'jspdf-autotable';
class UserManage extends Component {

    constructor(props) {
        super(props);
        this.state = {
            arrUsers: [],
            isOpenModal: false,
            isOpenEditModal: false,
            userId: 0,
            pageSize: 6, // số lượng phần tử hiển thị trên mỗi trang
            pageNumber: 1,
        }
    }

    async componentDidMount() {
        await this.getAllUserFromReact()

        const copyButton = document.querySelector('.buttons-copy');
        copyButton.addEventListener('click', () => {
            const table = document.querySelector('#table3');
            const tableData = [];
            for (let i = 0, row; row = table.rows[i]; i++) {
                const rowData = [];
                for (let j = 0, col; col = row.cells[j]; j++) {
                    if (j !== table.rows[i].cells.length - 1) {
                        rowData.push(col.innerText);
                    }
                }
                tableData.push(rowData.join('\t'));
            }

            navigator.clipboard.writeText(tableData.join('\n'));
        });

        const excelButton = document.querySelector('.buttons-excel');
        excelButton.addEventListener('click', () => {
            const table = document.querySelector('#table3');
            const tableData = [];

            for (let i = 0, row; row = table.rows[i]; i++) {
                const rowData = [];
                for (let j = 0, col; col = row.cells[j]; j++) {
                    if (j !== table.rows[i].cells.length - 1) {
                        rowData.push(col.innerText);
                    }
                }
                tableData.push(rowData);
            }

            const wb = XLSX.utils.book_new();
            const ws = XLSX.utils.aoa_to_sheet(tableData);
            XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');
            const excelContent = XLSX.write(wb, { bookType: 'xlsx', type: 'array' });
            const blob = new Blob([excelContent], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
            saveAs(blob, 'user.xlsx');
        });

        const pdfButton = document.querySelector('.buttons-pdf');
        pdfButton.addEventListener('click', () => {
            const table = document.querySelector('#table3');
            const tableData = [];
            for (let i = 0, row; row = table.rows[i]; i++) {
                const rowData = [];
                for (let j = 0, col; col = row.cells[j]; j++) {
                    if (j !== table.rows[i].cells.length - 1) {
                        rowData.push(col.innerText);
                    }
                }
                tableData.push(rowData);
            }

            const doc = new jsPDF();
            doc.setFont('Arial Unicode MS');
            doc.autoTable({
                head: [tableData[0].slice(0, -1)], // Loại bỏ cột cuối cùng
                body: tableData.slice(1).map(row => row.slice(0, -1)), // Loại bỏ cột cuối cùng
                didDrawCell: function (data) {
                    // Set the font size to 10pt for all cells
                    data.cell.styles.fontSize = 10;
                    // Set the padding of all cells to 2
                    data.cell.styles.cellPadding = 2;
                    // Set the language to Vietnamese
                    data.cell.styles.font = 'Arial Unicode MS';
                    data.cell.styles.halign = 'center'; // Căn giữa nội dung trong ô
                }
            });
            doc.save('user.pdf');
        });

        const printButton = document.querySelector('.buttons-print');
        printButton.addEventListener('click', () => {
            // Loại bỏ cột cuối cùng bằng CSS
            const css = `
            @media print {
              #table3 td:last-child, #table3 th:last-child {
                display: none;
              }
            }
          `;
            const head = document.head || document.getElementsByTagName('head')[0];
            const style = document.createElement('style');
            style.type = 'text/css';
            style.appendChild(document.createTextNode(css));
            head.appendChild(style);

            // In bảng
            window.print();
        });
    }

    handleAddNewUser = () => {
        this.setState({
            isOpenModal: true
        })
    }
    handleEditUser = (id) => {
        this.setState({
            isOpenEditModal: true,
            userId: id
        })
    }
    getAllUserFromReact = async () => {
        let response = await getAllUsers('ALL');
        if (response && response.errCode === 0) {
            this.setState(
                {
                    arrUsers: response.users
                }
            )
        }
    }
    toggleUserModal = () => {
        this.setState({
            isOpenModal: !this.state.isOpenModal
        })
    }
    createNewUser = async (data) => {
        try {
            let response = await createNewUserService(data);
            if (response && response.errCode !== 0) {
                alert(response.message);
            } else {
                await this.getAllUserFromReact();
                this.setState({
                    isOpenModal: false
                })
                emitter.emit('EVENT_CLEAR_MODAL_DATA')
            }
        } catch (e) {
            console.log(e)
        }
    }
    handleDeleteUser = async (userId) => {
        console.log(userId)
        try {
            let response = await deleteUserService(userId);
            console.log(response);
            if (response && response.errCode === 0) {
                await this.getAllUserFromReact();
                alert(response.message);
            }
        } catch (e) {
            console.log(e);
        }
    }
    editUser = async (data) => {
        try {
            let response = await editUserService(data);
            console.log(response);
            if (response && response.errCode === 0) {
                this.setState({
                    isOpenEditModal: false
                })
                await this.getAllUserFromReact();
            }
            alert(response.message);
        } catch (e) {
            console.log(e);
        }
    }
    toggleEditUserModal = () => {
        this.setState({
            isOpenEditModal: !this.state.isOpenEditModal
        })
    }
    omponentWillUnmount() {
        // Loại bỏ các sự kiện đã đăng ký để tránh rò rỉ bộ nhớ
        const copyButton = document.querySelector('.buttons-copy');
        copyButton.removeEventListener('click');

        const excelButton = document.querySelector('.buttons-excel');
        excelButton.removeEventListener('click');

        const pdfButton = document.querySelector('.buttons-pdf');
        pdfButton.removeEventListener('click');

        const printButton = document.querySelector('.buttons-print');
        printButton.removeEventListener('click');
    }
    handlePageSizeChange = (event) => {
        const pageSize = parseInt(event.target.value);
        const totalPages = Math.ceil(this.state.arrUsers.length / pageSize);
        const newPageNumber = this.state.pageNumber > totalPages ? totalPages : this.state.pageNumber;
        this.setState({
            pageSize: pageSize,
            pageNumber: newPageNumber,
        });
    }

    // Hàm xử lý sự kiện khi chuyển trang
    handlePageChange = (pageNumber) => {
        this.setState({
            pageNumber: pageNumber,
        });
    }

    // Hàm xử lý sự kiện khi chọn All
    handleShowAll = () => {
        const allUsers = this.state.arrUsers;
        this.setState({
            pageSize: allUsers.length,
            pageNumber: 1,
        });
    }

    render() {
        let allUser = this.state.arrUsers;

        // tính toán các biến cần thiết để hiển thị danh sách item theo số lượng item và trang hiện tại
        const { pageSize, pageNumber } = this.state;
        const startIndex = (pageNumber - 1) * pageSize;
        const endIndex = startIndex + pageSize;
        const visibleUsers = allUser.slice(startIndex, endIndex);
        const totalPages = Math.ceil(allUser.length / pageSize);
        return (
            <Scrollbars style={{ height: "80vh" }}>
                <div className="be-content" style={{ marginTop: "-20px" }}>
                    <div className="main-content container-fluid">

                        <ModalUser
                            isOpen={this.state.isOpenModal}
                            toggleFromParent={this.toggleUserModal}
                            createNewUser={this.createNewUser}
                        />
                        <ModalEditUser
                            isOpen={this.state.isOpenEditModal}
                            toggleEditFromParent={this.toggleEditUserModal}
                            editUser={this.editUser}
                            userId={this.state.userId}
                        />
                        <div className="row">
                            <div className="col-sm-12">
                                <div className="card card-table">
                                    <div className="card-header">
                                        <div className="title">Manage users</div>
                                        <div className='btn btn-primary px-3 mt-7' style={{ marginLeft: "20px" }} onClick={this.handleAddNewUser}><i className='fas fa-plus'></i>Add new user</div>
                                        <div className="tools dropdown"><span className="icon mdi mdi-download"></span><a className="dropdown-toggle"
                                            href="#" role="button" data-toggle="dropdown"><span className="icon mdi mdi-more-vert"></span></a>
                                            <div className="dropdown-menu" role="menu"><a className="dropdown-item" href="#">Action</a><a
                                                className="dropdown-item" href="#">Another action</a><a className="dropdown-item" href="#">Something else
                                                    here</a>
                                                <div className="dropdown-divider"></div><a className="dropdown-item" href="#">Separated link</a>
                                            </div>
                                        </div>

                                    </div>
                                    <div className="card-body">
                                        <div id="table3_wrapper" className='dataTables_wrapper dt-bootstrap4 no-footer'>
                                            <div class="row be-datatable-header">
                                                <div class="col-sm-6">
                                                    <div class="dataTables_length" id="table3_length">
                                                        <label className='d-flex' style={{ padding: "0 45px" }}>
                                                            <div>Show</div>
                                                            <select style={{ width: "40px", marginLeft: "3px" }} name="table3_length" aria-controls="table3" class="custom-select custom-select-sm form-control form-control-sm"
                                                                onChange={this.handlePageSizeChange}
                                                                value={this.state.pageSize}>
                                                                <option value="6">6</option>
                                                                <option value="10">10</option>
                                                                <option value="25">25</option>
                                                                <option value="50">50</option>
                                                                <option value="-1">All</option>
                                                            </select>
                                                            <div style={{ marginLeft: "3px" }}>entries</div>
                                                        </label>
                                                    </div>
                                                </div>
                                                <div className="col-sm-6 text-right">
                                                    <div className="dt-buttons btn-group">
                                                        <button className="btn btn-secondary buttons-copy buttons-html5" tabindex="0" aria-controls="table3" type="button">
                                                            <span>Copy</span>
                                                        </button>
                                                        <button className="btn btn-secondary buttons-excel buttons-htm15" tabindex="0" aria-controls="table3" type="button">
                                                            <span>Excel</span>
                                                        </button>
                                                        <button className="btn btn-secondary buttons-pdf buttons-htm15" tabindex="0" aria-controls="table3" type="button">
                                                            <span>PDF</span>
                                                        </button>
                                                        <button className="btn btn-secondary buttons-print" tabindex="0" aria-controls="table3" type="button">
                                                            <span>Print</span>
                                                        </button>
                                                    </div>
                                                </div>
                                            </div>

                                            <div className='row be-datatable-body'>
                                                <div className='col-sm-12'>
                                                    <table className="table table-striped table-hover table-fw-widget dataTable no-footer" id="table3" role='grid' aria-aria-describedby='table3_info'>
                                                        <thead>
                                                            <tr>
                                                                <th style={{ width: "20%" }}>Full Name</th>
                                                                <th style={{ width: "20%" }}>Email</th>
                                                                <th style={{ width: "30%" }}>Address</th>
                                                                <th style={{ width: "5%" }}>Gender</th>
                                                                <th style={{ width: "10%" }}>Phone Number</th>
                                                                <th className="actions" style={{ width: "15%" }}>Actions</th>
                                                            </tr>
                                                        </thead>
                                                        <tbody>
                                                            {
                                                                visibleUsers && visibleUsers.map((item, index) => {
                                                                    return (
                                                                        <tr>
                                                                            <td className="user-avatar"><img src={item.img_url} alt="Avatar" />{item.fullName}</td>
                                                                            <td>{item.email}</td>
                                                                            <td>{item.address}</td>
                                                                            <td>{`${item.gender ? "Nam" : "Nữ"}`}</td>
                                                                            <td>{item.phoneNumber}</td>
                                                                            <td>
                                                                                <button className="btn-edit"><i className="fas fa-pencil-alt"
                                                                                    onClick={() => this.handleEditUser(item.id)}></i></button>
                                                                                <button className="btn-delete"><i className="fas fa-trash"
                                                                                    onClick={() => { this.handleDeleteUser(item.id) }}></i></button>
                                                                            </td>
                                                                        </tr>
                                                                    )
                                                                })
                                                            }
                                                        </tbody>
                                                    </table>
                                                </div>
                                            </div>
                                            <div className="row be-datatable-footer mt-3">
                                                <div className="col-sm-4 offset-1">
                                                    <div className="dataTables_info" style={{ fontWeight: "bold" }} id="table3_info" role="status" aria-live="polite">
                                                        {`Showing ${startIndex + 1} to ${Math.min(endIndex, allUser.length)} of ${allUser.length} entries`}
                                                    </div>
                                                </div>
                                                <div className="col-sm-3 offset-4">
                                                    <div className="dataTables_paginate paging_simple_numbers" id="table3_paginate">
                                                        <ul className="pagination">
                                                            <li className={`paginate_button page-item ${pageNumber === 1 ? 'disabled' : ''}`} >
                                                                <a href="#" aria-controls="table3" onClick={() => this.handlePageChange(pageNumber - 1)} className="page-link">Previous</a>
                                                            </li>
                                                            {Array.from({ length: totalPages }, (v, k) => {
                                                                const page = k + 1;
                                                                return (
                                                                    <li key={k} className={`paginate_button page-item ${pageNumber === page ? 'active' : ''}`}>
                                                                        <a href="#" aria-controls="table3" onClick={() => this.handlePageChange(page)} className="page-link">{page}</a>
                                                                    </li>
                                                                )
                                                            })}
                                                            <li className={`paginate_button page-item ${pageNumber === totalPages ? 'disabled' : ''}`}>
                                                                <a href="#" aria-controls="table3" onClick={() => this.handlePageChange(pageNumber + 1)} className="page-link">Next</a>
                                                            </li>
                                                        </ul>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </Scrollbars>
        );
    }

}

const mapStateToProps = state => {
    return {
    };
};

const mapDispatchToProps = dispatch => {
    return {
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(UserManage);
