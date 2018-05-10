import React from 'react';


/*Components*/
import SellPanel from './SellPanel';
import BuyPanel from './BuyPanel';
import DialogBox from './DialogBox';

/*Data array*/
import { jewellery } from '../data/jewellery.js'

const MagicShop = () => (

	<div>
		<SellPanel gamelocation="shop"/>
		<div className="location-box">
			<div className="shop">
			</div>
			<DialogBox gamelocation="shop"/>
		</div>
		<BuyPanel items={ [ ...jewellery] } gamelocation="shop"/>
	</div>

);

export default MagicShop;