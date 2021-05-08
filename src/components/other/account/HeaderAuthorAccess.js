import React, { useState , useContext} from 'react'
import { FiPlus, FiPlusCircle, FiBookmark, FiSearch } from 'react-icons/fi';
import { BsListCheck, BsQuestion, BsGear, BsPower } from 'react-icons/bs'
import { AiOutlineUser } from 'react-icons/ai'
import {Link} from "react-router-dom";
import Button from "../../common/Button";
import userimg from '../../../assets/images/team1.jpg'
import {AuthContext} from "../../providers/UserProvider";
import { auth } from "../../../firebase";

export default function HeaderAuthorAccess() {
    const [AuthorAccessOpen, setAuthorAccessOpen] = useState(false)
    const { currentUser } = useContext(AuthContext);
    if (currentUser) {
      console.log(currentUser)
    }
    const signOutUser = (event) => {
        auth.signOut().then(() => {
            // Sign-out successful.
        }).catch((error) => {
        });
    }
    return (
        <>
            <div className="logo-right-content">
                <ul className="author-access-list">
                    {currentUser? <li>Hi {currentUser.displayName}</li>:
                    <li>
                        <Link to="/login">login</Link>
                        <span className="or-text">or</span>
                        <Link to="/sign-up">Sign up</Link>
                    </li>
                    }
                    <li>
                        <Button text="Add to List" url="/add-listing/new" >
                            <FiPlusCircle />
                        </Button>
                    </li>
                </ul>
                <div className="side-user-menu-open" onClick={() => setAuthorAccessOpen(!AuthorAccessOpen)}>
                    <AiOutlineUser />
                </div>
            </div>

            {/* Side User panel */}
            <div className={AuthorAccessOpen ? 'side-user-panel active' : 'side-user-panel'}>
                <div className="humburger-menu">
                    <div className="humburger-menu-lines side-menu-close" onClick={() => setAuthorAccessOpen(!AuthorAccessOpen)}></div>
                </div>
                <div className="side-menu-wrap side-user-menu-wrap">

                    <div className="side-user-img">
                        <img src={userimg} alt="User" />
                        <h4 className="su__name">Mark Williamson</h4>
                        <span className="su__meta">Joined 3 years ago</span>
                        <div className="avatar-icon">
                            <Link to="/dashboard" data-toggle="tooltip" data-placement="top" title="Change Avatar"> <FiPlus /></Link>
                        </div>
                    </div>

                    <ul className="side-menu-ul">
                        <li><Link to="/dashboard"><AiOutlineUser className="user-icon" /> My Profile</Link></li>
                        <li><Link to="/dashboard"><BsListCheck className="user-icon" /> My Listings</Link></li>
                        <li><Link to="/dashboard"><FiBookmark className="user-icon" /> My Bookmarks</Link></li>
                        {/* <li><Link to="/dashboard"><FiPlusCircle className="user-icon" /> Add to List</Link></li> */}
                        <li><div className="dropdown-divider"></div></li>
                        <li><Link to="#"><BsQuestion className="user-icon" /> help</Link></li>
                        <li><Link to="#"><BsGear className="user-icon" /> Settings</Link></li>
                        <li><Link to="/" onClick={event => {signOutUser(event);}}><BsPower className="user-icon" /> Sign Out</Link></li>
                    </ul>
                    <div className="side-user-search contact-form-action">
                        <form method="post">
                            <div className="form-group mb-0">
                                <FiSearch className="form-icon" />
                                <input className="form-control" type="search" name="search-field" placeholder="Search by keywords" />
                            </div>
                            <button type="button" className="theme-btn border-0">
                                Search
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </>
    )
}
