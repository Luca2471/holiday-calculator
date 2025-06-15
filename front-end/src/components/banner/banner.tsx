import React from 'react';
import styles from './banner.module.scss';

const Banner = () => {
	return (
		<div className={styles.container} >
			<p className={styles.title} data-testid="title">
				Smart Holidays
			</p>
			<p className={styles.subtitle} data-testid="subtitle">
				Let's plan your next holiday smartly
			</p>
		</div>
	)
};

export default Banner;
