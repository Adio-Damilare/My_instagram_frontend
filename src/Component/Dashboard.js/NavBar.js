import React, { useState, useRef} from 'react'
import { useNavigate } from 'react-router-dom'
import LogoS7 from "../Images/istagram2.png"
import LogoS1 from "../Images/Home.png"
import LogoS2 from "../Images/message.png"
import LogoS3 from "../Images/AddFriend.png"
import LogoS4 from "../Images/clock.png"
import LogoS5 from "../Images/love.png"
import profile from "../Images/profilePic2.png"
import pro from "../Images/save2.png"
import prof from "../Images/setting2.png"
import profs from "../Images/switch.png"
import uploadFile from "../Images/uploadFile.png"
import backArrow1 from "../Images/backArrow1.png"
import dragActive2 from "../Images/dragActive2.png"
import addButton from "../Images/addButton.png"
import plusImage from "../Images/plusImage.png"
import iconRep from "../Images/iconRep.png"
import pagination from "../Images/pagination.png"
import pagination1 from "../Images/pagination1.png"
import locationIcon from "../Images/locationIcon.png"
import open from "../Images/open.png"
import close from "../Images/close.png"
import { Link } from 'react-router-dom'
import axios from 'axios'
import { MDBSwitch } from 'mdb-react-ui-kit';
import LoadingGif from './LoadingGif'
import { useSelector,useDispatch } from 'react-redux';
import { SelectCurrentUser } from '../Profile/UserRedux';
import {Typewriter} from "react-simple-typewriter"
import { selectAllUsers } from '../UserSlice/UsersSlice';
import { UploadPost } from '../Profile/UserRedux';
import {useGetPostQuery} from "../../PostSlice/index";
import { LogOut } from '../Profile/UserRedux'
import { Avatar } from "@mui/material"
import { Selectsocket } from '../HomePage/Messge.redux'
import {deepOrange} from "@mui/material/colors"
import { LogOutMessage } from '../HomePage/Messge.redux'

