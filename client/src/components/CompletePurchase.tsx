import { useState } from 'react';
import Cards, { Focused } from 'react-credit-cards';
import 'react-credit-cards/es/styles-compiled.css';

export default function CompletePurchse() {
	const [number, setNumber] = useState('');
	const [name, setName] = useState('');
	const [expiry, setExpiry] = useState('');
	const [cvc, setCVC] = useState('');
	const [focus, setFocus] = useState<Focused | undefined>(undefined);

	return (
		<div className='complete-purchase-wrapper'>
			<form className='complete-purchase-form'>
				<h2>Card Info</h2>
				<input className='dark-input' type='tel' name='number' placeholder='Card Number' value={number} onChange={e => setNumber(e.target.value)} onFocus={() => setFocus('number')} required/>
				<input className='dark-input' type='text' name='name' placeholder='Cardholder Name' value={name} onChange={e => setName(e.target.value)} onFocus={() => setFocus('name')} required/>
				<input className='dark-input' type='text' name='expiry' placeholder='MM/YY Expiry' value={expiry} onChange={e => setExpiry(e.target.value)} onFocus={() => setFocus('expiry')} required/>
				<input className='dark-input' type='tel' name='cvc' placeholder='CVC' value={cvc} onChange={e => setCVC(e.target.value)} onFocus={() => setFocus('cvc')} required/>
				<button className='orange-button'>Submit</button>
			</form>
			<Cards number={number} name={name} expiry={expiry} cvc={cvc} focused={focus}/>
		</div>
	);
}
