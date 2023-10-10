import { useState, useEffect } from "react";
import Image from "next/image";
import axios from "axios";

export default function NasaInfo() {
    const [data, setData] = useState();

    const myAPI = process.env.NEXT_PUBLIC_API;
    const year = '2023';
    const month = '01';
    const day = '01';

    const monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December" ]

    const url = `https://api.nasa.gov/EPIC/api/natural/date/${year}-${month}-${day}?&api_key=${myAPI}`;

    useEffect(() => {
        axios.get(url)
            .then((response) => {
                console.clear();
                console.log(response);
                setData(response.data);
            }).catch(err => {
                console.log(err);
            })
    }, [])

    return (
        <>
            {
                data && data.map((a, index) => {
                    return (
                        <div key={index}>
                            <div>Image #{index + 1}</div>
                            {/*<div>{a.caption.toUpperCase()}</div>*/}
                            {/* January 1 , 2023 */}
                            <div>Date: {monthNames[Number(a.date.slice(5,7))-1]} {Number(a.date.slice(8,10))}, {a.date.slice(0,4)}</div>
                            {a.image}
                            <Image src={`https://epic.gsfc.nasa.gov/archive/natural/${year}/${month}/${day}/png/${a.image}.png`} width={200} height={200} alt=''/>
                            <div>Coordinates</div>
                            <div>x: {a.centroid_coordinates.lat.toFixed(2)} y: {a.centroid_coordinates.lon.toFixed(2)}</div>
                        </div>
                    )
                })
            }
        </>
    )
}