import { FormEvent, useContext, useState } from 'react';
import Cards, { Focused } from 'react-credit-cards';
import 'react-credit-cards/es/styles-compiled.css';
import { CartContext } from './CartContext';
import { SERVER_URI } from '../constats';
import { ToastContainer, toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

export default function CompletePurchse() {
	const [number, setNumber] = useState('');
	const [name, setName] = useState('');
	const [expiry, setExpiry] = useState('');
	const [cvc, setCVC] = useState('');
	const [focus, setFocus] = useState<Focused | undefined>(undefined);
	const url = `${SERVER_URI}catalog/games/purchase`;
	const Cart = useContext(CartContext);
	const navigate = useNavigate();
	
	const submitPurchase = async(e: FormEvent) => {
		e.preventDefault();
		const loadToast = toast.loading('Please wait...');
		const delay = 2000;

		if (Cart && Cart.cartItems.length > 0) {
			const payload: Array<{_id: string}> = Cart.cartItems.map(item => ({_id: item._id}));
			const response = await fetch(url, {
				method: 'POST',
				mode: 'cors',
				headers: { 'Content-Type': 'application/json',},
				body: JSON.stringify(payload),
			});
			if(response.status === 201) { 
				toast.update(loadToast, { render: 'Order submited!', type: 'success', isLoading: false, autoClose: delay});
				Cart.clearCart();
				setTimeout(() => navigate('/store'), delay);
			} else { 
				toast.update(loadToast, { render: 'Something went wrong. Please try again later', type: 'error', isLoading: false, autoClose: delay});
			}
		} else { // Nothing to send
			return;
		}
	}

	return (
		<div className='complete-purchase-wrapper'>
			<form className='complete-purchase-form center-wrapper-column' onSubmit={e => submitPurchase(e)}>
				<h2>Card Info</h2>
				<input className='dark-input' type='tel' name='number' placeholder='Card Number' value={number} onChange={e => setNumber(e.target.value)} onFocus={() => setFocus('number')} required/>
				<input className='dark-input' type='text' name='name' placeholder='Cardholder Name' value={name} onChange={e => setName(e.target.value)} onFocus={() => setFocus('name')} required/>
				<input className='dark-input' type='text' name='expiry' placeholder='MM/YY Expiry' value={expiry} onChange={e => setExpiry(e.target.value)} onFocus={() => setFocus('expiry')} required/>
				<input className='dark-input' type='tel' name='cvc' placeholder='CVC' value={cvc} onChange={e => setCVC(e.target.value)} onFocus={() => setFocus('cvc')} required/>
				<button className='orange-button'>Submit</button>
			</form>
			<Cards number={number} name={name} expiry={expiry} cvc={cvc} focused={focus}/>
			<ToastContainer theme='dark' />
		</div>
	);
}
