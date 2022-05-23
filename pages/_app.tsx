import '../styles/globals.css';
import type { AppProps } from 'next/app';
import WalletState from 'context/wallet/WalletState';
import AuthState from 'context/auth/AuthState';
import AlertState from 'context/alert/AlertState';

function MyApp({ Component, pageProps }: AppProps) {
	return (
		<AlertState>
			<AuthState>
				<WalletState>
					<Component {...pageProps} />
				</WalletState>
			</AuthState>
		</AlertState>
	);
}

export default MyApp;
