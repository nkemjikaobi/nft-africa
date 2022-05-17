import '../styles/globals.css';
import type { AppProps } from 'next/app';
import WalletState from 'context/wallet/WalletState';
import AuthState from 'context/auth/AuthState';

function MyApp({ Component, pageProps }: AppProps) {
	return (
		<AuthState>
			<WalletState>
				<Component {...pageProps} />
			</WalletState>
		</AuthState>
	);
}

export default MyApp;
