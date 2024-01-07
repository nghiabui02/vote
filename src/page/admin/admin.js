import {useEffect, useState} from "react";
import supabase from "../../supabase";
import './admin.css'
import {Helmet} from "react-helmet";
import {Box, Modal} from "@mui/material";
import * as React from 'react';
import AddAVG from "../../conponent/addAVG";
import {toast} from "react-toastify";
import {useNavigate} from "react-router-dom";

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 350,
    bgcolor: 'background.paper',
    boxShadow: 24,
    p: 4,
    height: 'auto',
    borderRadius: '5px',
    textAlign:'center',
};

export default function Admin() {
    const [point, setPoint] = useState([]);
    const [presenter, setPresenter] = useState([]);
    const [avg, setAvg] = useState([]);
    const [open, setOpen] = useState(false);
    const navigate = useNavigate()
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    useEffect(() => {
        getProducts().then(r => {
        });
    }, []);

    useEffect(() => {
        getPresenter().then(r => {
        })
    }, []);

    useEffect(() => {
        getAvg().then(r => {
        })
    }, []);

    async function getPresenter() {
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

    async function getAvg() {
        try {
            const {data, error} = await supabase
                .from('statistics')
                .select('*')
                .order('avg_point', {ascending: false});
            if (error) throw error;
            if (data != null) {
                setAvg(data);
            }
        } catch (error) {
            toast.error(error.message)
        }
    }

    async function deletePoint(id) {
        try {
            const {error} = await supabase
                .from('point')
                .delete()
                .eq('id', id);
            await getProducts()
            toast.success('Delete success')
            if (error) throw error;
        } catch (error) {
            alert(error.message);
        }
    }
    async function handleClick(values) {
        try {
            const {error} = await supabase
                .from("statistics")
                .insert(values)
                .single()
            toast.success('Add success')
            await getAvg()
            if (error) throw error;

        } catch (error) {
            alert(error.message);
        }
    }

    async function deleteAvg(id) {
        try {
            const {error} = await supabase
                .from('statistics')
                .delete()
                .eq('id', id);
           await getAvg()
            if (error) throw error;
        } catch (error) {
            toast.error(error.message)
        }
    }

    async function getProducts() {
        try {
            const {data, error} = await supabase
                .from("point")
                .select("*")
            if (error) throw error;
            if (data != null) {
                setPoint(data);
            }
        } catch (error) {
            alert(error.message);
        }
    }

    return (
        <>
            <Helmet>
                <title>admin page</title>
            </Helmet>

            <div className='adminContainer'>
                <div className='adminTitle'>
                    <label>Welcome to admin page</label>
                </div>

                <div className='personContainer'>
                    <div className='table'>

                        <div className='presenter'>
                            <div className='tableTitle'>
                                <p>Presenter</p>
                            </div>
                            <div className='leftPage'>
                                <div style={{
                                    display: 'flex',
                                    paddingTop: '8px',
                                    width: '100%',
                                    margin: '0 auto',
                                    fontWeight: 'bold'
                                }}>
                                    <div style={{width: '40%', borderRight: '1px solid', textAlign: 'center'}}>
                                        <label>Name</label>
                                    </div>
                                    <div style={{width: '30%', textAlign: 'center', borderRight: '1px solid'}}>
                                        <label>Image</label>
                                    </div>
                                    <div style={{width: '30%', textAlign: 'center'}}>
                                        <label>Action</label>
                                    </div>
                                </div>

                                <div className='leftData'>
                                    {presenter.map((item) => (
                                        <div style={{display: 'flex', paddingTop: '10px'}}>
                                            <div style={{width: '40%', textAlign: 'center', height: '40px'}}>
                                                <label>{item.name}</label>
                                            </div>

                                            <div style={{width: '30%', textAlign: 'center', height: 'auto'}}>
                                                <div className='imgPresenter'>
                                                    <img src={item.img} alt=''/>
                                                </div>
                                            </div>
                                            <div style={{width: '30%', height: '40px'}}>
                                                <div className='action'>
                                                    <button>Update</button>
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            <div className='statistics'>
                                <div style={{
                                    display: 'flex',
                                    paddingTop: '8px',
                                    width: '100%',
                                    margin: '0 auto',
                                    fontWeight: 'bold'
                                }}>
                                    <div style={{width: '40%', borderRight: '1px solid', textAlign: 'center'}}>
                                        <label>Name</label>
                                    </div>
                                    <div style={{width: '30%', textAlign: 'center', borderRight: '1px solid'}}>
                                        <label>AVG score</label>
                                    </div>
                                    <div style={{width: '30%', textAlign: 'center'}}>
                                        <button style={{width: '80%'}} onClick={handleOpen}>Add avg point</button>
                                    </div>
                                </div>

                                    <Modal
                                        open={open}
                                        onClose={handleClose}
                                        aria-labelledby="modal-modal-title"
                                        aria-describedby="modal-modal-description">
                                        <Box sx={style}>
                                            <AddAVG close={handleClose} addAvgPoint={handleClick} />
                                        </Box>
                                    </Modal>

                                <div className='leftData'>
                                    {avg.map((item) => (
                                        <div style={{display: 'flex', paddingTop: '10px'}}>
                                            <div style={{width: '40%', textAlign: 'center', height: '40px'}}>
                                                <label>{item.name}</label>
                                            </div>
                                            <div style={{width: '30%', textAlign: 'center', height: 'auto'}}>
                                                <div className='imgPresenter'>
                                                    <label>{item.avg_point}</label>
                                                </div>
                                            </div>

                                            <div style={{width: '20%', textAlign: 'center', margin: '0 auto'}}>
                                                <div style={{width: '60%', margin: '0 auto'}}>
                                                    <button onClick={() => deleteAvg(item.id)}>
                                                        Delete
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>

                        <div className='score'>
                            <div className='tableTitle'>
                                <p>Score</p>
                            </div>
                            <div className='rightPage'>
                                <div style={{
                                    display: 'flex',
                                    gap: '10px',
                                    margin: '0 auto',
                                    width: '100%',
                                    paddingTop: '8px',
                                    fontWeight: 'bold',
                                }}>
                                    <div style={{width: '10%', textAlign: 'center', borderRight: '1px solid'}}>
                                        <label>STT</label>
                                    </div>
                                    <div style={{width: '30%', textAlign: 'center', borderRight: '1px solid'}}>
                                        <label>Name</label>
                                    </div>
                                    <div style={{width: '15%', textAlign: 'center', borderRight: '1px solid'}}>
                                        <label>Score</label>
                                    </div>
                                    <div style={{width: '15%', textAlign: 'center', borderRight: '1px solid'}}>
                                        <label>Score 2</label>
                                    </div>
                                    <div style={{width: '15%', textAlign: 'center', borderRight: '1px solid'}}>
                                        <label>Score 3</label>
                                    </div>
                                    <div style={{width: '15%', textAlign: 'center'}}>
                                        <label>Action</label>
                                    </div>
                                </div>

                                <div className='bodyPage'>
                                    {point.map((item, key) => (
                                        <div style={{display: 'flex'}}>
                                            <div style={{width: '10%', textAlign: 'center', height: '40px'}}>
                                                <label>{key + 1}</label>
                                            </div>
                                            <div style={{width: '30%', textAlign: 'center'}}>
                                                <label>{item.name}</label>
                                            </div>
                                            <div style={{width: '15%', textAlign: 'center'}}>
                                                <label>{item.score}</label>
                                            </div>
                                            <div style={{width: '15%', textAlign: 'center'}}>
                                                <label>{item.score2}</label>
                                            </div>
                                            <div style={{width: '15%', textAlign: 'center'}}>
                                                <label>{item.score3}</label>
                                            </div>

                                            <div style={{width: '15%', textAlign: 'center'}}>
                                                <div style={{width: '60%', margin: '0 auto'}}>
                                                    <button onClick={() => deletePoint(item.id)}>
                                                        Delete
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}