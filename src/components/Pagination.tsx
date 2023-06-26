interface PaginateProp{
    itemsPerPage:number;
    totalItems:number;
    handleClick:(pageNum:number)=>void
}

export const Paginate:React.FC<PaginateProp> = ({itemsPerPage,totalItems,handleClick}) =>{
    const pageNumbers:number[] =[];

    for(let i = 1; i < Math.ceil(totalItems/itemsPerPage); i++){
        pageNumbers.push(i)
    }
    return <>
    <div className="pagination">
        <ul>
            {
                pageNumbers.map(num=><li onClick={():void=>handleClick(num)} key={num}>{num}</li>)
            }
        </ul>
    </div>
    </>
}