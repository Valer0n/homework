import React from "react";
import Modal from 'react-modal';
import './Modal.css';
import axios from 'axios';
import Form from "../Form/Form";
import { toHaveAccessibleDescription } from "@testing-library/jest-dom/dist/matchers";


const customStyles = {
    content: {
        top: '50%',
        left: '50%',
        right: 'auto',
        bottom: 'auto',
        marginRight: '-50%',
        transform: 'translate(-50%, -50%)',
        padding: '0px',
    },
};



class CustomModal extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            name: '',
            number: '',
            address: '',
            checked: false,
            promo: 'hello',
            finalPrice: this.props.totalPrice,
        };
    }
    componentDidMount = () => {
        axios
            .get('https://beetroot-burger-app.herokuapp.com/orders')
            .then(response => console.log(response.data))
            .catch(error => console.log(error));
    }

    checkPromo = (event) => {
        event.preventDefault();

        if (this.state.promo === event.target.value) {
            this.setState({ finalPrice: this.state.finalPrice - 3 });
        } else {
            this.setState({ finalPrice: this.props.totalPrice });
        }
    }
    componentDidUpdate = (prevProps) => {
        if (prevProps.totalPrice !== this.props.totalPrice) {
            this.setState({ finalPrice: this.props.totalPrice });
        }
    };
    inputChange = (event) => {
        this.setState((prevState) => {
            return {
                ...prevState,
                [event.target.name]: event.target.value,
            }
        })
    }
    changeCheckbox = (event) => {
        this.setState((prevState) => {
            return {
                ...prevState,
                checked: !prevState.checked,
            }
        })
    }

    postOrder = (data) => {
        const body = JSON.stringify({
            "orderPhone": Number(data.number),
            "orderAddress": data.address,
            "orderName": data.name,
            "orderFast": this.state.checked,
            "orderProducts": Object.fromEntries(this.props.orderQuantity.map(e => [e.ingredient, e.quantity])),
            "orderPrice": this.state.finalPrice.toFixed(2),
        });

        const URLPOST = {
            method: 'POST',
            url: 'https://beetroot-burger-app.herokuapp.com/orders',
            headers: {
                'Authorization': 'Bearer fbab44e0-5e31-4a93-bc8f-55fe77a066b0',
                'Content-Type': 'application/json'
            },
            data: body,
        };

        axios(URLPOST)
            .then(res => {
                console.log(res)
                this.props.setMessage(false)
            })
            .catch(error => {
                console.log(error)
                this.props.setMessage(true)
            });
        this.props.cleanState();
        this.setState({
            name: "",
            number: "",
            address: "",
            checked: false,
            promo: "hello",
            finalPrice: 1,
        });
        this.props.getNew();
        // this.props.onRequestClose();

    }

    render() {
        return (
            <Modal
                style={customStyles}
                isOpen={this.props.isOpen}
                onRequestClose={this.props.onShowHideModal}
                orderQuantity={this.props.orderQuantity}
                ariaHideApp={false}
            >
                <div className="modal">
                    <h2 className="modal-title">Your order</h2>
                    <div>{this.props.orderQuantity.map((e, i) => e.quantity > 0 ? (<p className="order" key={i}>{e.ingredient} x {e.quantity}</p>) : '')}</div>
                    <h3 className="modal-price">Burger price: {this.state.finalPrice.toFixed(2)} ₴</h3>
                    <Form
                        inputChange={this.inputChange}
                        changeCheckbox={this.changeCheckbox}
                        checkPromo={this.checkPromo}
                        postOrder={this.postOrder}
                        onShowHideModal={this.props.onShowHideModal}
                        modalState={this.state} />
                </div>
            </Modal>
        )
    }

}

export default CustomModal;