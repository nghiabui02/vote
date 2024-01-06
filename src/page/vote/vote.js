import {useFormik} from "formik";
import * as Yup from "yup";
import supabase from '../../supabase';
import "./vote.css"
import {useEffect, useState} from "react";
import {useNavigate} from "react-router-dom";
import {Box, Rating, TextField, Typography} from "@mui/material";
import StarIcon from '@mui/icons-material/Star';

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
const labels = {
    1: 'Tệ',
    2: 'Không hay',
    3: 'Bình Thường',
    4: 'Hay',
    5: 'Tuyệt vời',
};

function getLabelText(value) {
    return `${value} Star${value !== 1 ? 's' : ''}, ${labels[value]}`;
}

export default function Vote() {
    const [presenter, setPresenter] = useState([]);
    const navigate = useNavigate();
    const [value, setValue] = useState(null);
    const [value2, setValue2] = useState(null);
    const [value3, setValue3] = useState(null);
    const [hover, setHover] = useState(-1);
    const [hover2, setHover2] = useState(-1);
    const [hover3, setHover3] = useState(-1);

    const formikPoint = useFormik({
        initialValues: {
            score: value,
            score2: value2,
            score3: value3,
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
                            <div>
                                <TextField
                                    id="filled-textarea"
                                    label="Vui lòng nhập tên"
                                    placeholder="Tên bạn là"
                                    multiline
                                    value={formikPoint.values.name}
                                    onChange={formikPoint.handleChange}
                                    name='name'
                                />
                            </div>
                            {formikPoint.errors.name && formikPoint.touched.name ? (
                                <div className='validateName'>{formikPoint.errors.name}</div>
                            ) : null}
                        </div>


                        <div className='containerOption'>
                            <div className='question'>
                                <Typography variant="body2" gutterBottom>Bạn thấy nội dung vừa rồi như thế nào ?</Typography>
                                <Box
                                    sx={{
                                        width: 200,
                                        display: 'flex',
                                        alignItems: 'center',
                                        margin: '0 auto'
                                    }}
                                >
                                    <Rating
                                        name="score"
                                        value={formikPoint.values.score}
                                        getLabelText={getLabelText}
                                        onChange={(event, newValue) => {
                                            setValue(newValue);
                                            formikPoint.handleChange(event)
                                        }}
                                        onChangeActive={(event, newHover) => {
                                            setHover(newHover);
                                        }}
                                        emptyIcon={<StarIcon style={{opacity: 0.55}} fontSize='medium'/>}
                                    />
                                    {value !== null && (
                                        <Box sx={{ml: 2}}>{labels[hover !== -1 ? hover : value]}</Box>
                                    )}
                                </Box>
                                {formikPoint.errors.score && formikPoint.touched.score ? (
                                    <div className='validate'>{formikPoint.errors.score}</div>
                                ) : null}
                            </div>
                        </div>


                        <div className='containerOption'>
                            <div className='question'>
                                <Typography variant="body2" gutterBottom>Bạn thấy cách truyền đạt vừa rồi như thế nào ?</Typography>
                                <Box
                                    sx={{
                                        width: 200,
                                        display: 'flex',
                                        alignItems: 'center',
                                        margin: '0 auto'
                                    }}
                                >
                                    <Rating
                                        name="score2"
                                        value={formikPoint.values.score2}
                                        getLabelText={getLabelText}
                                        onChange={(event, newValue) => {
                                            setValue2(newValue);
                                            formikPoint.handleChange(event)
                                        }}
                                        onChangeActive={(event, newHover) => {
                                            setHover2(newHover);
                                        }}
                                        emptyIcon={<StarIcon style={{opacity: 0.55}} fontSize='medium'/>}
                                    />
                                    {value2 !== null && (
                                        <Box sx={{ml: 2}}>{labels[hover2 !== -1 ? hover2 : value2]}</Box>
                                    )}
                                </Box>
                                {formikPoint.errors.score2 && formikPoint.touched.score2 ? (
                                    <div className='validate'>{formikPoint.errors.score2}</div>
                                ) : null}
                            </div>
                        </div>


                        <div className='containerOption'>
                            <div className='question'>
                                <Typography variant="body2" gutterBottom>Bạn thấy tính tương tác vừa rồi như thế nào ?</Typography>
                                <Box
                                    sx={{
                                        width: 200,
                                        display: 'flex',
                                        alignItems: 'center',
                                        margin: '0 auto'
                                    }}
                                >
                                    <Rating
                                        name="score3"
                                        value={formikPoint.values.score3}
                                        getLabelText={getLabelText}
                                        onChange={(event, newValue) => {
                                            setValue3(newValue);
                                            formikPoint.handleChange(event)
                                        }}
                                        onChangeActive={(event, newHover) => {
                                            setHover3(newHover);
                                        }}
                                        emptyIcon={<StarIcon style={{opacity: 0.55}} fontSize='medium'/>}
                                    />
                                    {value3 !== null && (
                                        <Box sx={{ml: 2}}>{labels[hover3 !== -1 ? hover3 : value3]}</Box>
                                    )}
                                </Box>
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