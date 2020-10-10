import React from 'react';
import '../../global/night.scss';

//const ThemeNight = () => (<React.Fragment></React.Fragment>);

const ThemeNight = () => {
    var bodyStyles = document.body.style;
    bodyStyles.setProperty('--color-primary','#eb2f64')
    bodyStyles.setProperty('--color-primary-light','#ff3366')
    bodyStyles.setProperty('--color-primary-dark','#ba265d')

    bodyStyles.setProperty('--color-button-text','#fff')

    bodyStyles.setProperty('--color-board-modal','#50546d')
    bodyStyles.setProperty('--color-header-background','#20222a')
    bodyStyles.setProperty('--color-body-background','#282a36')
    bodyStyles.setProperty('--color-board-item-background','#414457')
    bodyStyles.setProperty('--color-board-background','#282a36')
    bodyStyles.setProperty('--color-lists-background','#20222a')
    bodyStyles.setProperty('--color-list-background','#20222a')
    bodyStyles.setProperty('--color-card-background','#414457')
    bodyStyles.setProperty('--color-card-hover','#50546d')
    bodyStyles.setProperty('--color-addbuton-background','#dae4fd')
    bodyStyles.setProperty('--color-addbuton-text','#2f80ed')
    bodyStyles.setProperty('--color-newbuton-background','#219653')
    bodyStyles.setProperty('--color-newbuton-text','#fff')
    bodyStyles.setProperty('--color-info-background','#1b8855')
    bodyStyles.setProperty('--color-info-text','#fff')

    bodyStyles.setProperty('--color-grey-dark-1','rgb(32, 32, 32)')
    bodyStyles.setProperty('--color-grey-dark-2','rgb(68, 68, 68)')

    bodyStyles.setProperty('--color-grey-light-1','#cfcfcf')
    bodyStyles.setProperty('--color-grey-light-2','#b9b9b9')
    bodyStyles.setProperty('--color-grey-light-3','#f2f2f2')
    bodyStyles.setProperty('--color-grey-light-4','#e4e4e4')
    bodyStyles.setProperty('--color-grey-light-5','#828282')

    bodyStyles.setProperty('--color-blue-light','#e2e8f6')
    bodyStyles.setProperty('--color-blue-dark','#2f80ed')

    bodyStyles.setProperty('--color-warning-1','#f54545')
    bodyStyles.setProperty('--color-warning-2','#f02121')

    bodyStyles.setProperty('--color-lists-border','rgba(255, 255, 255, 0.3)')
    bodyStyles.setProperty('--color-modal-background','#282a36')
    bodyStyles.setProperty('--color-modal-border','rgba(255, 255, 255, 0.5)')
    bodyStyles.setProperty('--color-input-background','#202024')
    bodyStyles.setProperty('color', '#e3e3e3')

    return (<React.Fragment></React.Fragment>)
}

export default ThemeNight;