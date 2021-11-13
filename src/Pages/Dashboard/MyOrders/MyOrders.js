import React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import useAuth from './../../../hooks/useAuth/useAuth';
import swal from 'sweetalert';
import { useEffect } from 'react';
import { useState } from 'react';

const MyOrders = () => {
    const { user } = useAuth();
    const [orderList, setOrderList] = useState([])

    useEffect(() => {
        fetch(`https://sheltered-plateau-57228.herokuapp.com/orders?email=${user.email}`)
            .then(res => res.json())
            .then(data => setOrderList(data))
    }, [user.email])

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
                                const remainingProducts = orderList.filter(pd => pd._id !== id)
                                setOrderList(remainingProducts)
                            }
                        })

                } else {
                    swal("Your imaginary file is safe!");
                }
            });


    }

    return (
        <TableContainer component={Paper}>
            <Table sx={{}} aria-label="simple table">
                <TableHead>
                    <TableRow >
                        <TableCell style={{ fontWeight: 600 }} align="right">Name</TableCell>
                        <TableCell style={{ fontWeight: 600 }} align="right">Product Name</TableCell>
                        <TableCell style={{ fontWeight: 600 }} align="right">Price</TableCell>
                        <TableCell style={{ fontWeight: 600 }} align="right">Status</TableCell>
                        <TableCell style={{ fontWeight: 600 }} align="right">Action</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {orderList.map((row) => (
                        <TableRow
                            key={row._id}
                            sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                        >

                            <TableCell align="right">{row?.name}</TableCell>
                            <TableCell align="right">{row.order?.name}</TableCell>
                            <TableCell align="right">${row.order?.price}</TableCell>
                            <TableCell align="right" className={row?.status === "pending" ? "text-warning fw-bold fs-5" : "text-success fw-bold fs-5"} > {row?.status} </TableCell>
                            <TableCell align="right"><button onClick={() => handleDelete(row._id)} className="btn btn-warning"> Delete </button></TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    );
};

export default MyOrders;