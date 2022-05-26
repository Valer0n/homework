import React from "react";
import './Orders.css';
import { Loader } from "../../components";
import axios from "axios";

class Orders extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            orders: [],
            loading: true,
        }
    }
    componentDidMount = () => {
        axios
            .get('https://beetroot-burger-app.herokuapp.com/orders')
            .then(res => {
                this.setState((prevState) => {
                    return {
                        ...prevState,
                        orders: res.data,
                        loading: false,
                    }
                })
            })
            .catch(error => console.log(error))
    }
    render() {
        return (
            <>
                <h2>Orders history</h2>
                {this.state.loading && <Loader />}
                {this.state.orders.map((order) => {
                    return (
                        <div className="orders-history">
                            <p className="order__name">Name:<span> {order.orderName}</span></p>
                            <p className="order__address">Address:<span> {order.orderAddress}</span></p>
                            <p className="order__phone">Phone:<span> {order.orderPhone}</span></p>
                            <p className="order__price">Price of burger:<span> {order.orderPrice} ₴</span></p>
                        </div>
                    )
                })}
            </>
        )
    }
}
export default Orders;