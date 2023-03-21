import * as React from 'react';
import HomeOutlinedIcon from '@mui/icons-material/HomeOutlined'
import CalculateOutlinedIcon from '@mui/icons-material/CalculateOutlined'
import QuestionMarkOutlinedIcon from '@mui/icons-material/QuestionMarkOutlined'
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined'
import RestaurantOutlinedIcon from '@mui/icons-material/RestaurantOutlined'
import ShoppingCartOutlinedIcon from '@mui/icons-material/ShoppingCartOutlined'
import AccountCircle from '@mui/icons-material/AccountCircle';


export const SideBarData = [
  {
    title: "Dashboard",
    icon: <HomeOutlinedIcon />,
    link: "/dashboard"
  },
  {
    title: "My Macros",
    icon: <CalculateOutlinedIcon />,
    link: "/calculate"
  },
  {
    title: "Grocery Plan",
    icon: <ShoppingCartOutlinedIcon />,
    link: "/grocery"
  },
  {
    title: "My Recipes",
    icon: <RestaurantOutlinedIcon />,
    link: "/recipe"
  },
  {
    title: "About",
    icon: <InfoOutlinedIcon />,
    link: "/about"
  },
  {
    title: "FAQ",
    icon: <QuestionMarkOutlinedIcon />,
    link: "/faq"
  },
  {
    title: "My Profile",
    icon: <AccountCircle />,
    link: "/profile"
  }
]