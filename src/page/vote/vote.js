import {useFormik} from "formik";
import * as Yup from "yup";
import supabase from '../../supabase';
import "./vote.css"
import {useEffect, useState} from "react";
import {useNavigate} from "react-router-dom";

const voteValidate = Yup.object().shape({
    name: Yup.string()
        .required('Yêu cầu nhập tên')
        .max(20, 'Vượt quá số ký tự quy định')
        .min(2, 'Tên quá ngắn'),
    score: Yup.string()
        .required('Bạn chưa lựa chọn'),
    score2: Yup.string()
        .required('Bạn chưa lựa chọn'),
    score3: Yup.string()
        .required('Bạn chưa lựa chọn')
});

export default function Vote() {
    const [presenter, setPresenter] = useState([]);
    const navigate = useNavigate();
    const formikPoint = useFormik({
        initialValues: {
            score: '',
            score2: '',
            score3: '',
            name: ''
        }, validationSchema: voteValidate,
        onSubmit: (values) => {
            handleClick(values).then(r => {
                navigate('thank')
            })
        }
    });
    async function handleClick() {
        try {
            const {error} = await supabase
                .from("point")
                .insert(formikPoint.values)
                .single()
            if (error) throw error;

        } catch (error) {
            alert(error.message);
        }
    }

    useEffect(() => {
        getProducts().then(r => {
        });
    }, [])

    async function getProducts() {
        try {
            const {data, error} = await supabase
                .from("presenter")
                .select("*")
            if (error) throw error;
            if (data != null) {
                setPresenter(data);
            }
        } catch (error) {
            alert(error.message);
        }
    }

    return (
        <>
            <div className='voteContainer'>
                <div className='title'>
                    <label>Vote time</label>
                </div>

                {presenter.map((item) => (
                    <div className='information'>
                        <div className='imageZone'>
                            <img className='imagePerson' src={item.img} alt=':<'/>
                        </div>

                        <div className='namePerson'>
                            <div className='titleName'>
                                <h2>Người trình bày</h2>
                            </div>

                            <div className='name'>
                                <p className='person'>{item.name}</p>
                            </div>

                        </div>
                    </div>
                ))}

                {presenter.map((item) => (
                    <div className='title2'>
                        <h2>Nội dung</h2>
                        <p>{item.content}</p>
                    </div>
                ))}
                <div style={{
                    width: '100%',
                    paddingTop: '5%',
                }}>
                    <form onSubmit={formikPoint.handleSubmit} className='containerForm'>
                        <div className='containerInput'>
                            <input value={formikPoint.values.name} name='name' onChange={formikPoint.handleChange}
                                   placeholder='Vui lòng nhập tên'/>
                            <label htmlFor="name">Nhập tên bạn tại đây</label>
                            {formikPoint.errors.name && formikPoint.touched.name ? (
                                <div className='validateName'>{formikPoint.errors.name}</div>
                            ) : null}
                        </div>


                        <div className='containerOption'>
                            <div className='question'>
                                <label>Bạn thấy nội dung vừa rồi như thế nào ?</label>
                            </div>

                            <div className='containerSelect'>
                                <select value={formikPoint.values.score} onChange={formikPoint.handleChange}
                                        name="score">
                                    <option value={null}>Chọn</option>
                                    <option value="1">Tệ</option>
                                    <option value="2">Không hay</option>
                                    <option value="3">Bình thường</option>
                                    <option value="4">Hay</option>
                                    <option value="5">Tuyệt vời</option>
                                </select>
                                {formikPoint.errors.score && formikPoint.touched.score ? (
                                    <div className='validate'>{formikPoint.errors.score}</div>
                                ) : null}
                            </div>
                        </div>


                        <div className='containerOption'>
                            <div className='question'>
                                <label>Bạn thấy cách truyền đạt vừa rồi như thế nào ?</label>
                            </div>
                            <div className='containerSelect'>
                                <select value={formikPoint.values.score2} onChange={formikPoint.handleChange}
                                        name="score2">
                                    <option value={null}>Chọn</option>
                                    <option value="1">Tệ</option>
                                    <option value="2">Không hay</option>
                                    <option value="3">Bình thường</option>
                                    <option value="4">Hay</option>
                                    <option value="5">Tuyệt vời</option>
                                </select>
                                {formikPoint.errors.score2 && formikPoint.touched.score2 ? (
                                    <div className='validate'>{formikPoint.errors.score2}</div>
                                ) : null}
                            </div>
                        </div>


                        <div className='containerOption'>
                            <div className='question'>
                                <label>Bạn thấy sự tương tác của người thuyết trình như thế nào ?</label>
                            </div>

                            <div className='containerSelect'>
                                <select value={formikPoint.values.score3} onChange={formikPoint.handleChange}
                                        name="score3">
                                    <option value={null}>Chọn</option>
                                    <option value="1">Tệ</option>
                                    <option value="2">Không hay</option>
                                    <option value="3">Bình thường</option>
                                    <option value="4">Hay</option>
                                    <option value="5">Tuyệt vời</option>
                                </select>
                                {formikPoint.errors.score3 && formikPoint.touched.score3 ? (
                                    <div className='validate'>{formikPoint.errors.score3}</div>
                                ) : null}
                            </div>

                        </div>

                        <div className='buttonAdd'>
                            <button type='submit'>Hoàn thành</button>
                        </div>
                    </form>
                </div>
            </div>
        </>
    )
}