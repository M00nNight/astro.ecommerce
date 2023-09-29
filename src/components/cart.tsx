import { useStore } from '@nanostores/solid';
import { $cart as cart, removeItemFromCart, subtotal } from '../stores/cart';
import styles from './cart.module.css';
import { createSignal } from 'solid-js';
import { Show } from 'solid-js';

function formatCurrency(amout: number) {
	return new Intl.NumberFormat('en-IN', {
		currency: 'INR',
		style: 'currency',
	}).format(amout);
}
const EmptyState = () => {
	return (
		<>
			<p class={styles.icon}>
				<span>🌭</span>
			</p>
			<p class="styles.empty">
				<span>
					your cart is empty add a sandwich kit or two and more and give flovor
					a chance.
				</span>
			</p>
		</>
	);
};

const CheckoutNotice = () => {
	return <p class={styles.notice}>Checkout is not implemented</p>;
};

export const Cart = () => {
	const [showNotice, setShowNotice] = createSignal(false);
	const $subtotal = useStore(subtotal);
	const $cart = useStore(cart);
	return (
		<aside class={styles.cart}>
			<h2>Your Cart</h2>
			<Show when={Object.values($cart()).length > 0} fallback={<EmptyState />}>
				<ul class={styles.items}>
					{Object.values($cart()).map((entry: CartItem) => {
						if (!entry) {
							return null;
						}
						return (
							<li class={styles.item}>
								<span class={styles.quantity}>{entry.quantity}</span>
								<span class={styles.name}>{entry.item.title}</span>
								<span class={styles.remove}>
									<button
										title="remove item"
										onClick={() => removeItemFromCart(entry.item.id)}
									>
										&times;
									</button>
								</span>
								<span class={styles.price}>{entry.item.price}</span>
							</li>
						);
					})}
				</ul>
				<div class={styles.details}>
					<p class={styles.subtotal}>
						<span class={styles.label}>Subtotal:</span>{' '}
						{formatCurrency($subtotal())}
					</p>
					<p class={styles.shiping}>
						<span class={styles.label}>Shiping:</span>
						{''}
						<del>₹18.00</del>
						<ins>FREE</ins>
					</p>
					<p class={styles.total}>
						<span class={styles.label}>Total:</span>
						{''}
						{formatCurrency($subtotal())}
					</p>
					<p class={styles.checkout}>
						<button class="big-link" onclick={() => setShowNotice(true)}>
							Check Out
						</button>
					</p>
					<Show when={showNotice()}>
						<CheckoutNotice />
					</Show>
				</div>
			</Show>
		</aside>
	);
};
