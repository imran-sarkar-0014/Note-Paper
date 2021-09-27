import React from 'react'
import { SwipeableDrawer, List, ListItem, ListItemIcon, Typography } from '@material-ui/core'
import { Link } from 'react-router-dom'
import CreateIcon from '@material-ui/icons/Create';
import HomeIcon from '@material-ui/icons/Home';
import { useSelector, useDispatch } from 'react-redux'
import { DRAWER } from '../../store/action/drawer'

const itemList = [
    {
        label: 'Home',
        to: '/',
        icon: HomeIcon
    },
    {
        label: 'create',
        to: '/create',
        icon: CreateIcon
    },
]





const Drawer = ({ onPage }) => {

    const drawer = useSelector(state => state.drawer)
    const dispatch = useDispatch()
    const toggleDrawer = (v) => {
        dispatch({
            type: DRAWER,
            payload: v
        })
    }

    const logoArea = () => {
        return (
            <div>
                <Typography style={{
                    color: 'white',
                    backgroundColor: 'red',
                    fontSize: 22,
                    textAlign: 'center',
                    height: 55,
                    paddingTop: 10,
                    borderBottom: '1px solid gray'
                }}>Note Paper</Typography>
            </div>
        )
    }

    const list_item = () => {
        return (
            <List style={{
                minWidth: 200
            }}>

                {
                    itemList.map((item, index) => (
                        <ListItem
                            key={index}
                            component={Link}
                            to={item.to}
                            onClick={() => toggleDrawer(false)}
                        >
                            <ListItemIcon>
                                {item.icon && <item.icon />}
                                <Typography style={{ marginLeft: 10 }}>{item.label}</Typography>
                            </ListItemIcon>
                        </ListItem>
                    ))
                }
            </List>
        )
    }

    const swiping = () => {
        return <SwipeableDrawer
            open={drawer}
            onClose={() => toggleDrawer(false)}
            onOpen={() => toggleDrawer(true)}
        >
            {
                logoArea()
            }
            {
                list_item()
            }
        </SwipeableDrawer>
    }

    const nonSwiping = () => {
        return (<>
            {
                list_item()
            }
        </>
        )
    }

    return onPage ? nonSwiping() : swiping()

}

export default Drawer
