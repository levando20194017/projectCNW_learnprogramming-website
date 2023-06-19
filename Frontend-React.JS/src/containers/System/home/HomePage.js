import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import HeaderAdmin from '../../Header/HeaderAdmin';
import './style_homepage.scss'
import { Link } from 'react-router-dom';
class HomePage extends Component {

    state = {

    }

    componentDidMount() {
    }


    // Cần chèn logo vào header
    render() {
        return (
            <div className="homepage">
                <div id="header">

                    <div id="logo"></div>
                    <ul id="nav">
                        <li ><a href="">Tính năng</a></li>
                        <li ><a href="">Trợ giúp</a></li>
                        <li><a href="">Nhóm thực hiện</a></li>
                    </ul>
                </div>
                <div id='content'>
                    <div id='big-image'>
                        <img src="./assets/img/Code-typing-rafiki.png" alt="img" class="right-img" />
                    </div>
                    <div id='slogan'>
                        <h1>
                            Học lập trình<br/>mọi lúc,<br/>mọi nơi!
                        </h1>
                        <p>
                            Website học lập trình CodeCrush - bài tập lớn môn Công nghệ Web & Dịch vụ trực tuyến, mã học phần IT4409 - nhóm 11.
                        </p>
                        <Link to="/login">
                            <div id='login_button'>
                                <button>Bắt đầu ngay!</button>
                            </div>
                        </Link>
                    </div> 
                    
                </div>
                <div className='footer'>

                </div>
            </div>
        )
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

export default connect(mapStateToProps, mapDispatchToProps)(HomePage);
