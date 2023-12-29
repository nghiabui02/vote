import './addAVG.css'
import '../page/vote/vote.css'
import {Field, Form, Formik} from "formik";
import supabase from "../supabase";
import {toast} from "react-toastify";


export default function AddAVG() {
    async function handleClick(values) {
        try {
            const {error} = await supabase
                .from("statistics")
                .insert(values)
                .single()
            toast.success('Add success')
            window.location.reload();
            if (error) throw error;

        } catch (error) {
            alert(error.message);
        }
    }

    return (
        <>
            <div className='addAvgContainer'>
                <div className='addAvgForm'>
                    <Formik initialValues={{
                        name: '',
                        avg_point: ''
                    }} onSubmit={handleClick}>
                        <Form className='containerInputAvg'>

                            <label htmlFor="firstName">Name</label>
                            <Field id="firstName" name="name" placeholder="Name"/>


                            <label htmlFor="firstName">Avg point</label>
                            <Field id="firstName" name="avg_point" placeholder="Avg point"/>

                            <button type='submit'>Submit</button>
                        </Form>
                    </Formik>
                </div>
            </div>
        </>
    )
}