import { Link } from 'react-router-dom'

export default function Header(props) {
    const {
        handleLogout
    } = props

    return (
        <div className="header">
            <ul className="list-items">
                <li><Link to={'/home'}>Thông tin cá nhân</Link></li>
                <li><Link to={'/attendance'}>Điểm danh</Link></li>
                <li><Link to={'/search'}>Tra cứu giờ làm</Link></li>
                <li><Link to={'/covid_19'}>Thông tin Covid cá nhân</Link></li>
            </ul>
            <div className="sign-out" onClick={(e) => handleLogout(e)}>
                <i className="fa fa-sign-out" aria-hidden="true"></i>
            </div>
        </div>
    )
}