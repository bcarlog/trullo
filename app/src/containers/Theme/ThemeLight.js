import React from 'react';
import '../../global/light.scss';

//const ThemeLight = () => (<React.Fragment></React.Fragment>);
const ThemeLight = () => {
    var bodyStyles = document.body.style;
    bodyStyles.setProperty('--color-primary', '#eb2f64');
    bodyStyles.setProperty('--color-primary-light', '#ff3366');
    bodyStyles.setProperty('--color-primary-dark','#ba265d')

    bodyStyles.setProperty('--color-button-text','#fff')

    bodyStyles.setProperty('--color-board-modal','#fff')
    bodyStyles.setProperty('--color-header-background','#fff')
    bodyStyles.setProperty('--color-body-background','#fafafa')
    bodyStyles.setProperty('--color-board-background','#fff')
    bodyStyles.setProperty('--color-board-item-background','#fff')
    bodyStyles.setProperty('--color-lists-background','#f4f8fa')
    bodyStyles.setProperty('--color-list-background','#f4f8fa')
    bodyStyles.setProperty('--color-card-background','#fff')
    bodyStyles.setProperty('--color-card-hover','#f4f8fa')
    bodyStyles.setProperty('--color-addbuton-background','#DAE4FD')
    bodyStyles.setProperty('--color-addbuton-text','#2F80ED')
    bodyStyles.setProperty('--color-newbuton-background','#219653')
    bodyStyles.setProperty('--color-newbuton-text','#fff')
    bodyStyles.setProperty('--color-info-background','#1b8855')
    bodyStyles.setProperty('--color-info-text','#fff')

    bodyStyles.setProperty('--color-grey-dark-1','rgb(32, 32, 32)')
    bodyStyles.setProperty('--color-grey-dark-2','rgb(68, 68, 68)')

    bodyStyles.setProperty('--color-grey-light-1','#cfcfcf')
    bodyStyles.setProperty('--color-grey-light-2','#b9b9b9')
    bodyStyles.setProperty('--color-grey-light-3','#F2F2F2')
    bodyStyles.setProperty('--color-grey-light-4','#e4e4e4')
    bodyStyles.setProperty('--color-grey-light-5','#828282')

    bodyStyles.setProperty('--color-blue-light','#E2E8F6')
    bodyStyles.setProperty('--color-blue-dark','#2F80ED')

    bodyStyles.setProperty('--color-warning-1','#f54545')
    bodyStyles.setProperty('--color-warning-2','#f02121')

    bodyStyles.setProperty('--color-lists-border',' transparent')
    bodyStyles.setProperty('--color-modal-background','#fff')
    bodyStyles.setProperty('--color-modal-border',' transparent')
    bodyStyles.setProperty('--color-input-background',' inherit')
    bodyStyles.setProperty('color', '#111')

    return (<React.Fragment></React.Fragment>)
}

export default ThemeLight;