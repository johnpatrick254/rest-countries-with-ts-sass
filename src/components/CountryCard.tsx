import Skeleton from '@mui/material/Skeleton';

interface CountryProps{
    details:{name:string;region:string;area:number};
    loading:boolean;
}

export const CountryCard :React.FC <CountryProps> =({details,loading})=>{
    return <>
        <div className="country-card">
        <div className="country-card-name">
                {!loading ? <Skeleton  animation="wave" variant="text" sx={{ fontSize: '2rem', width:'10rem'}} />
                    : <h2>{details.name}</h2>}
            </div>
            <div className="country-card-size">
                {!loading ? <Skeleton animation="wave" variant="text" sx={{ fontSize: '1rem', width:'6rem' }} />
                    : <p>Region: {details.region}</p>}
            </div>
            <div className="country-card-region">
                {!loading ? <Skeleton animation="wave" variant="text" sx={{ fontSize: '1rem', width:'6rem' }} />
                    : <p>Size: {details.region}</p>}

            </div>
        </div>
    </>
} 
