interface CountryProps{
    details:{name:string;region:string;area_size:number}
}

export const CountryCard :React.FC <CountryProps> =({details})=>{
    return <>
        <div className="country-card">
            <div className="country-card-name">
                <p>Name: {details.name}</p>
            </div>
            <div className="country-card-size">
                <p>Region: {details.region}</p>
            </div>
            <div className="country-card-region">
                <p>Size: {details.area_size}</p>
            </div>
        </div>
    </>
} 
