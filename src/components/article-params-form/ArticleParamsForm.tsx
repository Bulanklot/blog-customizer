import { ArrowButton } from 'components/arrow-button';
import { Button } from 'components/button';
import React, { FormEvent, useRef, useState } from 'react';
import { Select } from '../select';

import styles from './ArticleParamsForm.module.scss';
import clsx from 'clsx';
import {
	ArticleStateType,
	backgroundColors,
	contentWidthArr,
	defaultArticleState,
	fontColors,
	fontFamilyOptions,
	fontSizeOptions,
	OptionType,
} from 'src/constants/articleProps';
import { RadioGroup } from '../radio-group';
import { Separator } from '../separator';
import { Text } from '../text';
import { useOutsideClickClose } from '../select/hooks/useOutsideClickClose';

export type TArticleParamsForm = {
	articleState: ArticleStateType;
	setArticleState: (param: ArticleStateType) => void;
};

export const ArticleParamsForm = ({
	articleState,
	setArticleState,
}: TArticleParamsForm) => {
	const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false);

	const handleMenuClick = () => {
		setIsMenuOpen(!isMenuOpen);
	};

	const rootRef = useRef<HTMLFormElement>(null);

	useOutsideClickClose({
		isOpen: isMenuOpen,
		rootRef: rootRef,
		onChange: setIsMenuOpen,
	});

	const [selectArticleState, setSelectArticleState] =
		useState<ArticleStateType>(articleState);

	const handleFormSubmit = (e: FormEvent) => {
		e.preventDefault();
		setArticleState(selectArticleState);
	};

	const handleInputChange = (
		key: keyof ArticleStateType,
		value: OptionType
	) => {
		setSelectArticleState((prevState) => ({ ...prevState, [key]: value }));
	};

	return (
		<>
			<ArrowButton OnClick={handleMenuClick} isOpenState={isMenuOpen} />
			<aside
				className={clsx(styles.container, isMenuOpen && styles.container_open)}>
				<form
					ref={rootRef}
					className={styles.form}
					onSubmit={handleFormSubmit}
					onReset={() => {
						setArticleState(defaultArticleState);
						setSelectArticleState(defaultArticleState);
					}}>
					<Text size={31} weight={800} uppercase={true}>
						Задайте параметры
					</Text>
					<Select
						title='шрифт'
						options={fontFamilyOptions}
						selected={selectArticleState.fontFamilyOption}
						onChange={(selectElement: OptionType) => {
							handleInputChange('fontFamilyOption', selectElement);
						}}
					/>
					<RadioGroup
						name='размер шрифта'
						title='размер шрифта'
						options={fontSizeOptions}
						selected={selectArticleState.fontSizeOption}
						onChange={(selectElement: OptionType) => {
							handleInputChange('fontSizeOption', selectElement);
						}}
					/>
					<Select
						title='цвет шрифта'
						options={fontColors}
						selected={selectArticleState.fontColor}
						onChange={(selectElement: OptionType) => {
							handleInputChange('fontColor', selectElement);
						}}
					/>
					<Separator />
					<Select
						title='цвет фона'
						options={backgroundColors}
						selected={selectArticleState.backgroundColor}
						onChange={(selectElement: OptionType) => {
							handleInputChange('backgroundColor', selectElement);
						}}
					/>
					<Select
						title='ширина контента'
						options={contentWidthArr}
						selected={selectArticleState.contentWidth}
						onChange={(selectElement: OptionType) => {
							handleInputChange('contentWidth', selectElement);
						}}
					/>
					<div className={styles.bottomContainer}>
						<Button title='Сбросить' type='reset' />
						<Button title='Применить' type='submit' />
					</div>
				</form>
			</aside>
		</>
	);
};
