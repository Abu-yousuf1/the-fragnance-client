import React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import swal from 'sweetalert';
import { useEffect, useState } from 'react';
import { Typography } from '@mui/material';



const ManageAllOrders = () => {
    const [orders, setOrders] = useState([])



    const handleDelete = (id) => {

        swal({
            title: "Are you sure?",
            text: "Once deleted, you will not be able to recover this imaginary file!",
            icon: "warning",
            buttons: true,
            dangerMode: true,
        })
            .then((willDelete) => {
                if (willDelete) {
                    swal("Poof! Your imaginary file has been deleted!", {
                        icon: "success",
                    });
                    fetch(`https://sheltered-plateau-57228.herokuapp.com/orders/${id}`, {
                        method: 'DELETE'
                    })
                        .then(res => res.json())
                        .then(data => {
                            if (data.deletedCount > 0) {
                                const remainingProducts = orders.filter(pd => pd._id !== id)
                                setOrders(remainingProducts)
                            }
                        })

                } else {
                    swal("Your imaginary file is safe!");
                }
            });


    }


    const handleStatus = (id) => {

        fetch(`https://sheltered-plateau-57228.herokuapp.com/order/${id}`, {
            method: "PUT"
        })
            .then(res => res.json())
            .then(data => {
                if (data.modifiedCount > 0) {
                    orders.filter(pd => pd._id !== id)
                    fetch('https://sheltered-plateau-57228.herokuapp.com/allorders')
                        .then(res => res.json())
                        .then(data => setOrders(data))

                }
            })
    }

    useEffect(() => {
        fetch('https://sheltered-plateau-57228.herokuapp.com/allorders')
            .then(res => res.json())
            .then(data => setOrders(data))
    }, [])
    return (
        <div>
            <Typography variant="h5" className="primary-color" sx={{ textAlign: 'center', fontWeight: 'bold', marginY: '15px' }}> Mange AlL Orders</Typography>
            <TableContainer component={Paper}>
                <Table sx={{}} aria-label="simple table">
                    <TableHead>
                        <TableRow >
                            <TableCell style={{ fontWeight: 600 }} align="right">Name</TableCell>
                            <TableCell style={{ fontWeight: 600 }} align="right">Product Name</TableCell>
                            <TableCell style={{ fontWeight: 600 }} align="right">Price</TableCell>
                            <TableCell style={{ fontWeight: 600 }} align="right">Status</TableCell>
                            <TableCell style={{ fontWeight: 600 }} align="right">Make Status</TableCell>
                            <TableCell style={{ fontWeight: 600 }} align="right">Action</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {orders?.map((row) => (

                            <TableRow

                                key={row._id}
                                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                            >

                                <TableCell align="right">{row?.name}</TableCell>
                                <TableCell align="right">{row?.order?.name}</TableCell>
                                <TableCell align="right">${row?.order?.price}</TableCell>
                                <TableCell align="right" className={row?.status === "pending" ? "text-warning fw-bold fs-5" : "text-success fw-bold fs-5"} > {row?.status} </TableCell>
                                <TableCell align="right"> <button onClick={() => handleStatus(row._id, row?.status)} className={row?.status === "pending" ? "btn btn-danger" : "btn btn-success"} > {row?.status === "pending" ? "Make Shipped" : "Already Shipped"}</button></TableCell>
                                <TableCell align="right"><button onClick={() => handleDelete(row._id)} className="btn btn-warning"> Delete </button></TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </div>
    );
};

export default ManageAllOrders;