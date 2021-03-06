import React,{useEffect} from 'react'
import './TrendingBody.css'
import AD from '../../icons/Trend AD.svg'
import LikeBtn from '../../icons/Like Btn.svg'
import FilledLikeBtn from '../../icons/Filled Like Btn.svg'
import Rating from '@material-ui/lab/Rating';
import { StylesProvider } from "@material-ui/core/styles";
import StarBorderIcon from '@material-ui/icons/StarBorder';
import LeftBtn from '../../icons/Arrow.svg'
import { Link } from 'react-router-dom'

var ProductLike = {};
const TrendingBody = ({setHeight, like, setLike, cards}) => {
    ProductLike=like

    useEffect(() => {
        const data = localStorage.getItem("liked");
        if(data){
            setLike(JSON.parse(data));
        }
        
    }, []);

        
    const LikeButton = (id) => {
 
        console.log(ProductLike)
        if(ProductLike[id] === false){
            document.getElementById("ProductLike"+id).src = FilledLikeBtn;
            ProductLike[id] = true;
            
        }else{
            document.getElementById("ProductLike"+id).src = LikeBtn;
            ProductLike[id] = false
            
        }
        setLike(ProductLike)
        console.log(like)
        console.log(typeof like)
        console.log(JSON.stringify(like))
        localStorage.setItem('liked', JSON.stringify(like))
    }

    const pages = [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20]

    function handleRightBtn(){

        for(var i=0; i<pages.length;i++)
        {
            const btn = document.getElementById(pages[i]);
            btn.style.transform = "translateX(-628px)";
        }

    }

    function handleLeftBtn(){

        for(var i=0; i<pages.length;i++)
        {
            const btn = document.getElementById(pages[i]);
            btn.style.transform = "translateX(0px)";
        }
    }
    return(
        <div className="TrendingBody" ref={el => {
            if(!el) return;
        
            setHeight(el.getBoundingClientRect().height)
        }} >
        
            <div className="trend-head">Showing 3500 Trending Products</div>
            <div className="trend-sub-head">Page 1 of 175</div>
            <img className="trend-AD" src={AD} alt=""/>
            <div className="trend-cards">
                {cards.slice(0,24).map((e,i) => {
                    //ProductLike.assign(e.id, false)
                    var ids = e.id
                    console.log(typeof e.id)
                    Object.assign(ProductLike,{id : ids,value : false})
                
                return(
                    <div key={e.id} className="card">
                        <button onClick={() => { LikeButton(e.id); }} className="card-btn">                        
                            <img src={like[e.id]===true ? FilledLikeBtn : LikeBtn} alt="" id={`ProductLike${e.id}`} style={{width:"20px", height:"20px"}} />
                        </button>
                        <Link to={'/products/'+e.name} style={{textDecoration:"none"}} >
                            <img className="card-img" src={e.image} alt=""/>
                            <div className="card-name">{e.name}</div>
                            <div style={{display:"flex", justifyContent:"space-evenly"}}>
                                <div className="card-rating">
                                    <StylesProvider injectFirst>
                                        <Rating 
                                            defaultValue={e.rating}
                                            precision={0.1} 
                                            size="small" 
                                            readOnly 
                                            emptyIcon={<StarBorderIcon fontSize="inherit" />} 
                                        />
                                        <div className="card-total-rating">{e.totalRating}</div>
                                    </StylesProvider>
                                </div>
                                <div className="card-dprice">&#8377;{e.dprice}</div>
                                <div className="card-price">&#8377;{e.price}</div>
                            </div>

                        </Link>
                        
                    </div>
                )})}
            </div>
            
            <div className="trend-pages">
                <button onClick={handleLeftBtn} className="trend-left-btn">
                    <img src={LeftBtn} alt=""/>
                </button>
                <div className="trend-list">
                    {pages.map((pages,i) => (
                        <div key={i} style={{marginRight:"23px"}}>
                            <button id={pages} className="trend-pages-btn">{pages}</button>
                        </div>
                    ))}
                </div>
            
                <button onClick={handleRightBtn} className="trend-right-btn">
                    <img style={{transform: "rotate(180deg)"}} src={LeftBtn} alt=""/>
                </button>
            </div>
             
        </div>
    )
}

export default TrendingBody;
