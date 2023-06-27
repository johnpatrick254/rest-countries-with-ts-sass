import { useEffect, useState } from "react";

interface PaginateProp{
    itemsPerPage:number;
    totalItems:number;
    handleClick:(pageNum:number)=>void;
    currentPage:number;
}

export const Paginate:React.FC<PaginateProp> = ({itemsPerPage,totalItems,handleClick,currentPage}) =>{
    const [pageNumbers,setPageNumber]=useState<number[]>([]);
    
  console.log(totalItems);
    useEffect(()=>{ 
        const numbers:number[]=[];
        for(let i = 1; i < Math.ceil(totalItems/itemsPerPage); i++){
        numbers.push(i)
        }
        setPageNumber(numbers);
    },[totalItems])
    return <>
    <div className="pagination">
        <ul>
            {
                pageNumbers.map(num=><li className={ num === currentPage ? "currentpage":""} onClick={():void=>handleClick(num)} key={num}>{num}</li>)
            }
        </ul>
    </div>
    </>
}