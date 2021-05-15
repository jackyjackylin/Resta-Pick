import React, {useEffect, useState, useContext} from 'react';
import { FiSearch,FiPlusCircle } from 'react-icons/fi'
import sectiondata from "../../store/store";
import AddRestaurants from "../../components/common/AddRestaurants";
import {AuthContext} from "../../components/providers/UserProvider";
import AddToListCheckList from "../../components/other/AddToListCheckList";
import {firestore} from "../..//firebase";
import { GiConsoleController } from 'react-icons/gi';
// import _ from "lodash"

export default function ShowList({toggleShowPop,setPopItemList}) {
    const [restaurants, setRestaurants] = useState([]);
    const [loaded, setLoaded] = useState(false);
    const [lists, setLists] = useState([]);
    const [restaurantName, setRes] = useState("");
    const [choice, setChoice] = useState(-1);
    const [choiceLength, setChoiceLength] = useState(-1);
    const {currentUser} = useContext(AuthContext);

    const data = {
        comments: "tmp comments",
        photoURL: "https://firebasestorage.googleapis.com/v0/b/p1cky-89cb0.appspot.com/o/images%2FfEyvLKgSSWeRHPf87PUr1OQotHF3%2Fuserimg5.jpg?alt=media&token=dd5c08b1-3bfb-42b3-9257-dbb331acd645"
    }
    useEffect(() => {
        if(currentUser)
            console.log(`${currentUser.uid} Show`)
    },[currentUser])
    useEffect(() => {
        
        console.log(`The ${choice}th from all ${choiceLength} choices`)
    },[choice,choiceLength])

    function getRandomInt(min, max) {
        min = Math.ceil(min);
        max = Math.floor(max);
        return Math.floor(Math.random() * (max - min) + min); //The maximum is exclusive and the minimum is inclusive
    }

    const getAllFromList = async(docName) => {
        const ref = firestore.doc(`users/${currentUser.uid}`).collection('myLists').doc(docName).collection('restaurantsList');
        const collections = await ref.get();
        let tmpList = []
        collections.forEach(collection => {
            tmpList.push({...collection.data(), id: collection.id})
        })
        return  [...tmpList]
    }
    const randomPick = async() =>{
        // const listIdx = getRandomInt(0,list.length)
        // console.log(`choose from list ${listIdx}`)
        let randomList = []
        await Promise.all(lists.map(async(item, i) => {
            let oneList = await getAllFromList(item)
            oneList.map(restaurant => randomList.push(restaurant))
            
            // console.log(randomList)
        }))
        setChoice(getRandomInt(0,randomList.length))
        setChoiceLength(randomList.length)

    }
    

    return(
        <div>
            <div className="modal-form text-center">
            <div className="modal fade add-list-modal" tabIndex="-1" role="dialog" aria-labelledby="mySmallModalLabel">
                <div className="modal-bg"></div>
                <div className="modal-dialog modal-lg" role="document" >
                    <div className="modal-content p-4">
                        <span className="pick-from-list-text">
                            Choose one or multiple pocket lists
                            <br></br>  
                            we'll pick one restaurant for you!
                        </span>
                        {currentUser && <AddToListCheckList uid={currentUser.uid} lists={lists} setLists={setLists} />}
                        {/* <div className="row padding-top-100px"></div> */}
                        <div className="btn-box">
                            <button type="button" className="theme-btn border-0 button-success mr-1" onClick={randomPick}data-dismiss="modal">
                                Go
                            </button>
                            {/* <button type="button" className="theme-btn border-0 button-danger" onClick={()=>{
                                if (restaurantName) {
                                    console.log("Add to:", lists);
                                    console.log("restaurant:", restaurantName);
                                    addToLists();
                                }
                                else {
                                    console.log("Empty input")
                                }
                            }}>
                                Go!
                            </button> */}
                        </div>
                    </div>
                </div>
            </div>
        </div>
        </div>
    )
}

