import MetaRIBBITConnect from 'ribbit-connect-meta';
import { stylesheet } from './styles'

export default class RIBBITConnect {
    initialized = false;
    parent = null;

    open = false;


    popupElement = null;
    inlineElement = null;

    messageCallbacks = []
    
    constructor({
        target,
        token,
        language,
        inline = false,
        fullscreen = false,
        settings = {},
        className,
        environment,
        environmentOverrideURL,
        open = false
    }){
        this.targetId = target;
        this.token = token;
        this.language = language;
        this.inline = inline;
        this.settings = settings;
        this.className = className;
        this.isOpen = open;

        this.curtainColor = settings.curtainColor;
        this.curtainAllowClose = settings.curtainAllowClose || true;

        this.RIBBITConnectContext = new MetaRIBBITConnect({ token, settings, inline, fullscreen, language, environment, environmentOverrideURL });
        this.init()
    }

    init = () => {
        if(this.initialized) return;
        this.parent = document.getElementById(this.targetId)

        if(this.inline) this.initInline();
        else this.initPopup();

        this.initStyles();

        this.RIBBITConnectContext.CONNECTEvents.map(eventName => {
            const capitalizedEventName = eventName.charAt(0).toUpperCase() + eventName.slice(1);
            
            this['on' + capitalizedEventName] = (callback) => {
                this.RIBBITConnectContext.on(eventName, callback)
            }
        })
        
        this.RIBBITConnectContext.onMessage((functionName, event) => {
            this.messageCallbacks.map(x => {
                if(functionName != 'CONNECTEvent' && x.getAllMessages == false) return;
                x.callback(functionName, event)
            })
        })
    }

    initPopup = () => {
        this.popupElement = document.createElement('div')

        const curtain = document.createElement('div')
        curtain.className = 'RIBBIT-popup-curtain'
        if(this.curtainColor) curtain.style.backgroundColor = this.curtainColor;
        this.popupElement.appendChild(curtain)
        this.element = this.popupElement;

        this.popupElement.appendChild(this.RIBBITConnectContext.iFrame)
        this.popupElement.addEventListener('click', this.closePopup)
        this.parent.appendChild(this.popupElement)
        this.updateClassName();
    }

    initStyles = () => {
        var style = document.createElement('style');
        style.innerHTML = stylesheet;
        document.head.appendChild(style);
    }

    initInline = () => {
        this.inlineElement = document.createElement('div')
        this.inlineElement.appendChild(this.RIBBITConnectContext.iFrame)
        this.parent.appendChild(this.inlineElement)
    }

    updateClassName = () => {
        this.element.className = `RIBBIT-popup ${this.className ? ' ' + this.className + ' ' : ''} ${this.isOpen ? ' RIBBIT-popup-open' : ''} ${this.inline ? ' RIBBIT-popup-inline' : ' RIBBIT-popup-popup'}`
    }

    onMessage = (callback, getAllMessages = false) => {
        messageCallbacks.push({ callback, getAllMessages })
    }

    open = () => {
        this.isOpen = true;
        this.updateClassName();
    }

    close = () => {
        this.isOpen = false;
        this.updateClassName();
    }

    closePopup = () => {
        if(!this.curtainAllowClose) return;
        this.RIBBITConnectContext.sendMessage('exit', null)
    }

}

((window, document) => {
    window.RIBBITConnect = RIBBITConnect;
})(window, document)