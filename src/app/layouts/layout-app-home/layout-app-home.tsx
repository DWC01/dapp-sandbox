import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Container from '@material-ui/core/Container';
import WalletConnectButton from './wallet-connect/connect-to-a-wallet-button';
import Logo from '../logo';

const useStyles = makeStyles((theme) => ({
	root: {
		flexGrow: 1,
	},
	title: {
		flexGrow: 1,
	},
	appBar: {
		backgroundColor: 'white',
		color: '#bbb',
	},
}));

interface Props {
	children: JSX.Element;
}

const LayoutAppHome = ({ children }: Props) => {
	const classes = useStyles();

	return (
		<div data-testid="layoutAppHome" className={classes.root}>
			<AppBar
				elevation={0}
				position="fixed"
				classes={{
					root: classes.appBar,
				}}
			>
				<Container>
					<Toolbar>
						<Logo />
						<WalletConnectButton />
					</Toolbar>
				</Container>
			</AppBar>
			{children}
		</div>
	);
};

export default LayoutAppHome;
