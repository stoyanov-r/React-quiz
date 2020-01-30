import React from 'react'
import classes from './Layout.module.scss'
import MenuToggle from '../../components/Navigation/MenuToggle/MenuToggle'
import Drawer from '../../components/Navigation/Drawer/Drawer'
import { connect } from 'react-redux'
import { escFunction, onToggleMenu } from '../../store/actions/layout'

class Layout extends React.Component {
    
    toggleMenu = () => {
        this.props.onToggleMenu()
    }

    escFunc = event => {
        this.props.escFunction(event, this.props.menu)
    }


    componentDidMount(){
        document.addEventListener("keydown", this.escFunc, false)
    }
    
    componentWillUnmount(){
        document.removeEventListener("keydown", this.escFunc, false)
    }

    render() {
        return (
            <div className={classes.Layout}>

                <Drawer 
                    isOpened = {this.props.menu}
                    onClose = {this.toggleMenu}
                    isAuth = {this.props.isAuth}
                />

                <MenuToggle 
                    isOpened = {this.props.menu}
                    onMenuHandler = {this.toggleMenu}
                />

                <main>
                    {this.props.children}
                </main>
            </div>
        )
    }
}

function mapStateToProps(state) {
    return {
        isAuth: !!state.auth.token,
        menu: state.layout.menu
    }
}

function mapDispatchToProps(dispatch) {
    return {
        escFunction: (event, menu) => dispatch (escFunction(event, menu)),
        onToggleMenu: () => dispatch (onToggleMenu())
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Layout)