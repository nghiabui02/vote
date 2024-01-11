import {Helmet} from "react-helmet";
import './thankU.css'
import {useEffect, useState} from "react";
import supabase from "../../supabase";


export default function ThankYou() {
    const [image, setImage] = useState([])

    async function getProducts() {
        try {
            const {data, error} = await supabase
                .from("presenter")
                .select("*")
            if (error) throw error;
            if (data != null) {
                setImage(data);
            }
        } catch (error) {
            alert(error.message);
        }
    }

    useEffect(() => {
        getProducts().then(r => {
        });
    }, [])

    return (
        <>
            <Helmet>
                <title>Cảm ơn tất cả mọi người</title>
            </Helmet>

            <div className='thankContainer'>
                <div className='thankCon'>
                    <div className='titleThank'>
                        <label>Cảm ơn mọi người!</label>
                    </div>
                    {image.map((item) => (
                        <div className='thankMain'>
                            <div className='thankImage'>
                                <img style={{maxWidth: '100%', maxHeight: '100%'}} src={item.thankImage} alt=''/>
                            </div>
                            <div>
                                <span>Cảm ơn mọi người đã gửi lời yêu thương tới bạn {item.name}</span>
                                <p style={{color: 'blueviolet'}}>Chúc mọi người cuối tuần vui vẻ!</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </>
    )
}