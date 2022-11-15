const stylesheet = `
.RIBBIT-iFrame {
    margin: auto;
    border-radius: 10px;
    border: 0px transparent;
}
.RIBBIT-popup {
    position: fixed;
    top: 0px;
    left: 0px;
    width: 100%;
    height: 100%;
    display: flex;
    z-index: 10;
}
.RIBBIT-popup.RIBBIT-popup-popup {
    pointer-events: none;
    opacity: 0;
    transition: opacity 300ms;
}
.RIBBIT-popup.RIBBIT-popup-popup .RIBBIT-iFrame {
    transform: translateY(50vh) scale(0.9);
    transition: transform 500ms;
}
.RIBBIT-popup.RIBBIT-popup-popup.RIBBIT-popup-open {
    pointer-events: all;
    opacity: 1;
}
.RIBBIT-popup.RIBBIT-popup-popup.RIBBIT-popup-open .RIBBIT-iFrame {
    transform: translateY(0vh) scale(1);
}
.RIBBIT-popup .RIBBIT-iFrame {
    position: relative;
    z-index: 2;
}
.RIBBIT-popup .RIBBIT-iFrame.RIBBIT-iFrame-mobile {
    width: 100% !important;
    height: 98% !important;
    max-width: none !important;
    max-height: none !important;
    bottom: 0px;
    position: absolute;
    border-top-left-radius: 10px;
    border-top-right-radius: 10px;
    border-bottom-left-radius: 0;
    border-bottom-right-radius: 0;
    box-shadow: 0 -2px 10px #000;
}
.RIBBIT-popup .RIBBIT-iFrame-fullscreen.RIBBIT-iFrame-fullscreen {
    width: 100%;
    height: 100% !important;
    max-width: none !important;
    max-height: none !important;
    border-top-left-radius: 0px;
    border-top-right-radius: 0px;
}
.RIBBIT-popup .RIBBIT-popup-curtain {
    position: absolute;
    z-index: 1;
    top: 0px;
    left: 0px;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.5);
}
`

export { stylesheet }