const NavBar = ({roar}) => {
    const {refetch}=useGetPostQuery()
    const dispatch=useDispatch();
    const socket=useSelector(Selectsocket)
    const inputRef = useRef()
    const current=useSelector(SelectCurrentUser)
   const Users=useSelector(selectAllUsers)
    const URI3 = "http://localhost:4000/user/uploadpost"
    const navigate = useNavigate()
    const [SearchW, setSearchW] = useState("")
    const [currentUser, ] = useState({...current})
    const [isOpen, setIsOpen] = useState(false);
    const dropDownShow = () => setIsOpen(!isOpen)
    const [showSearch, setShowSearch] = useState(true)
    const [imageWantToUpload, setimageWantToUpload] = useState("")
    const [searchResult1, setSearchResult1] = useState([])
    const [wantToMap, setwantToMap] = useState([])
    const [showModal, setshowModal] = useState(1)
    const [dragActive, setdragActive] = useState(false)
    const [displayMap, setdisplayMap] = useState(false)
    const [showOpen, setshowOpen] = useState(false)
    const [showOpen2, setshowOpen2] = useState(false)
    const [changePagination, setchangePagination] = useState(true)
    const [postComment, setpostComment] = useState("")
    const [areaLenght, setAreaLenght] = useState("")
    const [location, setLocation] = useState("")
    const [nues, setnues] = useState(0)
    const [index, setindex] = useState(0)
    const [, seticon] = useState(roar)
    const [PostResult, setPostResult] = useState(false)
    const [PostResultChange, setPostResultChange] = useState(1)
    const [PostResultMessage, setPostResultMessage] = useState("")
    
   
   
    const enterKey = () => {
     setShowSearch(false)
    }

    const getsearchTerm = () => {
        setSearchW(inputRef.current.value)
        if (SearchW !== "") {
            const newUser = Users.filter((user) => {
                return (user.Fullname.toLowerCase().includes(SearchW.toLowerCase()))
            })
            setSearchResult1(newUser)
            return
        } else {

            setSearchResult1([])
        }
    }

    const blurAction = () => {
        setShowSearch(true)
    }

    const LogOutT = () => {
        console.log("done")
        socket.emit("disconn",(current._id))
        dispatch(LogOut())
        dispatch(LogOutMessage())
        navigate("/signin")

    }
    
    const uploadImageFromComputer = (e) => {
        if (showModal !== 2) {
            setshowModal(2)
        }
        if (e.target.files) {

            const files = (e.target.files[0])
            const reader = new FileReader()
            reader.readAsDataURL(files)
            reader.onload = () => {
                setwantToMap([...wantToMap, {image:reader.result}])
                if (!imageWantToUpload) {
                    setimageWantToUpload(reader.result)
                }
            }
        }
        else {
            const files = e.dataTransfer.files[0]
            const reader = new FileReader()
            reader.readAsDataURL(files)
            reader.onload = () => { 
                setwantToMap([...wantToMap, {image:reader.result}])
                if (!imageWantToUpload) {
                    setimageWantToUpload(reader.result)
                }
            }
        }
    }

    const changeMe = () => {
        if (wantToMap.length > index && changePagination) {
            setimageWantToUpload(wantToMap[index].image)
            setindex(index + 1)
            let see = index + 1
            if (wantToMap.length == see) {
              setchangePagination(!changePagination)
            }
        }
        else {
            setimageWantToUpload(wantToMap[index].image)
            setindex(index - 1)
            if (index == 0) {
                setchangePagination(!changePagination)
            }
        }
    }
    const handleDrag = function (e) {
        e.preventDefault();
        e.stopPropagation();
        if (e.type === "dragenter" || e.type === "dragover") {
            setdragActive(true);
        } else if (e.type === "dragleave") {
            setdragActive(false);
        }
    };
    
    const settAreaLenght = (e) => {
        setAreaLenght(e)
        setnues(areaLenght.length + 1)
    }

    const handleDrop = function (e) {
        e.preventDefault();
        e.stopPropagation();
        setdragActive(false);
        if (e.dataTransfer.files && e.dataTransfer.files[0]) {
            uploadImageFromComputer(e)
        }
    };
    const showStart=(e)=>{
        wantToMap[e].alt=postComment;
    }
    let date=new Date()
     const getShare =()=>{
        setshowModal(4)
         let data={
             Username:currentUser.Username,
             imagePost:wantToMap,
             caption:areaLenght,
             userId:currentUser._id,
            location,
           Time:date.toISOString()
        }
        axios.post (URI3, data).then((res)=>{
            setPostResultMessage(res.data.message);
            setPostResultChange(2)
            if(res.data.status){
                refetch();
                setPostResult(true);
                dispatch(UploadPost(res.data.postId))
            }
        })

        
     }
     const Cancel =()=>{
        setPostResultChange(1)
        setPostResult(false)
        setPostResultMessage("")
        setshowModal(1)
        setwantToMap([]);
        setLocation('');
        setAreaLenght("")
        setwantToMap([])
     }
    
    return (
        <>
            <div className='container-fluid' id='navSticky'>
                <div className='row card border  ' style={{ padding: "13px 0px" }}>
                    <div className='col-12  row'>
                        <div className=' col-lg-4 col-sm-3 ms-lg-5 ms-md-2 row' id='increase1'>
                            <div className='col-lg-8 col-sm-12 '>
                                <img src={LogoS7} alt="istagram099" className="float-lg-end float-md-center float-sm-start" />
                            </div>
                        </div>
                        <div className='col-lg-3 col-md-4   ' id="navbarD" style={{ height: "37px" }}>
                            <div className='  px-3 h-100' >
                                <input type="Search" onFocus={enterKey} onBlur={blurAction} value={SearchW} ref={inputRef} style={{ backgroundColor: "whitesmoke", height: "100%", fontSize: "13px", width: "100%" }} onChange={getsearchTerm} className='form-control w-100 text-muted ' placeholder='Search'  />
                            </div>

                        </div>
                        <div className='col-lg-3 col-md-4 col-sm-5 row ms-2 mt-1 ms-lg-3' id='increase2'>
                            <Link to="/user/home" style={{cursor:"pointer"}}  onClick={()=>seticon("home")} className='col-2 '>
                                <img src={LogoS1} alt="istagram400" />
                            </Link>
                            <Link to="/user/message" className='col-2' style={{cursor:"pointer"}}    onClick={()=>seticon("message")}>
                                <img src={LogoS2} alt="istagram401" />
                            </Link>
                            <div className='col-2 ' style={{cursor:"pointer"}}  onClick={()=>seticon("uploadfile")}>
                                <img src={LogoS3} alt="istagram402" data-bs-toggle="modal" data-bs-target="#exampleModal" style={{ cursor: "pointer" }} />
                            </div>
                            <Link to="/user/explore" className='col-2 ' style={{cursor:"pointer"}}  onClick={()=>seticon("explore")}>
                                <img src={LogoS4} alt="istagram403" className="" />
                            </Link>
                            <Link to="/user/suggest" className='col-2 cursor-focus' style={{cursor:"pointer"}} onClick={()=>seticon("follow")}><img src={LogoS5} alt="istagram404" className="" /></Link>
                            <div className='col-2  '>
                                <Avatar sx={{ bgcolor: deepOrange[500],width: 30, height:30  }} src={currentUser.ProfilePic} onClick={dropDownShow}></Avatar>
                                {isOpen && (
                                    <div className='card shadow-sm px-3 ' style={{ position: "absolute", top: "64px", }} id="dropdown">
                                        <Link className='text-decoration-none text-dark mb-2' style={{ fontSize: "14px", padding: "4px 0px" }} to="/user/profile"><img src={profile} className="me-2" />Profile</Link>
                                        <Link className='text-decoration-none text-dark mb-2 ' style={{ fontSize: "14px", padding: "8px 0px" }} to="/"><img src={pro} className="me-2" />saved</Link>
                                        <Link className='text-decoration-none text-dark  mb-2' style={{ fontSize: "14px", padding: "2px 0px", marginLeft: "-4px" }} to="/"><img src={prof} className="me-2" />settings</Link>
                                        <Link className='text-decoration-none text-dark mb-2' style={{ fontSize: "14px", padding: "2px 0px", marginLeft: "-4px" }} to="/"><img src={profs} className="me-2" />Switch accounts</Link>
                                        <hr />
                                        <div className='text-decoration-none text-dark mb-2' onClick={() => setIsOpen(false)} data-bs-toggle="modal" data-bs-target="#staticBackdrop1" style={{ fontSize: "14px", cursor: "pointer" }}>Log out</div>
                                    </div>
                                )
                                }
                            </div>
                        </div>
                    </div>
                </div>
                <div className='border  rounded-2 card' id='describNav' onMouseOver={() => setShowSearch(false)} style={showSearch ? { display: "none" } : { display: "block" }}>
                    <div className='pt-1'>
                        {searchResult1.length >= 0 ? (<LoadingGif />) : ""
                        }
                    </div>
                </div>
            </div>
            <div className="modal fade" id="staticBackdrop1" data-bs-keyboard="false" tabindex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
                <div className="modal-dialog modal-dialog-centered modal-sm " >
                    <div className="modal-content text-center pt-3 " style={{ borderRadius: "10px", width: "80%", marginLeft: "40px" }}>
                        <h4>Logging Out </h4>
                        You need to log back in.
                        <hr />
                        <button onClick={LogOutT} className='btn mb-1' data-bs-dismiss="modal" style={{ fontSize: ".9em", marginTop: "-10px" }} aria-label="Close">Log Out
                        </button>
                    </div>
                </div>
            </div>
            <div className="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className={showModal !== 3 ? "modal-dialog modal-dialog-centered modal-dialog-scrollable" : "modal-dialog modal-dialog-centered modal-dialog-scrollable modal-lg"}>
                    {showModal == 1 ? (
                        <div className="modal-content" style={{ borderRadius: "16px", marginTop: "60px" }}>
                            <div className="pt-2  text-center border border-bottom">
                                <strong className='text-center'>Create a new post</strong>
                            </div>
                            <div className="modal-body py-5">
                                <form id="form-file-upload" onDragEnter={handleDrag} onSubmit={(e) => e.preventDefault()}
                                    className="text-center">
                                    <div className=' text-center' style={{ padding: "40px 0px" }} onDragEnter={handleDrag}>
                                        <img src={dragActive ? dragActive2 : uploadFile} alt="uploadfile" className='align' />
                                        <p>Drag and drop your file here or</p>
                                        <label id="file-upload" htmlFor="file-upload2" className={dragActive ? "drag-active btn btn-primary" : " border btn btn-primary "}>
                                            select from computer
                                        </label>
                                        <input type="file" id="file-upload2" onChange={(e) => uploadImageFromComputer(e)}  accept="image/*"/>
                                        {dragActive && <div id="drag-file-element" onDragEnter={handleDrag} onDragLeave={handleDrag} onDragOver={handleDrag} onDrop={handleDrop}></div>}
                                    </div>
                                </form>
                            </div>
                        </div>) :
                        showModal == 2 ? (
                            <div className="modal-content" style={{ borderRadius: "16px", marginTop: "60px" }}>
                                <div className="pt-2 px-2  d-flex border border-bottom" style={{ justifyContent: "space-between" }}>
                                    <button className='btn' data-bs-toggle="modal" data-bs-target="#exampleModal5"><img src={backArrow1} height="20px" /> </button>
                                    <strong>Crop</strong>
                                    <button className='btn text-primary' onClick={() => setshowModal(3)}>Next</button>
                                </div>
                                <div className="modal-body py-2">
                                    <div className=' text-center d-flex flex-column align-items-end ' style={{ justifyContent: "end", padding: "0px 0px", backgroundImage: `url(${imageWantToUpload})`, backgroundSize: "cover", wordBreak: "break-all", position: "relative", minHeight: "400px" }} >
                                        {displayMap ? (<div className='d-flex rounded' style={{ backgroundColor: "black", backgroundBlendMode: "darken" }}>
                                            <div className='d-flex flex-row-reverse align-items-center ps-2 rounded-1' style={{ height: "105px", width: "100%", }}>
                                                {wantToMap.map((val, index) => (
                                                    <div className='d-flex align-items-center ' key={index} style={{ height: "90px", width: "100px", backgroundColor: "black" }} >
                                                        <img className='w-100 rounded px-1 cursor-pointer' src={val.image} onClick={() => setimageWantToUpload(val.image)} height="100%" width="100%" alt={`uploadimagesfor${index}`} />
                                                    </div>
                                                ))}
                                            </div>
                                            <label htmlFor='file-upload2' style={{ height: "95px", justifyContent: "center", alignItems: "center" }} className='btn text-center d-flex justify-content-center'>
                                                <img src={plusImage} className="h-50" alt="plusImages" />
                                                <input type="file" id="file-upload2" onChange={(e) => uploadImageFromComputer(e)}  accept="image/*"/>
                                            </label>
                                        </div>) : ""
                                        }
                                        <button className='btn' onClick={() => setdisplayMap(!displayMap)}><img className='rounded-circle' src={addButton} /></button>
                                    </div>
                                </div>
                            </div>) : 
                                showModal == 3?
                                ( 
                                    <div className="modal-content" style={{ borderRadius: "16px", marginTop: "60px" }}>
                                        <div className="pt-2 px-2  d-flex border border-bottom" style={{ justifyContent: "space-between" }}>
                                            <button className='btn' data-bs-toggle="modal" data-bs-target="#exampleModal5"><img src={backArrow1} height="20px" /> </button>
                                            <strong>Crop</strong>
                                            <button className='btn text-primary' onClick={getShare}>Share</button>
                                        </div>
                                        <div className="modal-body py-2">
                                            <div className=' d-flex w-100 h-100' style={{ padding: "-2px 0px" }}>
                                                <div className='w-50'>{wantToMap.length > 1 ? (
                                                    <div className='text-center'>
                                                        <button className='btn' onClick={changeMe}>
                                                            <img src={changePagination ? pagination : pagination1} className="rounded-circle" alt="chageback" />
                                                        </button>
                                                    </div>
                                                ) : ""
                                                }
                                                    <div className='border border-3' style={{ backgroundImage: `url(${imageWantToUpload})`, backgroundSize: "cover", backgroundPosition: "center", width: "100%", height: "400px", backgroundClip: "border-box", position: "relative" }}>
        
                                                    </div>
                                                </div>
                                                <div className='w-50 border border-0 border-start ps-2 ' style={{ overflowY: "scroll" }}>
                                                    <div className='mb-3 ps-1'>
                                                    <Avatar sx={{ bgcolor: deepOrange[500] }}  width="35px" height="35px"  src={currentUser.ProfilePic} className='rounded-circle' ></Avatar>
                                                        <strong className='ms-1'>{currentUser.Username}</strong>
                                                    </div>
                                                    <div>
                                                        <textarea className='form-control border border-0 mb-2 fw-lighter' onChange={(e) => settAreaLenght(e.target.value)} value={areaLenght}  placeholder='Write a caption' maxLength={2200} style={{ maxHeight: "150px", fontSize: "14px" }}>
                                                        </textarea>
                                                        <div className='d-flex justify-content-between text-muted pb-2'>
                                                            <img src={iconRep} alt="good rmm" />
                                                            <span className='text-muted' style={{ fontSize: "12px" }}>{nues}/2,200</span>
                                                        </div>
                                                        <div className='d-flex border w-100 border-0 border-top border-bottom' style={{ height: "45px", justifyContent: "space-between" }}>
                                                            <input type="text" style={{ width: "85%" }}  onChange={(e)=>setLocation(e.target.value)} className="form-control border border-0 " placeholder='Add Location' />
                                                            <img src={locationIcon} height="30px" className='mt-2' alt="good rmm" />
                                                        </div>
                                                        <section>
                                                            <button onClick={() => setshowOpen(!showOpen)} className='accordion btn w-100 d-flex justify-content-between mt-2 '>
                                                                <strong style={{ textTransform: "capitalize", fontWeight: "lighter" }}>accesibility</strong>
                                                                <img src={showOpen ? open : close} alt="ffffffffffff" />
                                                            </button>
                                                            {showOpen ? (<div className='pt-1'>
                                                                <p className='text-muted' style={{ fontSize: "12px" }}>Alt text describes your photos for people with visual impairments. Alt text will be automatically created for your photos or you can choose to write your own.
                                                                </p>
                                                                <div>
                                                                    {
                                                                        wantToMap.map((val, index) => (
                                                                            <div key={index} className="d-flex mb-2">
                                                                                <img src={val.image} width="50px" height="50px" alt={`number${index}`} />
                                                                                <input type="text" onBlur={()=>showStart(index)} placeholder='Write a text' onChange={(event)=>setpostComment(event.target.value)} className='form-control ms-1' />
                                                                            </div>
                                                                        ))
                                                                    }
                                                                </div>
                                                            </div>) : ""
                                                            }</section>
                                                        <section>
                                                            <button style={{ height: "45px" }} onClick={() => setshowOpen2(!showOpen2)} className='btn w-100 d-flex justify-content-between mt-2'><p>Advanced setting</p> <img src={showOpen2 ? open : close} alt="opee" />
                                                            </button>
                                                            <div>{
                                                                showOpen2 ? (
                                                                <div>
                                                                    <div>
                                                                        <div className='d-flex justify-content-between'>
                                                                            <p style={{ fontsize: "14px" }}>Hide like and view counts on this<br /> post</p>
                                                                            <MDBSwitch id='flexSwitchCheckDefault' height="40px" />
        
                                                                        </div>
                                                                        <p className='text-muted' style={{ fontSize: "12px", marginTop: '-10px' }}>Only you will see the total number of likes and views on this post. You can change this later by going to the ··· menu at the top of the post. To hide like counts on other people's posts, go to your account settings. Learn more</p>
                                                                    </div>
                                                                    <div>
                                                                        <div className='d-flex justify-content-between'>
                                                                            <p style={{ fontsize: "14px" }}>Turn off commenting </p>
                                                                            <MDBSwitch id='flexSwitchCheckDefault' height="40px" />
                                                                        </div>
                                                                        <p className='text-muted' style={{ fontSize: "12px", marginTop: '-10px' }}>You can change this later by going to the ··· menu at the top of your post.</p>
                                                                    </div>
                                                                </div>) : ""}
                                                            </div>
                                                        </section>
                                                    </div>
                                                    <div className='accordion-content'>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                ):<div>
                                     <div className="modal-content" style={{ borderRadius: "16px", marginTop: "60px" }}>
                                        <div className="modal-body py-2" style={{minHeight:"200px",minWidth:"400px",display:"flex",alignItems:"center",justifyContent:"center"}}>
                                            {PostResultChange==1?<> Please wait <Typewriter words={["....","....","....","....","....","....","...."]} loop={50}/></>:<div className='w-100 text-center'><div className={`alert ${PostResult?"alert-success":"alert-danger"}`}>{PostResultMessage}
                                                </div>
                                                <button data-bs-dismiss="modal" onClick={Cancel} aria-label="Close" className={`btn ${PostResult? "btn-success":"btn-danger"}`}>{ PostResult?"Go back to home":"Repost"}</button>
                                         </div>}
                                        </div>
                                    </div>
                    </div>
                    }
                </div>
            </div >
            <div className="modal fade" id="exampleModal5" tabindex="-1" aria-labelledby="exampleModalLabel5" aria-hidden="true">
                <div className="modal-dialog modal-dialog-centered modal-sm" >
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="exampleModalLabel">Modal title</h5>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                            ...
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                            <button type="button" className="btn btn-primary">Save changes</button>
                        </div>
                    </div></div>
            </div>
        </>
    )
}
export default NavBar