import numeral from 'numeral';
import formatBnToUsd from '../format-bn-to-usd';
import getTokenAssetValue from '../../app/screens/dashboard/components/token-balance/utils/get-token-asset-value';
import CovalentTokenBalanceInterface from '../../services/covalent/covalent-token-balance-interface';
import NomicsTokenDataInterface from '../../services/nomics/token-data-interface';
import getFormattedTokenBalance from '../../app/screens/dashboard/components/token-balances/utils/get-formatted-token-balance';

interface AssetData {
	tokenData: NomicsTokenDataInterface;
	tokenBalances: CovalentTokenBalanceInterface[];
}

const generateTokenDisplayData = ({ tokenData, tokenBalances }: AssetData) => {
	return tokenBalances.map((tokenBalance) => {
		const {
			balance,
			logo_url,
			contract_name,
			contract_address,
			contract_decimals,
			contract_ticker_symbol,
		} = tokenBalance;
		const tokenLogoUrl = logo_url;
		const tokenName = contract_name;
		const tokenSymbol = contract_ticker_symbol.toUpperCase();
		const selectedTokenData = tokenData[tokenSymbol];

		const tokenBalanceAmountFormatted = getFormattedTokenBalance(
			balance,
			contract_decimals
		);

		const tokenPrice = selectedTokenData?.price || '0';
		const tokenPriceFormatted = numeral(tokenPrice).format('$0,0.00000');

		const tokenAssetValue = getTokenAssetValue({
			balance,
			tokenPrice,
			contract_decimals,
		});

		const tokenAssetValueUsd = formatBnToUsd(tokenAssetValue);

		return {
			tokenName,
			tokenSymbol,
			tokenLogoUrl,
			tokenContractAddress: contract_address,
			tokenBalance: tokenBalanceAmountFormatted,
			tokenPrice: tokenPriceFormatted,
			totalAssetValue: tokenAssetValueUsd,
		};
	});
};

export default generateTokenDisplayData;
